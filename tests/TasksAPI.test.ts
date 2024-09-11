import { describe, expect, it, jest } from "@jest/globals";
import { Response } from "supertest";
import request from "supertest";
import makeApp from "../src/app";
import { Express, Router } from "express";
import { InMemoryTaskRepository } from "../src/repository/InMemoryTaskRepository";
import taskRouter from "../src/controllers/TaskController";

describe("Tasks v1 REST API", () => {

    let app: Express;
    let route: Router;

    beforeAll(() => {
        route = taskRouter(new InMemoryTaskRepository());
        app = makeApp(route);
    })

    it("List of Tasks on / with GET", async () => {
        const res: Response = await request(app)
        .get("/v1/tasks/")
        .send();

        expect(res.statusCode == 200).toBeTruthy();
        expect(res.type == "application/json").toBeTruthy();
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});