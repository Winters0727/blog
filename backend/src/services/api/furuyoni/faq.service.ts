import type { Request, Response } from "express";

import { getCollection } from "../../../../database.ts";

const FAQ_DEFAULT_COUNT = 20;

const createSearchQuery = (query: Request["query"]) => {
  const { category, keyword } = query;

  if (category)
    return {
      category: {
        $match: category,
      },
      question: {
        $regex: keyword || "",
      },
    };

  return {
    question: {
      $regex: keyword || "",
    },
  };
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const faqCollection = getCollection("furuyoni", "faq");

    const category = await faqCollection.distinct("category");

    return res.status(200).json({
      result: "success",
      category,
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

const getFaqs = async (req: Request, res: Response) => {
  try {
    const { category, keyword } = req.query;

    const faqCollection = getCollection("furuyoni", "faq");

    const findQuery = createSearchQuery({
      category,
      keyword,
    });

    const faq =
      category || keyword
        ? await faqCollection
            .find(findQuery)
            .project({
              _id: 0,
            })
            .toArray()
        : await faqCollection
            .find()
            .project({
              _id: 0,
            })
            .limit(FAQ_DEFAULT_COUNT)
            .toArray();

    return res.status(200).json({
      result: "success",
      faq,
      length: faq.length,
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

export { getCategories, getFaqs };
