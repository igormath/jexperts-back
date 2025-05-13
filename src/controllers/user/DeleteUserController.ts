import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController{
    async handle(req: Request, res: Response){
        const {email} = req.params;

        const userService = new DeleteUserService();

        try{
            const user = await userService.handle(email);

            if (!user){
                return res.status(404).send({
                    error: "User not found",
                })
            }

            return res.status(200).send(user);

        }catch(error: any){
            if (error.message === "Please, fill in all fields"){
                return res.status(400).send({
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

export {DeleteUserController}
