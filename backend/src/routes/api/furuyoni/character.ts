import express from "express";

import {
  getCharacter,
  getCharacterList,
} from "../../../services/api/furuyoni/character.service.ts";

const router = express.Router();

router.get("/list", getCharacterList);
router.get("/:parameter", getCharacter);

export default router;
