"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const Signup_1 = __importDefault(require("../controller/Signup"));
const Login_1 = __importDefault(require("../controller/Login"));
const Logout_1 = __importDefault(require("../controller/Logout"));
const FollowUser_1 = __importDefault(require("../controller/FollowUser"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
const UserUpdate_1 = __importDefault(require("../controller/UserUpdate"));
const getUser_1 = __importDefault(require("../controller/getUser"));
const getUserById_1 = __importDefault(require("../controller/getUserById"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get('/test', (req, res) => {
    res.json({ message: "test route" });
});
userRouter.post('/signup', Signup_1.default);
userRouter.post('/login', Login_1.default);
userRouter.post('/logout', Logout_1.default);
userRouter.post('/follow/:id', middleware_1.default, FollowUser_1.default);
userRouter.put('/update/:id', middleware_1.default, UserUpdate_1.default);
userRouter.get('/:username', getUser_1.default);
userRouter.get('/id/:userId', getUserById_1.default);
