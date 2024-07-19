import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"
import bodyParser from "body-parser"
//import cors from "cors"
dotenv.config()

import userRoute from "./routes/user"
import privateRoute from "./routes/private"
import todosRoute from "./routes/todos"
import viewsRoute from "./routes/views"

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json()) 
//app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRoute)
app.use('/api/private', privateRoute)
app.use('/api/todos', todosRoute)
app.use('/', viewsRoute)


app.listen(process.env.PORT, () => {
    console.log("Server is up on the port: "+process.env.PORT)
})