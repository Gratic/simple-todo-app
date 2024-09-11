import express, { Express, Request, Response} from "express";
import UserRoutes from "./controllers/TaskController";

export default function() {
    const app: Express = express();
    app.get("/", (req: Request, res: Response) => {
        res.send("Express + TypeScript + nodemon");
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/v1/tasks', UserRoutes);
    return app;
}

