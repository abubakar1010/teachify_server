import { Model, Schema } from "mongoose";

const UserSchema = new Schema({

})

const User = Model("User", UserSchema)

export default User;