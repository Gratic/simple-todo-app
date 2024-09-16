import express, { Request, Response, Router } from "express";
import { Task } from "../models/Task";
import { Repository } from "../repository/Repository";
import { z } from "zod";

const CreationTaskSchema = z.object({
    title: z.string(),
    content: z.string(),
    completedAt: z.string().optional()
})

const UpdateTaskSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    completedAt: z.string().optional()
})

export default function(TaskRepository: Repository<Task>) {
    const router: Router = express.Router()

    router.get("/", async (req: Request, res: Response) => {
        const tasks = await TaskRepository.findAll();
        res.json(Object.values(tasks));
    })

    router.get("/:id", async (req: Request<{id: string}>, res: Response) => {
        const task = await TaskRepository.findById(req.params.id);
        
        if(task) {
            res.json(task);
            return;
        }

        res.status(404).json({"message": `Task with ID=${req.params.id} not found.`})
    })

    router.post("/", async (req: Request, res: Response) => {
        const validatedBody = CreationTaskSchema.safeParse(req.body);

        if (!validatedBody.success)
        {
            res.status(400).json({
                error: validatedBody.error.flatten().fieldErrors,
                message: "Missing field."
            });
            return;
        }

        const data: Omit<Task, "id"> = validatedBody.data;

        const task = await TaskRepository.create(data)
        res.status(201).json(task);
    });

    router.put("/:id", async (req: Request<{id: string}>, res: Response) => {
        const validatedBody = UpdateTaskSchema.safeParse(req.body);

        if (!validatedBody.success)
        {
            res.status(400).json({ 
                error: validatedBody.error.flatten().fieldErrors,
                message: "Missing fields."
            });
            return;
        }

        const data: Partial<Task> = validatedBody.data;

        if (data.completedAt === "")
            data.completedAt = undefined;

        const task = await TaskRepository.update(req.params.id, data);

        if (task)
        {
            res.json(task);
            return;
        }
        
        res.status(404).json({"message": `Task with ID=${req.params.id} not found.`});
    });

    router.delete("/:id", async (req: Request<{id: string}>, res: Response) => {
        if(await TaskRepository.deleteById(req.params.id))
        {
            res.sendStatus(204);
            return;
        }

        res.status(404).json({"message": `Task with ID=${req.params.id} not found.`});
    });

    return router;
}