import express, { Express, Request, Response, Router} from "express";

export default function(TaskRoute:Router) {
    const app: Express = express();
    app.get("/", (req: Request, res: Response) => {
        res.send("Express + TypeScript + nodemon");
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/v1/tasks', TaskRoute);
    return app;
}

