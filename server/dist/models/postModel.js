"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postModel = new mongoose_1.default.Schema({
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        maxLength: 500
    },
    image: {
        type: String,
    },
    likes: {
        //array of objects
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    replies: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            text: {
                type: String
            },
            userProfilePic: {
                type: String,
            },
            userName: {
                type: String
            }
        }
    ]
}, {
    timestamps: true
});
const Post = mongoose_1.default.model('Post', postModel);
exports.default = Post;
