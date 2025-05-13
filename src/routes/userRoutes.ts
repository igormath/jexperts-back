import { Router, Request, Response } from "express";
import { CreateUserController } from "../controllers/user/CreateUserController";
import { GetUserController } from "../controllers/user/GetUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";
import { PutUserController } from "../controllers/user/PutUserController";
import auth from "../middleware/auth";

const router = Router();

router.get('/user', async (req: Request, res: Response) => {
    return new GetUserController().handle(req, res);
})

router.get('/user/:email', async (req: Request, res: Response) => {
    return new GetUserController().handle(req, res);
})

router.post('/user', async (req: Request, res: Response) => {
    return new CreateUserController().handle(req, res);
})

router.delete('/user/:email', auth, async (req: Request, res: Response) => {
    return new DeleteUserController().handle(req, res);
})

router.put('/user/:email', auth, async (req: Request, res: Response) => {
    return new PutUserController().handle(req, res);
})

export default router;
