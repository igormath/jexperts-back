import { Router, Request, Response } from "express";
import { LoginController } from "../controllers/login/LoginController";

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    return new LoginController().handle(req, res);
})

export default router;
