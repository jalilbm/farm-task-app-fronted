import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Routes>
						<Route
							path="/"
							element={
								<PrivateRoute>
									<HomePage />
								</PrivateRoute>
							}
						/>
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
