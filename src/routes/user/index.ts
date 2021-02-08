import { user } from "../../controllers/UserController";
import { Router } from "express";
import { checkAuth } from "../../middlewares/authMiddleware";

const userRouter = Router();

userRouter.put('/user/create', user.create);
userRouter.post('/user/auth', user.auth);

export default userRouter;