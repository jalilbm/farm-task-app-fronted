import { Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
}): React.ReactElement | null => {
	let { user } = useContext(AuthContext)!;

	return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
