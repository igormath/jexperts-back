import prisma from "../../database";
import { TaskProps } from "../../models/task";
import { GetUserService } from "../user/GetUserService";
import validateEmail from "../../util/emailValidate";

class CreateTaskService{
    async handle({description, done, authorEmail, title}: TaskProps){
        if (description == null || done == null || authorEmail == null || title == null){
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

        const task = await prisma.task.create({
            data: {
                description: description,
                done: done,
                authorEmail: authorEmail,
                title: title,
            }
        })

        return task;
    }
}

export {CreateTaskService};
