import prisma from "../../database";
import { UserProps } from "../../models/user";
import bcrypt from "bcrypt";
import validateEmail from "../../util/emailValidate";

class PutUserService{
    async handle({name, email, password}: UserProps){
        if (!name || !email || !password){
            throw new Error("Please, fill in all fields");
        }

        const isEmailValid = validateEmail(email);

        if (!isEmailValid){
            throw new Error("Insert a valid email");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              name: name,
              password: hashPassword,
            },
        })

        return user;
    }
}

export {PutUserService};
