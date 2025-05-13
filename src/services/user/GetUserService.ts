import prisma from "../../database";

class GetUserService {
    async handle(email?: string){

        if (email){
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
    
            return user;
        }
        
        const users = await prisma.user.findMany();
        return users;
    }
}

export {GetUserService};
