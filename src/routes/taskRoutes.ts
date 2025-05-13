import { Router, Request, Response } from "express";
import { GetTaskController } from "../controllers/task/GetTaskController";
import { CreateTaskController } from "../controllers/task/CreateTaskController";
import { DeleteTaskController } from "../controllers/task/DeleteTaskController";
import { PutTaskController } from "../controllers/task/PutTaskController";
import auth from "../middleware/auth";

const router = Router();

router.get('/task/:email',auth, async (req: Request, res: Response) => {
    return new GetTaskController().handle(req, res);
})

router.post('/task', auth, async (req: Request, res: Response) => {
    return new CreateTaskController().handle(req, res);
})

router.delete('/task/:email/:id', auth, async (req: Request, res: Response) => {
    return new DeleteTaskController().handle(req, res);
})

router.put('/task/:email', auth, async (req: Request, res: Response) => {
    return new PutTaskController().handle(req, res);
})

export default router;
