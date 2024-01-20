import express from "express";
import bodyParser from "body-parser";

import "./env.ts";
import { initializeDatabase } from "./database.ts";
import ArticleRouter from "./src/routes/article.ts";
import CommentRouter from "./src/routes/comment.ts";

const app = express();

app.set("trust proxy", true);

app.use(bodyParser.json());

app.use("/article", ArticleRouter);
app.use("/comment", CommentRouter);

app.listen(
  process.env.PORT ? parseInt(process.env.PORT) : 3000,
  "0.0.0.0",
  () => {
    initializeDatabase();
    console.log("App is running...");
  }
);
