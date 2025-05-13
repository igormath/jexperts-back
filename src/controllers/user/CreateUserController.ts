import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";
import { UserProps } from "../../models/user";

class CreateUserController{
    async handle(req: Request, res: Response){

        const {email, name, password} = req.body as UserProps;

        const userService = new CreateUserService();

        try{
            const user = await userService.handle({email, name, password});
            
            return res.status(201).send(user);

        }catch(error: any){
            if (error.message === "User already exists"){
                return res.status(400).send({
                    error: error.message,
                })
            } else if (error.message === "Please, fill in all fields"){
                return res.status(400).send({
                    error: error.message,
                })
            } else if (error.message === "bcrypt error"){
                return res.status(500).send({
                    error: "Internal library error"
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

export {CreateUserController};
