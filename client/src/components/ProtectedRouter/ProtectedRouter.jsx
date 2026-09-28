import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children, allowedRoles }) => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(storedUser);
        if (allowedRoles && !allowedRoles.includes(user.role)) {
            if (user.role === "doctor") {
                return <Navigate to="/doctor/dashboard" replace />;
            }
            return <Navigate to="/patient/dashboard" replace />;
        }
        return children;
    } catch (e) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRouter;
