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
const auth_1 = __importDefault(require("../strategies/auth"));
const Todo_1 = __importDefault(require("../models/Todo"));
const router = (0, express_1.default)();
router.get("/list", auth_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const reqUser = JSON.parse(JSON.stringify(req.user));
            const foundTodo = yield Todo_1.default.findOne({ user: reqUser._id });
            if (foundTodo) {
                res.json({ items: foundTodo.items });
            }
            else {
                res.json({ items: [] });
            }
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
router.post("/", auth_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user && req.body.items) {
            const reqUser = JSON.parse(JSON.stringify(req.user));
            const foundTodo = yield Todo_1.default.findOne({ user: reqUser._id });
            if (foundTodo) {
                for (const item of req.body.items) {
                    foundTodo.items.push(item);
                }
                yield foundTodo.save();
                res.sendStatus(200);
            }
            else {
                const newTodo = new Todo_1.default({
                    user: reqUser._id,
                    items: req.body.items
                });
                yield newTodo.save();
                res.sendStatus(200);
            }
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
module.exports = router;
exports.default = router;
