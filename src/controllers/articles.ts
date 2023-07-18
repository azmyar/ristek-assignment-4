import { JwtPayload } from 'jsonwebtoken';
import { db } from '../database/db'
import { Request, Response } from "express";

interface RequestWithUser extends Request {
    user?: JwtPayload;
  }

export const createArticle = async (req: RequestWithUser, res: Response) => {

    const post = await db
      .insertInto('Articles')
      .values({
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            creatorId: req.user!.user_id
      })
      .returningAll()
      .executeTakeFirst();

    return res.status(201).send(post);
};

export const getArticles = async (req: RequestWithUser, res: Response) => {
      
    const post = await db
    .selectFrom('Articles')
    .select(['id', 'title', 'content', 'createdAt', 'updatedAt', 'creatorId', 'tags'])
    .where('creatorId', '=', req.user!.user_id)
    .execute()

    return res.status(201).send(post);
};

export const deleteArticle = async (req: Request, res: Response) => {
      
    const post = await db
    .deleteFrom('Articles')
    .where('id', '=', parseInt(req.query.articleId!.toString()))
    .executeTakeFirst()

    return res.status(201).send(post);
};

export const updateArticle = async (req: Request, res: Response) => {
  
    const post = await db
        .updateTable('Articles')
        .set({
            title: req.body.title,
            content: req.body.content
        })
        .where('id', '=', req.body.articleId)
        .returningAll()
        .executeTakeFirst()

    return res.status(200).send(post);
};