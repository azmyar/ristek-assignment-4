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
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("../middlewares/validate"));
const users_1 = require("../controllers/users");
const app = (0, express_1.default)();
const userRouter = (0, express_1.Router)();
userRouter.post("/signin", (0, validate_1.default)([
    (0, express_validator_1.body)("username").exists().isString(),
    (0, express_validator_1.body)("password").exists().isString(),
]), users_1.userSignIn);
userRouter.post("/signup", (0, validate_1.default)([
    (0, express_validator_1.body)("email").exists().isString(),
    (0, express_validator_1.body)("password").exists().isString(),
    (0, express_validator_1.body)("username").exists().isString(),
    (0, express_validator_1.body)("firstName").exists().isString(),
    (0, express_validator_1.body)("lastName").exists().isString(),
]), users_1.userSignUp);
exports.default = userRouter;
