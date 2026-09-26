import { NextFunction, Request, Response } from "express";
import AuthService from "../service/auth.service";
import axios from "axios";
import { setSessionCookie } from "../helpers/auth";
import { RegisterBody, LoginBody } from "../validators/auth.validator";
import userService from '../service/user.service'
import Postgres from "../connection/postgres";
import { GetMeResponse, LoginResponse, LogoutResponse, RegisterResponse } from "../response/auth.response";

export const register = async (req: Request<{}, any, RegisterBody>, res: Response<RegisterResponse>, next: NextFunction) => {
  const transaction = await Postgres.sequelize.transaction();
  try {
    const user = await AuthService.register(req.body, transaction);
    const loginResult = await AuthService.login({ 
        email: user.email, 
        password: req.body.password 
    });
    const { session_id, ...safeReuslt } = loginResult;
    setSessionCookie(res, session_id!);

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: safeReuslt,
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const login = async (req: Request<{}, any, LoginBody>, res: Response<LoginResponse>, next: NextFunction) => {
  try {
    const user = await AuthService.login(req.body);
    const { session_id, ...safeResult} = user
    setSessionCookie(res, session_id!);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeResult,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response<GetMeResponse>, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(403).json({ success: false, message: "Forbidden" });
    const user = await userService.findOne(userId!);
    if (!user) res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response<LogoutResponse>, next: NextFunction) => {
  try {
    const sessionId = req.cookies?.session_id;
    if (!sessionId) return res.status(200).json({ success: true, message: "Already logged out" });
    await AuthService.logout(sessionId);
    res.clearCookie("session_id");
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

