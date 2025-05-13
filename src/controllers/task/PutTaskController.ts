import { Request, Response } from "express";
import { TaskProps } from "../../models/task";
import { PutTaskService } from "../../services/task/PutTaskService";

class PutTaskController{
    async handle(req: Request, res: Response){
        const {email} = req.params;
        const {id, description, done, title} = req.body;

        const taskService = new PutTaskService();

        try {
            const task = await taskService.handle(description, done, email, Number(id), title);

            return res.status(200).send(task);
        } catch (error: any) {
            if (error.message === "Insert a valid email"){
                return res.status(400).send({
                    error: error.message,
                })
            } else if (error.message === "User not found"){
                return res.status(404).send({
                    error: error.message,
                })
            } else if (error.message === "Task not found"){
                return res.status(404).send({
                    error: error.message,
                })
            } else if (error.message === "Please, fill in all fields"){
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

export {PutTaskController}
