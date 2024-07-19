import { ObjectId } from "mongodb"
import mongoose from "mongoose"

type todoType = {
    user: ObjectId,
    items: [string] 
}

export default mongoose.model("Todo", new mongoose.Schema<todoType>({
    user: ObjectId,
    items: [String]
}))