import { LoginProps } from "../../models/user";
import { GetUserService } from "../user/GetUserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import validateEmail from "../../util/emailValidate";

class LoginService{
    async handle({ email, password }: LoginProps) {
        if (!email || !password){
            throw new Error("Please, fill in all fields");
        }

        const isEmailValid = validateEmail(email);

        if (!isEmailValid){
            throw new Error("Insert a valid email");
        }

        const userExists = new GetUserService();
        const user = await userExists.handle(email);

        if (!user || Array.isArray(user)){
            throw new Error("User doesn't exist");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const jwt_key = process.env.JWT_KEY

        if (!jwt_key){
            throw new Error("JWT key not found");
        }
        
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
        },
        jwt_key,
        {
            expiresIn: "1d",
        });


        return {user, token};
    }
}

export {LoginService};
