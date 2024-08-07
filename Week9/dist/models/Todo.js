"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = mongoose_1.default.model("Todo", new mongoose_1.default.Schema({
    user: mongodb_1.ObjectId,
    items: [String]
}));
