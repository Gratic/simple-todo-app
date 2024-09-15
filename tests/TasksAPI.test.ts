import { describe, expect, it, jest } from "@jest/globals";
import { Response } from "supertest";
import request from "supertest";
import makeApp from "../src/app";
import { Express, Router } from "express";
import { InMemoryTaskRepository } from "../src/repository/InMemoryTaskRepository";
import taskRouter from "../src/controllers/TaskController";

describe("Tasks v1 REST API", () => {

    describe("No data", () => {
        let app: Express;
        let route: Router;

        beforeEach(() => {
            route = taskRouter(new InMemoryTaskRepository());
            app = makeApp(route);
        })

        it("Should return empty array when requesting / with GET", async () => {
            const res: Response = await request(app)
            .get("/v1/tasks/")
            .send();

            expect(res.statusCode == 200).toBeTruthy();
            expect(res.type == "application/json").toBeTruthy();
            expect(Array.isArray(res.body)).toBeTruthy();
        });

        it("Should return error when requesting /:id with GET", async () => {
            const res = await request(app)
            .get("/v1/tasks/1")
            .send();

            expect(res.status).toBe(404);
            expect(res.body.message).toBe("Task with ID=1 not found.")
        });

        it("Should return error when requesting /:id with PUT and data", async () => {
            const res = await request(app)
            .put("/v1/tasks/1")
            .send({
                title: "title",
                content: "content"
            })

            expect(res.status).toBe(404);
            expect(res.body.message).toBe("Task with ID=1 not found.")
        });

        it("Should return false when requesting /:id with DELETE", async () => {
            const res = await request(app)
            .delete("/v1/tasks/1")
            .send();

            expect(res.status).toBe(404);
            expect(res.body.message).toBe("Task with ID=1 not found.")
        });

        it("Should return new task when creating a new task", async () => {
            const res = await request(app)
            .post("/v1/tasks")
            .send({
                title: "title",
                content: "content"
            });
            expect(res.body.id).toBeDefined();
            expect(res.body.title).toBe("title");
            expect(res.body.content).toBe("content");
            expect(res.body.completedAt).toBeUndefined();
        });

        it("Should return an error when creating a task with a not string data title", async () => {
            const res = await request(app)
            .post("/v1/tasks")
            .send({
                title: 0,
                content: "content"
            });

            expect(res.status).toBe(400);
        });

        it("Should return an error when creating a task with a not string data content", async () => {
            const res = await request(app)
            .post("/v1/tasks")
            .send({
                title: "title",
                content: 0
            });

            expect(res.status).toBe(400);
        });
    });

    describe("With data", () => {
        let app: Express;
        let route: Router;

        beforeEach(() => {
            const data = [
                {
                    id: "1",
                    title: "title of 1",
                    content: "content of 1",
                    completedAt: "date of 1",
                },
                {
                    id: "2",
                    title: "title of 2",
                    content: "content of 2"
                }
            ]

            route = taskRouter(new InMemoryTaskRepository(data));
            app = makeApp(route);
        })

        it("Should return all tasks when using / with GET", async () => {
            const res = await request(app)
            .get("/v1/tasks")
            .send();

            expect(res.body.length).toBe(2);
        });

        it("Should return task with id 1 when using /1 with GET", async () => {
            const res = await request(app)
            .get("/v1/tasks/1")
            .send();

            expect(res.body.id).toBe("1");
            expect(res.body.title).toBe("title of 1");
            expect(res.body.content).toBe("content of 1");
            expect(res.body.completedAt).toBe("date of 1");
        })

        it("Should return and modify task with id 1 when using /1 with PUT and data", async () => {
           const res = await request(app)
           .put("/v1/tasks/1")
           .send({
                title: "updated title",
                content: "updated content"
           });

           expect(res.body.id).toBe("1");
           expect(res.body.title).toBe("updated title");
           expect(res.body.content).toBe("updated content");
        });

        it("Should return and modify task with id 2 when using /2 with PUT and data", async () => {            
            const res = await request(app)
            .put("/v1/tasks/2")
            .send({
                 title: "updated title",
                 content: "updated content",
                 completedAt: "date of 2",
            });
 
            expect(res.body.id).toBe("2");
            expect(res.body.title).toBe("updated title");
            expect(res.body.content).toBe("updated content");
            expect(res.body.completedAt).toBe("date of 2");
         });

        it("Should return an error when modifying a task with a not string data title", async () => {
            const res = await request(app)
            .put("/v1/tasks/1")
            .send({
                title: 0,
                content: "content"
            });

            expect(res.status).toBe(400);
        });

        it("Should return an error when modifying a task with a not string data content", async () => {
            const res = await request(app)
            .put("/v1/tasks/1")
            .send({
                title: "title",
                content: 0
            });

            expect(res.status).toBe(400);
        });

        it("Should return 204 when using /1 with DELETE", async () => {
            const res = await request(app)
            .delete("/v1/tasks/1")
            .send();

            expect(res.status).toBe(204);
        });

        it("Should delete the right task when using /1 with DELETE", async () => {
            await request(app)
            .delete("/v1/tasks/1")
            .send();

            const res = await request(app)
            .get("/v1/tasks/1")
            .send();

            expect(res.status).toBe(404);
        });
    });
});