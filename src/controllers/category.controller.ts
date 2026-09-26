import { NextFunction, Request, Response } from "express";
import { CreateCategoryBody, GetAllCategoriesQuery, GetOneCategoryParams, UpdateCategoryBody } from "../validators/category.validator";
import CategoryService from "../service/category.service";
import { createError } from "../helpers/error";
import { CreateCategoryResponse, DeleteCategoryResponse, GetAllCategoryResponse, GetOneCategoryResponse, UpdateCategoryResponse } from "../response/category.response";


export const createCategory = async (req: Request<{}, any, CreateCategoryBody>, res: Response<CreateCategoryResponse>, next: NextFunction) => {
    try {
        const body = req.body;
        const user_id = req.user?.id;
        if (!user_id) throw createError("Unautorized", 401);

        const category = await new CategoryService().createCategory(body, user_id);
        return res.status(201).json({success: true, message: "Category created", data: category });

    } catch (error) {
        next(error);
    }
}

export const getOneCategory = async (req: Request<GetOneCategoryParams>, res: Response<GetOneCategoryResponse>, next: NextFunction) => {
    try {
        const user_id = req.user?.id;
        const params = req.params;
        if (!user_id) throw createError("Unauthorized", 401);

        const category = await new CategoryService().getOneCategory(params, user_id);
        return res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}

export const getAllCategories = async (req: Request, res: Response<GetAllCategoryResponse>, next: NextFunction) => {
    try {
        const user_id = req.user?.id;
        const query = (req as any).validated?.query as GetAllCategoriesQuery;

        if (!user_id) throw createError("Unauthorized", 401);
        const categories = await new CategoryService().getAllCategories(query, user_id);
        return res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}

export const updateCategory = async (req: Request<GetOneCategoryParams, any, UpdateCategoryBody>, res: Response<UpdateCategoryResponse>, next: NextFunction) => {
    try {
        const user_id = req.user?.id;
        const params = req.params;
        const body = req.body;

        if (!user_id) throw createError("Unauthorized", 401);
        const category = await new CategoryService().updateCategory({ ...params, ...body }, user_id);
        return res.status(200).json({success: true, message: "Category updated", data: category });
    } catch (error) {
        next(error);
    }
}

export const deleteCategory = async (req: Request<GetOneCategoryParams>, res: Response<DeleteCategoryResponse>, next: NextFunction) => {
    try {
        const user_id = req.user?.id;
        const params = req.params;

        if (!user_id) throw createError("Unauthorized", 401);
        const success = await new CategoryService().deleteCategory(params, user_id);
        return res.status(200).send({
            success,
            message: "Category removed"
        });
    } catch (error) {
        next(error);
    }
}