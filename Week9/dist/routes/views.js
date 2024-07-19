"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../strategies/auth"));
const router = express_1.default.Router();
router.get('/auth', (req, res, next) => {
    auth_1.default.authenticate('jwt', function (err, user) {
        if (err) {
            return res.send(`
            <a href="/register.html">Register</a>
            <br>
            <a href="/login.html">Login</a>
            `);
        }
        if (!user) {
            return res.send(`
            <a href="/register.html">Register</a>
            <br>
            <a href="/login.html">Login</a>
            `);
        }
        res.send(`
            <h1> Profile
            <h2> ${user.email} </h2>
            <br>
            <input id="add-item" type="text" placeholder="Add todo here">
            <br>
            <button id="logout"> Logout </button>
            <ol id="items">
            `);
    })(req, res, next);
});
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/register.html', (req, res) => {
    res.render('register');
});
router.get('/login.html', (req, res) => {
    res.render('login');
});
module.exports = router;
exports.default = router;
