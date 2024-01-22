import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

import "./env.ts";
import { initializeDatabase } from "./database.ts";

import AdminRouter from "./src/routes/admin.ts";
import ArticleRouter from "./src/routes/article.ts";
import CommentRouter from "./src/routes/comment.ts";

const app = express();

app.set("trust proxy", true);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "winters",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  })
);

app.use(bodyParser.json());

app.use("/admin", AdminRouter);
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
