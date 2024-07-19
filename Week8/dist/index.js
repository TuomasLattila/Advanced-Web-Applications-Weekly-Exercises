"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const user_1 = __importDefault(require("./routes/user"));
const private_1 = __importDefault(require("./routes/private"));
const todos_1 = __importDefault(require("./routes/todos"));
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
app.use(express_1.default.json());
app.use('/api/user', user_1.default);
app.use('/api/private', private_1.default);
app.use('/api/todos', todos_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server is up on the port: " + process.env.PORT);
});
