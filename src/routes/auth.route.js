import Router from"express"
import { getUser, login, logout, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.post('/register',register),
userRoute.post('/login',login)
userRoute.post('/logout',logout)
userRoute.get('/get-user',authMiddleware,getUser)

export default userRoute