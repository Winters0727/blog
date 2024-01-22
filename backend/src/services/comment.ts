import type { Request, Response } from "express";
import { Document, ObjectId } from "mongodb";

import { getCollection } from "../../database.ts";

import { comparePassword, hashPassword } from "../utils/password.ts";

const commentCollection = getCollection("comment");

const postComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentCollection.insertOne({
      ...req.body,
      password: hashPassword(req.body.password),
      address: req.ip || req.socket.remoteAddress,
      likes: 0,
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
    });

    return res.status(201).json(comment);
  } catch (err: any) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getComments = async (req: Request, res: Response) => {
  try {
    const articleComments: Document[] = [];

    const comments = commentCollection.aggregate([
      {
        $match: {
          article_id: req.params.article_id,
        },
      },
      {
        $sort: {
          created_at: -1,
        },
      },
      {
        $project: {
          _id: 1,
          address: 1,
          name: 1,
          context: 1,
          likes: 1,
          created_at: 1,
          is_deleted: 1,
        },
      },
    ]);

    for await (const comment of comments) {
      articleComments.push(comment);
    }

    const refinedComments = articleComments.map((comment: Document) =>
      comment.is_deleted
        ? { _id: comment._id, is_deleted: comment.is_deleted }
        : comment
    );

    return res.status(200).json({
      result: "success",
      comments: refinedComments,
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const comment = await commentCollection.findOne({ _id: new ObjectId(id) });

    if (comment && !comment.is_deleted) {
      if (comparePassword(password, comment.password)) {
        await commentCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { is_deleted: true, updated_at: new Date() } }
        );

        return res.status(200).json({ result: "success" });
      }

      return res.status(401).json({
        result: "fail",
        error: "Password not match",
      });
    }

    return res.status(404).json({
      result: "fail",
      error: "Comment not found",
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

export { postComment, getComments, deleteComment };
