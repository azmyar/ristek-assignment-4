import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { db } from '../database/db';
import bcrypt from 'bcrypt';

dotenv.config();

export const userSignUp = async (req: Request, res: Response) => {

    try{
        await db.transaction().execute(async(trx) => {

            const user = await trx
                .insertInto('User')
                .values({
                    email: req.body.email,
                    username : req.body.username,
                    password : await bcrypt.hash(req.body.password, 8)
                })
                .returning(["id", "username", "email"])
                .executeTakeFirst();
        
            const profile = await trx
                .insertInto('Profile')
                .values({
                    firstName : req.body.firstName,
                    lastName : req.body.lastName,
                    userId : user!.id
                })
                .returning(["firstName", "lastName"])
                .executeTakeFirst();

            return res.status(201).send({user, profile})
        })
    }
    catch (err: any) {
        return res.status(500).send(err);
    };
};

export const userSignIn = async (req: Request, res: Response) => {

    try {
        const foundUser = await db
            .selectFrom('User')
            .select(['id', 'password'])
            .where('username', '=', req.body.username)
            .execute()

        if (foundUser.length == 0) {
            res.send('Name of user is not correct');
        }

        const isMatch = bcrypt.compareSync(req.body.password, foundUser[0].password);
     
        if (isMatch) {
            const token = jwt.sign(
                { user_id: foundUser[0]!.id },
                process.env.TOKEN_KEY as string,
                {
                    expiresIn: "2h",
                }
                );
            res.status(201).send({token})
        } else {
            res.send('Password is not correct');
        }  
        
    }
    catch (error) {
        return res.send(error)
    }
};