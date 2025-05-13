import prisma from "../../database";
import validateEmail from "../../util/emailValidate";

class DeleteUserService{
    async handle(email: string){
        if (!email){
            throw new Error("Please, fill in all fields");
        }

        const isEmailValid = validateEmail(email);

        if (!isEmailValid){
            throw new Error("Insert a valid email");
        }

        const deletePosts = prisma.task.deleteMany({
            where: {
              authorEmail: email,
            },
        });
          
        const deleteUser = prisma.user.delete({
        where: {
            email: email,
            },
        });
          
        const transaction = await prisma.$transaction([deletePosts, deleteUser]);

        return transaction;
    }
}

export {DeleteUserService};
