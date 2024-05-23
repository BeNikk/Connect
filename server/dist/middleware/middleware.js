"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = __importDefault(require("../models/userModel"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET || "";
const middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("middleware");
        const token = req.headers.token;
        console.log(token);
        if (token && typeof token === "string") {
            console.log("here");
            try {
                const verified = jsonwebtoken_1.default.verify(token, secret);
                console.log(verified);
                const user = yield userModel_1.default.findOne({ username: verified });
                console.log(user);
                if (!user) {
                    return res.status(403).send("Forbidden");
                }
                if (typeof user === "string") {
                    return res.status(403).send("Forbidden");
                }
                req.headers["userId"] = JSON.stringify(user);
                next();
            }
            catch (error) {
                console.error("JWT verification failed:", error);
                return res.status(403).send("Forbidden");
            }
        }
        else {
            return res.status(401).json({ error: "Unauthorized" });
        }
    }
    catch (e) {
        console.error("Error occurred:", e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = middleware;
