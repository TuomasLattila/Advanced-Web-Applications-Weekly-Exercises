import mongoose from "mongoose";

type userType = {
    email: string,
    password: string
}

export default mongoose.model("User", new mongoose.Schema<userType>({
    email: String,
    password: String
}))