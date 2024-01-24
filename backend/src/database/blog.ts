import AdminSchema from "../models/admin.ts";
import ArticleSchema from "../models/article.ts";
import CommentSchema from "../models/comment.ts";

export default {
  name: "blog",
  collections: [
    {
      name: "admin",
      schema: AdminSchema,
    },
    {
      name: "article",
      schema: ArticleSchema,
    },
    {
      name: "comment",
      schema: CommentSchema,
    },
  ],
};
