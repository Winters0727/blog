import express from "express";
import bodyParser from "body-parser";

import "./env.ts";
import { initializeDatabase } from "./database.ts";
import ArticleRouter from "./src/routes/article.ts";

const app = express();

app.use(bodyParser.json());

app.use("/article", ArticleRouter);

app.listen(process.env.PORT, () => {
  initializeDatabase();
  console.log("App is running...");
});
