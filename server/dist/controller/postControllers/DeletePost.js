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
function DeletePosts(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (req.headers["userId"] && !Array.isArray(req.headers["userId"])) {
                const userHeader = JSON.parse(req.headers["userId"]);
                const user = yield userModel_1.default.findById(userHeader._id);
                const post = yield postModel_1.default.findById(id);
                if (!post) {
                    return res.json({ message: "no post found" });
                }
                if (post.image) {
                    const imgMod = post.image.split("/");
                    const imageId = (_a = imgMod.pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
                    if (imageId) {
                        yield cloudinary_1.v2.uploader.destroy(imageId);
                    }
                }
                if (!user || (user._id.toString() != (post === null || post === void 0 ? void 0 : post.postedBy.toString()))) {
                    return res.json({ message: "unauthorized" });
                }
                yield postModel_1.default.findByIdAndDelete(id);
                return res.json({ message: "post deleted successfully" });
            }
        }
        catch (e) {
            return res.json({ message: "error occured in deleting the post", e });
        }
    });
}
exports.default = DeletePosts;
