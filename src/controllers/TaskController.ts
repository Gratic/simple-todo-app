import express, { Request, Response, Router } from "express";
import { Task } from "../models/Tasks";

const router: Router = express.Router()

let tasks: Array<Task> = [
    Task.Create_Task("Menage", "Faire le menage"),
    Task.Create_Task("Vaisselle", "Faire la vaisselle")
]

router.get("/", (req: Request, res: Response) => {
    res.json(Object.values(tasks));
})

router.get("/:id", (req: Request<{id: number}>, res: Response) => {
    res.json(tasks.find((task) => task.id == req.params.id));
})

router.post("/", (req: Request, res: Response) => {
    let title: string = req.body.title;
    let content: string = req.body.content;

    const newTask = Task.Create_Task(title, content);
    tasks.push(newTask);

    res.json(newTask);
});

router.put("/:id", (req: Request<{id: number}>, res: Response) => {
    let taskToUpdate = tasks.find((task) => task.id == req.params.id);

    if (!taskToUpdate)
    {
        res.status(404);
        res.json({"error": `Task with id=${req.params.id} not found.`});
    }
    else {
        let title: string = req.body.title;
        let content: string = req.body.content;

        if(title && title != taskToUpdate.title)
            taskToUpdate.title = title;

        if (content && content != taskToUpdate.content)
            taskToUpdate.content = content;

        res.json(taskToUpdate);
    }
});

router.delete("/:id", (req: Request<{id: number}>, res: Response) => {
    tasks = tasks.filter((task) => task.id != req.params.id);

    res.sendStatus(200);
});

export default router;