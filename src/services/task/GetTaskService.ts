import prisma from "../../database";
import validateEmail from "../../util/emailValidate";

class GetTaskService{
    async handle(email: string){
        if (email){
            const isEmailValid = validateEmail(email);
            if (isEmailValid){
                const task = await prisma.task.findMany({
                    where: {
                        authorEmail: email,
                    },
                });
                
                return task;
            }
            throw new Error("Invalid email")
        }

        throw new Error("Email not specified")
    }
}

export {GetTaskService}
