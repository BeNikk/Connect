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
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, username, email, password } = req.body;
            const user = yield userModel_1.default.findOne({ $or: [{ username }, { email }] });
            if (user) {
                return res.status(400).json({ error: "User already exists" });
            }
            else {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedpassword = yield bcryptjs_1.default.hash(password, salt);
                const newUser = new userModel_1.default({
                    name,
                    username,
                    email,
                    password: hashedpassword
                });
                yield newUser.save();
                if (newUser) {
                    (0, setCookie_1.default)(newUser.username, res);
                    return res.status(200).json({
                        _id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        password: newUser.password,
                        username: newUser.username,
                        message: "Succesfully signed up"
                    });
                }
                else {
                    return res.status(400).json({ error: "Invalid user data" });
                }
            }
        }
        catch (e) {
            console.log(`error ${e}`);
            return res.status(500).send(`Error in the server`);
        }
    });
}
exports.default = signup;
