import { Router } from "express";
import { loginUser, logoutUser, registerUser, verifyEmail } from "../controllers/authContorller.js";
import verifyToken from "../middleware/verifyUser.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/verify-email/:token").get(verifyEmail)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyToken,logoutUser)
 

export default router