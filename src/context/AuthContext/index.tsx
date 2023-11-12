import {
	createContext,
	useState,
	ReactNode,
	FormEvent,
	useEffect,
} from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthTokens {
	access: string;
	refresh: string;
}

interface AuthContextType {
	user: string | null;
	authTokens: AuthTokens | null;
	loginUser: (e: FormEvent) => void;
	logoutUser: (e?: FormEvent) => void;
}

interface CustomJwtPayload extends JwtPayload {
	username?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

interface AuthProviderProps {
	children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	let [user, setUser] = useState<string | null>(() => {
		const storedTokens = localStorage.getItem("authTokens");
		if (storedTokens) {
			const decoded: CustomJwtPayload = jwtDecode(storedTokens);
			return decoded.username || null;
		}
		return null;
	});

	let [authTokens, setAuthTokens] = useState(() => {
		const storedTokens = localStorage.getItem("authTokens");
		return storedTokens ? JSON.parse(storedTokens) : null;
	});

	let [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	let loginUser = async (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const username = form.username.value;
		const password = form.password.value;
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_BASE_URL}/api/token/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			}
		);

		let data = await response.json();

		if (data) {
			localStorage.setItem("authTokens", JSON.stringify(data));
			setAuthTokens(data);
			const decodedUser: CustomJwtPayload = jwtDecode(data.access);
			setUser(decodedUser.username || null);
			navigate("/");
		} else {
			alert("Something went wrong while logging in the user!");
		}
	};

	let logoutUser = (e?: FormEvent) => {
		e?.preventDefault();
		localStorage.removeItem("authTokens");
		setAuthTokens(null);
		setUser(null);
		navigate("/login");
	};

	useEffect(() => {
		if (loading && authTokens) {
			updateToken();
		}

		const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
		let interval = setInterval(() => {
			if (authTokens) {
				updateToken();
			}
		}, REFRESH_INTERVAL);

		return () => clearInterval(interval);
	}, [authTokens, loading]);

	const updateToken = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_BASE_URL}/api/token/refresh/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refresh: authTokens?.refresh }),
			}
		);

		const data = await response.json();
		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwtDecode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
		} else {
			console.error(response);
			logoutUser();
		}

		if (loading) {
			setLoading(false);
		}
	};

	let contextData = {
		user: user,
		authTokens: authTokens,
		loginUser: loginUser,
		logoutUser: logoutUser,
	};

	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};
