import express from "express";

import {
  getCardByCode,
  getCardsByCharName,
} from "../../../services/api/furuyoni/card.service.ts";

const router = express.Router();

router.get("/:code", getCardByCode);
router.get("/character/:charName", getCardsByCharName);

export default router;
