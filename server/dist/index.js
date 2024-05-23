"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./models/connectDB"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = require("./routes/userRoutes");
const postRoute_1 = __importDefault(require("./routes/postRoute"));
const cloudinary_1 = require("cloudinary");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "";
const apiKey = process.env.CLOUDINARY_API_KEY || "";
const apiSecret = process.env.CLOUDINARY_API_SECRET || "";
cloudinary_1.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
(0, connectDB_1.default)();
app.use((0, cors_1.default)());
app.use('/api/user', userRoutes_1.userRouter);
app.use('/api/post', postRoute_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
