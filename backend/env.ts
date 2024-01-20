import path from "path";
import dotenv from "dotenv";

export default dotenv.config({
  path:
    process.env.NODE_ENV === "development"
      ? path.resolve(process.cwd(), ".env.development")
      : path.resolve(process.cwd(), ".env.production"),
});
