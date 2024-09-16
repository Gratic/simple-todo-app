import { Task } from "../models/Task";
import { Repository } from "./Repository";
import { v7 as uuid } from "uuid";

export class InMemoryTaskRepository implements Repository<Task> {
    constructor(private tasks: Array<Task> = []) {}

    async findAll(): Promise<Task[]> {
        return this.tasks;
    }

    async findById(id: string): Promise<Task | null> {
        return this.tasks.find(task => task.id == id) ?? null;
    }

    async create(data: Omit<Task, "id">): Promise<Task> {
        const newTask: Task = Object.assign({ id: uuid() }, data) as Task;

        this.tasks.push(newTask);
        
        return newTask;
    }
    
    async update(id: string, data: Partial<Task>): Promise<Task | null> {
        let task = this.tasks.find(task => task.id == id);

        if (task)
        {
           return Object.assign(task, data) as Task;
        }

        return null;
    }

    async deleteById(id: string): Promise<boolean> {
        let taskIndex = this.tasks.findIndex(task => task.id == id);

        if (taskIndex === -1) return false;

        this.tasks = this.tasks.filter(task => task.id != id);
        return true;
    }
}