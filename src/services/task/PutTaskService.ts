import prisma from "../../database";
import { TaskProps } from "../../models/task";
import validateEmail from "../../util/emailValidate";
import { GetUserService } from "../user/GetUserService";

class PutTaskService{
    async handle(description: string, done: boolean, authorEmail: string, id: number, title: string){
        if (description == null || done == null || authorEmail == null || id == null || title == null){
            throw new Error("Please, fill in all fields");
        }

        const isEmailValid = validateEmail(authorEmail);

        if (!isEmailValid){
            throw new Error("Insert a valid email");
        }

        const userService = new GetUserService();
        const user = await userService.handle(authorEmail);

        if (!user){
            throw new Error("User not found");
        }

        const task = await prisma.task.findUnique({
            where: {
                id: id,
                authorEmail: authorEmail,
            },
        });

        if (!task){
            throw new Error("Task not found");
        }

        const updatedTask = await prisma.task.update({
            where: {
              id: id,
            },
            data: {
              description: description,
              done: done,
              title: title,
            },
        })

        return updatedTask;
    }
}

export {PutTaskService}
