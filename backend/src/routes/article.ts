import express from "express";
import {
  postArticle,
  getCategories,
  getRecentArticles,
  getArticle,
  updateArticle,
  updateArticleLikes,
  deleteArticle,
} from "../services/article.ts";

const router = express.Router();

router.post("", postArticle);

router.get("/category", getCategories);
router.get("/recent", getRecentArticles);
router.get("/:id", getArticle);

router.put("/:id", updateArticle);
router.get("/likes/:id", updateArticleLikes);

router.delete("/:id", deleteArticle);

export default router;
