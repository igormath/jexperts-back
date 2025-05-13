import jwt, {JwtPayload} from "jsonwebtoken";
import "dotenv/config";
import { GetUserService } from "../services/user/GetUserService";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({
            error: "Login required"
        });
    }

    const [, token] = authorization.split(" ");
    const userService = new GetUserService();
    const jwt_key = process.env.JWT_KEY;


    if (jwt_key){
        try {
            const decoded = jwt.verify(token, jwt_key) as JwtPayload;
            const email = decoded.email as string;

             if (!email){
                return res.status(401).send({
                    error: "Invalid token payload"
                })
             }
    
            const user = await userService.handle(email)
    
            if (!user || Array.isArray(user)) {
                return res.status(401).send({
                    error: "Invalid User",
                });
            }
    
            return next();
        } catch (error) {
            return res.status(401).send({
                error: "Invalid or Expired Token",
            });
        }
    } else{
        return res.status(401).send({
            error: "Authentication error"
        });
    }
};
