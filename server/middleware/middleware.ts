import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/userModel";
dotenv.config();
const secret=process.env.JWT_SECRET || "";
const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
      console.log("middleware");
      const token = req.headers.token;
      console.log(token);
      if (token && typeof token === "string") {
          console.log("here");
          try {
              const verified = jwt.verify(token, secret);
              console.log(verified);
              const user = await User.findOne({ username: verified });
              console.log(user);

              if (!user) {
                  return res.status(403).send("Forbidden");
              }

              if (typeof user === "string") {
                  return res.status(403).send("Forbidden");
              }

              req.headers["userId"] = JSON.stringify(user);

              next();
          } catch (error) {
              console.error("JWT verification failed:", error);
              return res.status(403).send("Forbidden");
          }
      } else {
          return res.status(401).json({ error: "Unauthorized" });
      }
  } catch (e) {
      console.error("Error occurred:", e);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default middleware
