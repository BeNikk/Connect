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
const userModel_1 = __importDefault(require("../../models/userModel"));
const postModel_1 = __importDefault(require("../../models/postModel"));
const cloudinary_1 = require("cloudinary");
function CreatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { text, postedBy, } = req.body;
            let { image } = req.body;
            if (!text && !image) {
                return res.json({ error: "text or image is requird" });
            }
            if (req.headers["userId"] && !Array.isArray(req.headers["userId"])) {
                if (!postedBy) {
                    return res.json({ error: "Unauthorized" });
                }
                const userFromHeader = JSON.parse(req.headers["userId"]);
                const user = yield userModel_1.default.findById(postedBy);
                if (!user) {
                    return res.json({ error: "user not found" });
                }
                else {
                    if (user._id.toString() != userFromHeader._id.toString()) {
                        return res.json({ error: "You cannot post for other user" });
                    }
                    if (image) {
                        const uploadResponse = yield cloudinary_1.v2.uploader.upload(image);
                        image = uploadResponse.secure_url;
                    }
                    const newPost = new postModel_1.default({ text, image, postedBy });
                    yield newPost.save();
                    return res.json(newPost);
                }
            }
        }
        catch (e) {
            console.log(e);
            return res.json({ error: "error in creating post" });
        }
    });
}
exports.default = CreatePost;
