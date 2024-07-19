"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../strategies/auth"));
const router = express_1.default.Router();
router.get("/", auth_1.default.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user) {
        res.json({ email: JSON.parse(JSON.stringify(req.user)).email });
    }
});
module.exports = router;
exports.default = router;
