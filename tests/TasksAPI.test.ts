import { describe, expect, it, jest } from "@jest/globals";
import { Response } from "supertest";
import request from "supertest";
import app from "../src/app";
import { Task } from "../src/models/Tasks";

describe("Tasks v1 REST API", () => {

    it("List of Tasks on / with GET", async () => {
        const res: Response = await request(app)
        .get("/v1/tasks/")
        .send();


        expect(res.statusCode == 200).toBeTruthy();
        expect(res.type == "application/json").toBeTruthy();
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});