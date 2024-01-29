import express from "express";

import CharacterRouter from "./character.ts";
import CardRouter from "./card.ts";
import FaqRouter from "./faq.ts";

const router = express.Router();

router.use("/character", CharacterRouter);
router.use("/card", CardRouter);
router.use("/faq", FaqRouter);

export default router;
