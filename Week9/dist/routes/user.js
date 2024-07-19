"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const multer_1 = __importDefault(require("multer"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.post('/register', (0, express_validator_1.body)('email').isString().isEmail(), (0, express_validator_1.body)('password').isString().isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
        return res.status(400).send("Password is not strong enough");
    }
    try {
        if (req.body.email && req.body.password) {
            const foundUser = yield User_1.default.findOne({ email: req.body.email });
            if (!foundUser) {
                bcryptjs_1.default.genSalt(10, (err, salt) => {
                    if (err)
                        throw err;
                    bcryptjs_1.default.hash(req.body.password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                        if (err)
                            throw err;
                        const newUser = new User_1.default({
                            email: req.body.email,
                            password: hash
                        });
                        yield newUser.save();
                        res.status(200).redirect('/login.html');
                    }));
                });
            }
            else {
                res.status(403).send("Email already in use! Try another.");
            }
        }
        else {
            res.send("Bad credentials! Try again.");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
router.post('/login', upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield User_1.default.findOne({ email: req.body.email });
        if (!foundUser) {
            return res.status(403).json({ msg: "Invalid credentials" });
        }
        else {
            bcryptjs_1.default.compare(req.body.password, foundUser.password, (err, value) => {
                if (value) {
                    const secret = process.env.SECRET ? process.env.SECRET : "myholysecret";
                    let token = jsonwebtoken_1.default.sign({ email: foundUser.email }, secret);
                    if (token) {
                        res.send({
                            success: true,
                            token: token
                        });
                    }
                }
                else {
                    return res.status(403).json({ msg: "Invalid credentials" });
                }
            });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
module.exports = router;
exports.default = router;
