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
        const token = req.cookies.token;
        if (token) {
            const verified = jsonwebtoken_1.default.verify(token, secret);
            const user = yield userModel_1.default.findOne({ username: verified });
            // console.log(verified);
            if (!user) {
                return res.status(403);
            }
            if (typeof user === "string") {
                return res.status(403);
            }
            else {
                req.headers["userId"] = JSON.stringify(user);
                next();
            }
        }
        else {
            return res.json({ error: `Unauthorized` });
        }
    }
    catch (e) {
        console.log(`error occured`);
        return res.json({ error: e });
    }
});
exports.default = middleware;
