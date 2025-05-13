import { Request, Response } from "express";
import { GetUserService } from "../../services/user/GetUserService";

class GetUserController{
    async handle(req: Request, res: Response){
        const {email} = req.params;

        const userService = new GetUserService();

        try{
            const result = await userService.handle(email);

            if (!result && email){
                return res.status(404).send({
                    error: "User not found",
                })
            }

            return res.status(200).send(result);
        } catch(error){
            return res.status(500).send({
                error: "An unexpected error occured",
            })
        }
    }
}

export {GetUserController};
