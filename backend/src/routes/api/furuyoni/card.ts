import express from "express";

import {
  getCardByFullCode,
  getCardsByCharName,
} from "../../../services/api/furuyoni/card.service.ts";

const router = express.Router();

router.get("/:fullCode", getCardByFullCode);
router.get("/character/:charName", getCardsByCharName);

export default router;
