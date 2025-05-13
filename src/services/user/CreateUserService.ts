import prisma from "../../database";
import { UserProps } from "../../models/user";
import validateEmail from "../../util/emailValidate";
import { GetUserService } from "./GetUserService";
import bcrypt from 'bcrypt';

class CreateUserService {
    async handle({name, email, password}: UserProps){
        if (!name || !email || !password){
            throw new Error("Please, fill in all fields");
        }

        const isEmailValid = validateEmail(email);

        if (!isEmailValid){
            throw new Error("Insert a valid email");
        }

        const userExists = new GetUserService();

        if (await userExists.handle(email)){
            throw new Error("User already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        })
        
        return user;
    }
}

export {CreateUserService};
