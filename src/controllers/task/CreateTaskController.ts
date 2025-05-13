import { Request, Response } from "express";
import { CreateTaskService } from "../../services/task/CreateTaskService";
import { TaskProps } from "../../models/task";

class CreateTaskController{
    async handle(req: Request, res: Response){
        const {description, done, authorEmail, title} = req.body as TaskProps;

        const taskService = new CreateTaskService();

        try{
            const task = await taskService.handle({description, done, authorEmail, title});

            return res.status(201).send(task);
        }catch(error: any){
            if (error.message === "Please, fill in all fields"){
                return res.status(400).send({
                    error: error.message,
                })
            } else if (error.message === "User not found"){
                return res.status(404).send({
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

export {CreateTaskController};
