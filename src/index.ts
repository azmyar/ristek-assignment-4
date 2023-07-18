import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import userRoute from './routes/userRoute'
import articlesRoute from './routes/articlesRoute'

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as swagger from "../swagger.json";

dotenv.config();

const app: Express = express();
const port: Number = Number(process.env.PORT);

const specs = swaggerJsdoc(swagger);


app.use(bodyParser.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use("/users", userRoute);
app.use("/articles", articlesRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});