import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface RequestWithUser extends Request {
  user?: JwtPayload;
}

const config: NodeJS.ProcessEnv = process.env;

const auth = (req: RequestWithUser, res: Response, next: NextFunction): void => {
  const token: string | undefined = 
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(403).send("A token is required for authentication");
    return;
  }

  try {
    const decoded: JwtPayload = jwt.verify(token, config.TOKEN_KEY as string) as JwtPayload;
    req.user = decoded;
  } catch (err) {
    res.status(401).send("Invalid Token");
    return;
  }

  next();
};

export default auth;
