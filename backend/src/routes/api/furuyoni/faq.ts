import express from "express";

import {
  getCategories,
  getFaqs,
} from "../../../services/api/furuyoni/faq.service.ts";

const router = express.Router();

router.get("/", getFaqs);
router.get("/category", getCategories);

export default router;
