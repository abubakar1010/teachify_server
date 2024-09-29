import { model, Schema } from "mongoose";

const UserSchema = new Schema(
    {

        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["student", "teacher", "admin"],
            default: "student"
        },
        enrolledCourses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Enrollment"
            }
        ],
        isVerified: {
            type: Boolean,
            required: true,
            default: false
        },
        subscriptionStatus: {
            type: Boolean,
            required: true,
            default: false
        },
        isBanned: {
            type: Boolean,
            required: true,
            default: false
        }

    },
    {
        timestamps: true
    }
)

export const User = model("User", UserSchema)
