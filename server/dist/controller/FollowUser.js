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
function Follow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (req.headers["userId"] && !Array.isArray(req.headers["userId"])) {
                //console.log(req.headers["userId"]);
                const userToModify = yield userModel_1.default.findById(id);
                if (!userToModify) {
                    return res.json({ error: "No such user" });
                }
                if (!id) {
                    return res.json({ error: "unauthorized" });
                }
                const currentUserInfo = JSON.parse(req.headers["userId"]);
                const currentUser = yield userModel_1.default.findById(currentUserInfo._id);
                if (id == currentUserInfo._id) { //objects needed to be equated using _.isequal, (simply equated they will give false)
                    return res.json({ error: "you cannot follow unfollow yourself" });
                }
                else {
                    if (currentUser && userToModify) {
                        if (id) {
                            const alreadyFollowing = currentUser.following.includes(id);
                            if (alreadyFollowing) {
                                //unfollow
                                yield userModel_1.default.findByIdAndUpdate(currentUserInfo._id, { $pull: { following: id } });
                                yield userModel_1.default.findByIdAndUpdate(userToModify._id, { $pull: { followers: currentUserInfo._id } });
                                return res.json({ message: "user successfully unfollowed" });
                            }
                        }
                        else {
                            yield userModel_1.default.findByIdAndUpdate(currentUserInfo._id, { $push: { following: userToModify._id } });
                            yield userModel_1.default.findByIdAndUpdate(userToModify._id, { $push: { followers: currentUserInfo._id } });
                            return res.json({ message: "user successfully followed" });
                        }
                    }
                }
            }
            else {
                return res.json({ error: "unauthorized/invalid user header" });
            }
            //const currentUser=await User.findById(id);
        }
        catch (e) {
            console.log('error in follow and unfollow ');
            return res.json({ error: "error in follow and unfollow" });
        }
    });
}
exports.default = Follow;
