import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { jwt } from "../helpers/tokens/jwt";
import * as md5 from "md5";
import validate from "../helpers/validators/userValidate";

interface values<T> {
    email?: string;
    username: string;
    password: string;
}

export const user = {
    async create (request: Request, response: Response) {

        var credentials: values<object> = request.body;

        var values = {
            email: credentials.email.toLowerCase(),
            username: credentials.username.toLowerCase(),
            password: credentials.password
        }

        var validated = await validate(values);

        if (validated.error)
        {
            return response.status(401).json({
                success: false,
                content: validated.content
            });
        }

        values.password = md5(values.password);

        var saved = await getRepository(User).save(values);

        if (!saved.id)
        {
            return response.json({
                success: false,
                content: "An error was ocurred while creating user"
            });
        } 

        return response.json({
            success: true,
            content: "User created successful"
        });
    },

    async auth(request: Request, response: Response) {

        var credentials: values<object> = request.body;

        var values = {
            username: credentials.username.toLowerCase(),
            password: md5(credentials.password)
        }

        var user = await getRepository(User).find({
            where: {
                username: values.username,
                password: values.password
            }
        });

        if (user.length == 0)
        {
            return response.json({
                success: false,
                content: 'Incorrect credentials'
            });
        }

        return response.json({
            success: true,
            content: jwt.generate({
                user_id: user[0]['id']
            })
        });
    }
}
