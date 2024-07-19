"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
let userList = [];
let todosList = [];
let idCount = 0;
const secret = process.env.SECRET;
app.use((0, express_1.json)());
app.use((0, express_session_1.default)({
    secret: "myholysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.serializeUser((user, done) => {
    console.log("serialize");
    const obj = JSON.parse(JSON.stringify(user));
    //console.log(obj)
    done(null, obj.id);
});
passport_1.default.deserializeUser((id, done) => {
    console.log("deserialize");
    try {
        const foundUser = userList.find((user) => user.id == id);
        if (!foundUser)
            throw new Error("User was not found!");
        done(null, foundUser);
    }
    catch (err) {
        done(err, false);
    }
});
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => {
    try {
        const foundUser = userList.find((user) => user.username == username);
        if (!foundUser)
            throw new Error("User was not found!");
        bcryptjs_1.default.compare(password, foundUser.password, (err, isMatch) => {
            if (err) {
                return done(Error("Error authenticating user"));
            }
            if (!isMatch) {
                return done(Error("Inncorrect login information"));
            }
            done(null, foundUser);
        });
    }
    catch (err) {
        return done(err);
    }
}));
// authentication function
const validateSessionID = (req, res, next) => {
    //console.log(req.headers.cookie)
    if (req.headers.cookie) {
        next();
    }
    else {
        res.status(401).end();
    }
};
const loginAuthentication = (req, res, next) => {
    for (const user of userList) {
        if (req.body.username == user.username) {
            bcryptjs_1.default.compare(req.body.password, user.password, (err, isMatch) => {
                if (err)
                    throw err;
                if (isMatch) {
                    next();
                }
                else {
                    res.status(401).send("user no match").end();
                }
            });
        }
    }
};
//------
app.get("/error", (req, res) => {
    res.sendStatus(401);
});
app.get("/", (req, res) => {
    res.send("hello world").end();
});
app.get("/api/user/list", (req, res) => {
    res.send(userList);
});
app.get("/api/todos/list", (req, res) => {
    res.send(todosList);
});
//logged in routes
app.get("/api/secret", validateSessionID, (req, res) => {
    res.status(200).end();
});
//-----
app.post("/api/user/register", (req, res) => {
    if (req.headers.cookie) {
        return res.redirect("/");
    }
    for (const user of userList) {
        if (req.body.username == user.username)
            return res.status(400).end();
    }
    bcryptjs_1.default.genSalt(10, (err, salt) => {
        if (err)
            throw err;
        bcryptjs_1.default.hash(req.body.password, salt, (err, hash) => {
            if (err)
                throw err;
            const newUser = {
                id: idCount,
                username: req.body.username,
                password: hash
            };
            userList.push(newUser);
            res.json(newUser);
            idCount++;
        });
    });
});
app.post("/api/user/login", loginAuthentication, passport_1.default.authenticate('local', { failureRedirect: '/error' }), (req, res, next) => {
    if (req.headers.cookie) {
        return res.redirect("/");
    }
    res.status(200).send("user match");
});
app.post("/api/todos", validateSessionID, (req, res, next) => {
    if (req.user) {
        const obj = JSON.parse(JSON.stringify(req.user));
        for (const item of todosList) {
            if (item.id === obj.id) {
                item.todos.push(req.body.todo);
                return res.send(item);
            }
        }
        const newItem = {
            id: obj.id,
            todos: [req.body.todo]
        };
        todosList.push(newItem);
        return res.send(newItem);
    }
});
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
