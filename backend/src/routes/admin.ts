import express from "express";

import { login, logout } from "../services/admin.ts";

const router = express.Router();

router.post("/login", login);

router.get("/logout", logout);

export default router;
