import prisma from "../../database";
import validateEmail from "../../util/emailValidate";
import { GetUserService } from "../user/GetUserService";
class DeleteTaskService{
    async handle(email: string, id: number){
        if (!email){
            throw new Error("Please, fill in all fields");
        }
        
        const isEmailValid = validateEmail(email);

        if (!isEmailValid){
            throw new Error("Insert a valid email");
        }

        const userService = new GetUserService();
        const user = await userService.handle(email);

        if (!user){
            throw new Error("User not found");
        }

        const task = await prisma.task.findUnique({
            where: {
                id: id,
                authorEmail: email,
            },
        });

        if (!task){
            throw new Error("Task not found");
        }

        const deletedTask = await prisma.task.delete({
            where: {
                id: id,
            },
        });

        return deletedTask;
    }
}

export {DeleteTaskService};
