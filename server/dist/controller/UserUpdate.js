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
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "";
const apiKey = process.env.CLOUDINARY_API_KEY || "";
const apiSecret = process.env.CLOUDINARY_API_SECRET || "";
cloudinary_1.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});
function UserUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, username, email, password, bio } = req.body;
            let { profilePicture } = req.body;
            if (req.headers["userId"] && !Array.isArray(req.headers["userId"])) {
                const currentUser = JSON.parse(req.headers["userId"]);
                if (req.params.id != (currentUser._id).toString()) {
                    return res.json({ error: "you cannot update other person's profile" });
                }
                const currentUserId = currentUser._id;
                let user = yield userModel_1.default.findById(currentUserId);
                if (!user) {
                    return res.json({ error: "user not found" });
                }
                if (password && user) {
                    const salt = yield bcryptjs_1.default.genSalt(10);
                    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                    user.password = hashedPassword;
                }
                if (profilePicture) {
                    if (user.profilePicture) {
                        let img = user.profilePicture.split("/").pop();
                        if (img) {
                            yield cloudinary_1.v2.uploader.destroy(img.split(".")[0]);
                        }
                    }
                    const uploadResponse = yield cloudinary_1.v2.uploader.upload(profilePicture);
                    profilePicture = uploadResponse.secure_url;
                }
                if (user) {
                    user.name = name || user.name;
                    user.email = email || user.email;
                    user.username = username || user.username;
                    user.profilePicture = profilePicture || user.profilePicture;
                    user.bio = bio || user.bio;
                    user._id = user._id;
                    user = yield user.save();
                    return res.json(user);
                }
            }
        }
        catch (e) {
            return res.json({ error: "error in updating the user" });
        }
    });
}
exports.default = UserUpdate;
