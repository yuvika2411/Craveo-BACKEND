import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
        return <Navigate to="/account/login" />;
    }

    return children;
};

export default ProtectedRoute;