import { User } from "../models/userModel.js"

const findUserByProperty = (key, value) => {

    return User.find({key: value})
}

export {getUserById}