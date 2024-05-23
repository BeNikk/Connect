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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const setCookie_1 = __importDefault(require("../helpers/setCookie"));
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield userModel_1.default.findOne({ username });
            if (user) {
                const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
                if (isPasswordCorrect) {
                    (0, setCookie_1.default)(username, res);
                    res.json({
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        name: user.name,
                        password: user.password,
                        bio: user.bio,
                        profilePicture: user.profilePicture,
                        message: "Logged in successfully"
                    });
                }
                else {
                    return res.status(400).json({ error: "Password incorrect" });
                }
            }
            else {
                return res.status(400).json({ error: "No User Found" });
            }
        }
        catch (e) {
            console.log(`error occured ${e}`);
            return res.status(500).json({ error: e });
        }
    });
}
exports.default = Login;
