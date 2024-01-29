import express from "express";

import FuruyoniRouter from "./api/furuyoni/index.ts";

const router = express.Router();

router.use("/furuyoni", FuruyoniRouter);

export default router;
