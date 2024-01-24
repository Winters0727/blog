import type { Request, Response } from "express";

import { getCollection } from "../../database.ts";

import { comparePassword } from "../utils/password.ts";

import type { Session } from "express-session";
import type { Account } from "../types/model.type.ts";

interface AdminSession extends Session {
  admin: {
    isLoggedIn: boolean;
    loggedInAt: number;
    lastLoggedInAt: number | null;
  } | null;
}

let lastLoggedInAt: number | null = null;

const login = async (req: Request, res: Response) => {
  try {
    const adminCollection = getCollection("blog", "admin");
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

        res.cookie("admin", "true", {
          maxAge: 60 * 60 * 1000,
        });

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
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const session = req.session as AdminSession;

    if (session.admin) {
      const currentTime = Date.now();
      lastLoggedInAt = currentTime;
      session.admin = null;

      res.clearCookie("admin");

      return res.status(200).json({
        result: "success",
      });
    }

    return res.status(400).json({
      result: "fail",
      error: "Bad request",
    });
  } catch (err: any) {
    return res.status(500).json({
      result: "fail",
      error: "Internal Server Error",
    });
  }
};

const isAuthorized = (req: Request) => {
  const session = req.session as AdminSession;

  return session.admin && session.admin.isLoggedIn;
};

export { login, logout, isAuthorized };
