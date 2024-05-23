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
function GetFeedPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.headers["userId"] && !Array.isArray(req.headers["userId"])) {
                const userHeader = JSON.parse(req.headers["userId"]);
                const user = yield userModel_1.default.findById(userHeader._id);
                if (!user) {
                    return res.json({ message: "unauthorized" });
                }
                const following = user.following;
                const feedposts = yield postModel_1.default.find({}).sort({ createdAt: -1 });
                if (feedposts) {
                    return res.json(feedposts);
                }
                else {
                    return res.json([{ message: "Follow some users" }]);
                }
            }
        }
        catch (e) {
            return res.json({ message: "error in getting the feed" });
        }
    });
}
exports.default = GetFeedPosts;
