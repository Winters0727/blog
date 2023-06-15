import dotenv from "dotenv";

export default dotenv.config({
  path:
    process.env.NODE_ENV === "development"
      ? "./.env.development"
      : "./.env.production",
});
