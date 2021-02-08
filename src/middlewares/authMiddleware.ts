import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { jwt } from "../helpers/tokens/jwt";
import { User } from "../models/User";

export const checkAuth = async (request: Request, response: Response, next: NextFunction) => {

    var token = request.header("Authorization");

    if (!token) 
    {
        return response.status(401).json({
            success: false,
            content: "User not authenticated"
        });
    }

    var tokenData;

    try {
        tokenData = jwt.decode(token);
    } catch (e) {
        return response.json({
            success: false,
            content: e.message
        });
    }

    var userId = tokenData['user_id'];

    var user = await getRepository(User).findOne(userId);

    if (user.id != userId)
    {
        return response.status(401).json({
            success: false,
            content: "Please login again"
        });
    }

    next();

}