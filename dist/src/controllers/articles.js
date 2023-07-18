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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticle = exports.deleteArticle = exports.getArticles = exports.createArticle = void 0;
const db_1 = require("../database/db");
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_1.db
        .insertInto('Articles')
        .values({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        creatorId: req.user.user_id
    })
        .returningAll()
        .executeTakeFirst();
    return res.status(201).send(post);
});
exports.createArticle = createArticle;
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_1.db
        .selectFrom('Articles')
        .select(['id', 'title', 'content', 'createdAt', 'updatedAt', 'creatorId', 'tags'])
        .where('creatorId', '=', req.user.user_id)
        .execute();
    return res.status(201).send(post);
});
exports.getArticles = getArticles;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_1.db
        .deleteFrom('Articles')
        .where('id', '=', parseInt(req.query.articleId.toString()))
        .executeTakeFirst();
    return res.status(201).send(post);
});
exports.deleteArticle = deleteArticle;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_1.db
        .updateTable('Articles')
        .set({
        title: req.body.title,
        content: req.body.content
    })
        .where('id', '=', req.body.articleId)
        .returningAll()
        .executeTakeFirst();
    return res.status(200).send(post);
});
exports.updateArticle = updateArticle;
