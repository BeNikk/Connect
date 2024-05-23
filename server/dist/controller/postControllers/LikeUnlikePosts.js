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
function LikeUnlikePosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (req.headers["userId"] && !Array.isArray(req.headers["userId"])) {
                const userHeader = JSON.parse(req.headers["userId"]);
                const user = yield userModel_1.default.findById(userHeader._id);
                if (!user) {
                    return res.json({ message: "Unauthorized" });
                }
                else {
                    const post = yield postModel_1.default.findById(id);
                    if (!post) {
                        return res.json({ message: "no such post exist" });
                    }
                    const liked = post.likes.includes(user._id);
                    if (liked) {
                        yield postModel_1.default.findByIdAndUpdate(post._id, { $pull: { likes: user._id } });
                        return res.json({ message: "Post unliked" });
                    }
                    else {
                        yield postModel_1.default.findByIdAndUpdate(post._id, { $push: { likes: user._id } });
                        return res.json({ message: "post liked" });
                    }
                }
            }
        }
        catch (e) {
            return res.json({ message: "Error in liking/unliking" });
        }
    });
}
exports.default = LikeUnlikePosts;
