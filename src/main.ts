import Express from "express";
import cors from "cors";
import user from "./routes/userRoutes";
import task from "./routes/taskRoutes";
import login from "./routes/loginRoutes";

const app = Express();

const allowedOrigins = ['http://localhost:5173']
const options: cors.CorsOptions = {
    origin: allowedOrigins,
}
app.use(cors(options));

app.use(Express.json());

app.use(user);
app.use(task);
app.use(login);

export { app };
