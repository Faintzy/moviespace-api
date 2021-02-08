import * as joi from "joi";
import { getRepository } from "typeorm";
import { User } from "../../models/User";

interface values<T> {
    email: string;
    username: string;
    password: string;
}

const userValidate = async (values: values<object>) => {

    var schema = joi.object({
        
        email: joi.string()
            .email(),

        username: joi.string()
            .alphanum()
            .min(4)
            .max(30)
            .required(),
        
        password: joi.string()
            .alphanum()
            .min(6)

    });

    var { error, value } = schema.validate(values); 

    if (error)
    {
        return {
            error: true,
            content: error.details[0].message
        }
    }

    var user = await getRepository(User).findOne({
        where: {
            username: values.username
        }
    });

    if (user.username == values.username)
    {
        return {
            error: true,
            content: "User already exists"
        }
    }

    if (user.email == values.email)
    {
        return {
            error: true,
            content: "Email already exists"
        }
    }

    return {
        error: false,
        content: "Validated with success!"
    }

}

export default userValidate;