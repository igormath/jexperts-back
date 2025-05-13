import { Request, Response } from "express";
import { LoginService } from "../../services/login/LoginService";
import { LoginProps } from "../../models/user";

class LoginController{
    async handle(req: Request, res: Response){
        const {email, password} = req.body as LoginProps;

        const loginService = new LoginService();

        try{
            const {user, token} = await loginService.handle({ email, password });
            
            return res.status(201).send({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                token,
            });

        }catch(error: any){
            if (error.message === "Please, fill in all fields"){
                return res.status(400).send({
                    error: error.message,
                })
            } else if (error.message === "User doesn't exist"){
                return res.status(404).send({
                    error: error.message,
                })
            } else if (error.message === "Invalid credentials"){
                return res.status(401).send({
                    error: error.message,
                })
            } else if (error.message === "Insert a valid email"){
                return res.status(400).send({
                    error: error.message,
                })
            }

            return res.status(500).send({
                error: "An unexpected error occured",
            })

        }
    }
}

export {LoginController};
