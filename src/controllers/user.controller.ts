import { NextFunction, Request, Response } from "express";
import userService from "../service/user.service";
import { CreateUserPayload } from "../repositories/auth.repository";
import { FindUsersOptions } from "../repositories/user.repository";
import { CreateUserBody, GetOneUserParams, GetUserQuery, UpdateUserBody } from "../validators/user.validator";
import { createError } from "../helpers/error";
import Postgres from "../connection/postgres";
import { CreateUserResponse, DeleteUserResponse, GetAllUsersResponse, GetOneUserResponse, UpdateUserResponse } from "../response/user.response";

export const createUser = async (req: Request<{}, any, CreateUserBody>, res: Response<CreateUserResponse>, next: NextFunction) => {
  const transaction = await Postgres.sequelize.transaction();
  try {
    const data = req.body;

    const user_id = req.user?.id
    if(!user_id) throw createError("Forbidden", 403);

    const user = await userService.create(data, user_id, transaction);
    await transaction.commit();

    return res.status(201).json({success: true, message: "User created", data: user });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const getUser = async (req: Request<GetOneUserParams>, res: Response<GetOneUserResponse>, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await userService.findOne(id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request<{}, any, any, any>, res: Response<GetAllUsersResponse>, next: NextFunction) => {
  try {
    const query = (req as any).validated?.query as GetUserQuery;
    const result = await userService.findAll(query);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


export const updateUser = async (req: Request<GetOneUserParams, any, UpdateUserBody>, res: Response<UpdateUserResponse>, next: NextFunction) => {   
  try {
        const id = req.params.id;
        const user_id = req.user?.id

        if(!user_id) throw createError("Unauthorized", 401);
        const user = await userService.update(id, req.body, user_id);
        return res.status(200).json({ success: true, message: "User updated", data: user });

    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req: Request<GetOneUserParams>, res: Response<DeleteUserResponse>, next: NextFunction) => {
  try {
    const id = req.params.id;
    await userService.delete(id);
    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
