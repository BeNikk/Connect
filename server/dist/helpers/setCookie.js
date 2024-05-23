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
dotenv_1.default.config();
const jwtsecREt = process.env.JWT_SECRET || "ABC";
function generateToken(username, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = jsonwebtoken_1.default.sign(username, jwtsecREt, {});
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 24 * 60 * 60 * 1000,
                sameSite: "strict",
            });
            return token;
        }
        catch (e) {
            console.log(`error in signing ${e}`);
            return res.json({ message: "error occured in setting cookie" });
        }
    });
}
exports.default = generateToken;
