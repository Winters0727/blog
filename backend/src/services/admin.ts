import type { Request, Response } from "express";

import { getCollection } from "../../database.ts";

import { comparePassword } from "../utils/password.ts";

import type { Session } from "express-session";
import type { Account } from "../types/model.type.ts";

const adminCollection = getCollection("admin");

interface AdminSession extends Session {
  admin: {
    isLoggedIn: boolean;
    loggedInAt: number;
    lastLoggedInAt: number | null;
  } | null;
}

let lastLoggedInAt: number | null = null;

const login = async (req: Request, res: Response) => {
  const { id, password } = req.body as Account;

  const adminAccount = await adminCollection.findOne({ id });

  if (!adminAccount) {
    return res.status(401).json({
      result: "fail",
      error: "Invalid account",
    });
  }

  if (comparePassword(password, adminAccount.password)) {
    const session = req.session as AdminSession;

    if (!session.admin || !session.admin.isLoggedIn) {
      const currentTime = Date.now();
      session.admin = {
        isLoggedIn: true,
        loggedInAt: currentTime,
        lastLoggedInAt: lastLoggedInAt || currentTime,
      };

      return res.status(200).json({
        result: "success",
      });
    }

    return res.status(401).json({
      result: "fail",
      error: "Already logged in",
    });
  }

  return res.status(401).json({
    result: "fail",
    error: "Password not matched",
  });
};

const logout = async (req: Request, res: Response) => {
  const session = req.session as AdminSession;

  if (session.admin) {
    const currentTime = Date.now();
    lastLoggedInAt = currentTime;
    session.admin = null;

    return res.status(200).json({
      result: "success",
    });
  }

  return res.status(400).json({
    result: "fail",
    error: "Bad request",
  });
};

export { login, logout };
