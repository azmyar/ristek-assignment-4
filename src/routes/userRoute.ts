import express, { Express, Router } from 'express';
import { body } from 'express-validator';

import validate from "../middlewares/validate";
import { userSignIn, userSignUp } from '../controllers/users';

const app: Express = express();
const userRouter = Router();

userRouter.post(
    "/signin",
    validate([
      body("username").exists().isString(),
      body("password").exists().isString(),
    ]),
    userSignIn
  );

userRouter.post(
    "/signup",
    validate([
      body("email").exists().isString(),
      body("password").exists().isString(),
      body("username").exists().isString(),
      body("firstName").exists().isString(),
      body("lastName").exists().isString(),
    ]),
    userSignUp
  );

export default userRouter