import express from "express";
import {
  postComment,
  getComments,
  deleteComment,
} from "../services/comment.ts";

const router = express.Router();

router.post("", postComment);

router.get("/:article_id", getComments);

router.delete("/:id", deleteComment);

export default router;
