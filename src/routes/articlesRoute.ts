import express, { Express, Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { createArticle, getArticles, deleteArticle, updateArticle } from "../controllers/articles";
import validate from "../middlewares/validate";
import auth from "../middlewares/auth";

const app: Express = express();
const articlesRouter = Router();

articlesRouter.post(
    "/",
    validate([
      body("title").exists().isString(),
      body("content").exists().isString(),
      body("tags").exists().isArray()
    ]),
    auth,
    createArticle
);

articlesRouter.get(
    "/",
    auth,
    getArticles
);

articlesRouter.delete(
    "/",
    auth,
    deleteArticle
);

articlesRouter.patch(
    "/",
    validate([
      body("articleId").exists().isNumeric(),
      body("title").exists().isString(),
      body("content").exists().isString()
    ]),
    auth,
    updateArticle
);

export default articlesRouter