import { User } from "../models/userModel.js";
import sendEmail from "../services/emialService.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const existedUser = await User.exists({ email });

	if (existedUser) throw new ApiError(409, "user already exist");

	const user = new User({ name, email, password });

	// console.log(existedUser);

	const token = user.generateAccessToken();

	const emailData = {
		email,
		subject: "Account Verification Emial",
		html: `
                <h1>Hello ${name}</h1>
                <p>Please Click Here To <a href="${process.env.CLIENT_URL}/api/v1/auth/activate/${token} target="_black">Activate Your Account</a></p>
        `,
	};

	const response = await sendEmail(emailData);

	await user.save();

	res.json(new ApiResponse(201, user, "user created successful"));
});

const verifyEmail = asyncHandler(async (req, res) => {
	const { token } = req.params;

	if (!token) throw new ApiError(404, "token not found");

	const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

	if (!decoded) throw new ApiError(400, "Invalid token");

	console.log(decoded);

    const user = await User.findOne({_id: decoded._id})

    if(!user) throw new ApiError(401, "unauthorized token");

    user.isVerified = true;

    user.save()

	res.json(new ApiResponse(200,user, "email verification successful"));
});

export { registerUser, verifyEmail };
