import User from "../models/User.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
    try {
        const userId = req.user.id; // Extract from token
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Wrong old password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "Setting error" });
    }
};

export { changePassword };
