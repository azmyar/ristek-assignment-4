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
exports.userSignIn = exports.userSignUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../database/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.transaction().execute((trx) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield trx
                .insertInto('User')
                .values({
                email: req.body.email,
                username: req.body.username,
                password: yield bcrypt_1.default.hash(req.body.password, 8)
            })
                .returning(["id", "username", "email"])
                .executeTakeFirst();
            const profile = yield trx
                .insertInto('Profile')
                .values({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userId: user.id
            })
                .returning(["firstName", "lastName"])
                .executeTakeFirst();
            return res.status(201).send({ user, profile });
        }));
    }
    catch (err) {
        return res.status(500).send(err);
    }
    ;
});
exports.userSignUp = userSignUp;
const userSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield db_1.db
            .selectFrom('User')
            .select(['id', 'password'])
            .where('username', '=', req.body.username)
            .execute();
        if (foundUser.length == 0) {
            res.send('Name of user is not correct');
        }
        const isMatch = bcrypt_1.default.compareSync(req.body.password, foundUser[0].password);
        if (isMatch) {
            const token = jsonwebtoken_1.default.sign({ user_id: foundUser[0].id }, process.env.TOKEN_KEY, {
                expiresIn: "2h",
            });
            res.status(201).send({ token });
        }
        else {
            res.send('Password is not correct');
        }
    }
    catch (error) {
        return res.send(error);
    }
});
exports.userSignIn = userSignIn;
