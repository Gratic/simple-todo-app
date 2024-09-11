import express, { Request, Response, Router } from "express";
import { Task } from "../models/Task";
import { Repository } from "../repository/Repository";

export default function(TaskRepository: Repository<Task>) {
    const router: Router = express.Router()

    router.get("/", async (req: Request, res: Response) => {
        const tasks = await TaskRepository.findAll();
        res.json(Object.values(tasks));
    })

    router.get("/:id", async (req: Request<{id: string}>, res: Response) => {
        const task = await TaskRepository.findById(req.params.id);
        
        if(task) res.json(task);

        res.status(404).json({"message": `Task with ID=${req.params.id} not found.`})
    })

    router.post("/", async (req: Request, res: Response) => {
        const data: Omit<Task, "id"> = {
            "title": req.body.title,
            "content": req.body.content,
        };

        const task = await TaskRepository.create(data)
        res.status(201).json(task);
    });

    router.put("/:id", async (req: Request<{id: string}>, res: Response) => {
        const data: Partial<Task> = {
            "title": req.body.title,
            "content": req.body.content,
        };

        const task = await TaskRepository.update(req.params.id, data);

        if (task)
        {
            res.json(task);
        }
        
        res.status(404).json({"message": `Task with ID=${req.params.id} not found.`});
    });

    router.delete("/:id", async (req: Request<{id: string}>, res: Response) => {
        if(await TaskRepository.deleteById(req.params.id))
        {
            res.sendStatus(204);
        }

        res.status(404).json({"message": `Task with ID=${req.params.id} not found.`});
    });

    return router;
}