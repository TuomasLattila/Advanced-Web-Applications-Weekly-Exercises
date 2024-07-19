import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

import userRoute from "./routes/user"
import privateRoute from "./routes/private"
import todosRoute from "./routes/todos"

const app: Express = express()

//DATABASE setup
const mongodb: string = 'mongodb://127.0.0.1:27017/testdb';
mongoose.connect(mongodb);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('connection', (stream) => {
    console.log("Database connection established!")
})
db.on('error', console.error.bind(console, "Error connecting to MongoDB"))

app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/private', privateRoute)
app.use('/api/todos', todosRoute)


app.listen(process.env.PORT, () => {
    console.log("Server is up on the port: "+process.env.PORT)
})