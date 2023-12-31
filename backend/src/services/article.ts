import type { Request, Response } from "express";
import { Document, ObjectId } from "mongodb";
import { getCollection } from "../../database.ts";

const PAGINATION_COUNT = 5;

const articleCollection = getCollection("article");

const postArticle = async (req: Request, res: Response) => {
  try {
    const article = await articleCollection.insertOne({
      ...req.body,
      likes: 0,
      views: 0,
      comments: [],
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
    });

    return res.status(201).json({
      result: "success",
      article,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getRecentArticles = async (req: Request, res: Response) => {
  try {
    const totalArticlesCount = await articleCollection.countDocuments();
    const recentArticles: Document[] = [];

    const articles = articleCollection.aggregate([
      { $match: { is_deleted: false } },
      { $sort: { created_at: -1 } },
      {
        $skip:
          (parseInt(req.query?.current_page as string) - 1) *
            PAGINATION_COUNT || 0,
      },
      { $limit: PAGINATION_COUNT },
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    for await (const article of articles) {
      recentArticles.push(article);
    }

    return res.status(200).json({
      result: "success",
      totalArticlesCount,
      currentPage: parseInt(req.query?.current_page as string) || 1,
      recentArticles,
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

const getArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const article = await articleCollection.findOne({ _id: new ObjectId(id) });

    if (article && !article.is_deleted) {
      return res.status(200).json({
        result: "success",
        article,
      });
    }

    return res.status(404).json({
      result: "fail",
      error: "Not Found",
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await articleCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...req.body, updated_at: new Date() } }
    );

    return res.status(200).json({ result: "success" });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const article = await articleCollection.findOne({ _id: new ObjectId(id) });

    if (article && !article.is_deleted) {
      await articleCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { is_deleted: true, updated_at: new Date() } }
      );

      return res.status(200).json({ result: "success" });
    }

    return res.status(404).json({
      result: "fail",
      error: "Article not found",
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

export {
  postArticle,
  getRecentArticles,
  getArticle,
  updateArticle,
  deleteArticle,
};
