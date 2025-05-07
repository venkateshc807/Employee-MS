import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
    try {
        // Check if Authorization header exists and is properly formatted
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: "Authorization token is missing or invalid" });
        }

        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Find the user based on the decoded user ID
        const user = await User.findById({ _id: decoded._id }).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Attach user to the request object for use in subsequent middleware or routes
        req.user = user;
        next();

    } catch (error) {
        // Handle token-related errors explicitly (invalid, expired, etc.)
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, error: "Token has expired" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, error: "Invalid token" });
        }

        console.error("Error in verifyUser middleware:", error);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

export default verifyUser;

