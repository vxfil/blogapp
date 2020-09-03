import express from 'express';
import * as AuthController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', AuthController.createUser);
authRouter.post('/passconfirm', AuthController.registerConfirm);
authRouter.post('/resend', AuthController.resendCode);
authRouter.post('/signin', AuthController.authentication);
authRouter.post('/refresh_token', AuthController.generateRefreshToken);
authRouter.post('/logout', AuthController.logout);

export default authRouter;
