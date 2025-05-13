import { Request, Response } from "express";
import { DeleteTaskService } from "../../services/task/DeleteTaskService";

class DeleteTaskController{
    async handle(req: Request, res: Response){
        const {email, id} = req.params;

        const taskService = new DeleteTaskService;

        try {
            const task = await taskService.handle(email, Number(id));

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

export {DeleteTaskController};
