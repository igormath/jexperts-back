import { Request, Response } from "express";
import { GetTaskService } from "../../services/task/GetTaskService";

class GetTaskController{
    async handle(req: Request, res: Response){
        const {email} = req.params;

        const taskService = new GetTaskService();

        try{
            const result = await taskService.handle(email);

            return res.status(200).send(result);
        } catch(error: any){
            if (error.message === "Invalid email"){
                return res.status(400).send({
                    error: error.message,
                })
            } else if (error.message === "Email not specified"){
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

export {GetTaskController};
