"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
//import cors from "cors"
dotenv_1.default.config();
const user_1 = __importDefault(require("./routes/user"));
const private_1 = __importDefault(require("./routes/private"));
const todos_1 = __importDefault(require("./routes/todos"));
const views_1 = __importDefault(require("./routes/views"));
const app = (0, express_1.default)();
//DATABASE setup
const mongodb = 'mongodb://127.0.0.1:27017/testdb';
mongoose_1.default.connect(mongodb);
mongoose_1.default.Promise = Promise;
const db = mongoose_1.default.connection;
db.on('connection', (stream) => {
    console.log("Database connection established!");
});
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express_1.default.json());
//app.use(cors())
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api/user', user_1.default);
app.use('/api/private', private_1.default);
app.use('/api/todos', todos_1.default);
app.use('/', views_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server is up on the port: " + process.env.PORT);
});
