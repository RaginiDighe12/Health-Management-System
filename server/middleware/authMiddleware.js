import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error("Not authorized, token failed", error);
            res.status(401).json({
                success: false,
                message: "Not authorized, token failed"
            });
        }
    }

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Not authorized, no token"
        });
    }
};

export const doctorOnly = (req, res, next) => {
    if (req.user && req.user.role === "doctor") {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Not authorized as doctor"
        });
    }
};

export const patientOnly = (req, res, next) => {
    if (req.user && req.user.role === "patient") {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Not authorized as patient"
        });
    }
};
