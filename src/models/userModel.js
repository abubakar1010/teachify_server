import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
		},
		profileImage: {
			type: String,
		},
		role: {
			type: String,
			enum: ["student", "teacher", "admin"],
			default: "student",
		},
		enrolledCourses: [
			{
				type: Schema.Types.ObjectId,
				ref: "Enrollment",
			},
		],
		isVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
		subscriptionStatus: {
			type: Boolean,
			required: true,
			default: false,
		},
		isBanned: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", async function (next) {

	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

UserSchema.methods.generateAccessToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			password: this.password,
			role: this.role,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "1h" }
	);

	return token;
};

UserSchema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export const User = model("User", UserSchema);
