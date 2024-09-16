import { describe, it, expect } from "@jest/globals"
import { InMemoryTaskRepository } from "../src/repository/InMemoryTaskRepository"
import { title } from "process";

describe("InMemoryTaskRepository", () => {
    describe("New repository", () => {
        let repository: InMemoryTaskRepository;

        beforeEach(() => {
            repository = new InMemoryTaskRepository();
        });

        it("Should be empty when created", async () => {
            const res = await repository.findAll();
            expect(res.length).toBe(0);
        });
    
        
        it("Should contain the task when creating a new task", async () => {
            const data = { title: "title", content: "content" };
            
            const res = await repository.create(data);
            
            expect(res.title).toBe(data.title)
            expect(res.content).toBe(data.content)
            expect(res.id).toBeDefined()
        });
    
        it("Should return null when finding an id that doesn't exit", async () => {
            const res = await repository.findById("this id doesn't exist !");
    
            expect(res).toBeNull();
        });
    
        it("Should return null when updating an id that doesn't exit", async () => {
            const res = await repository.update("this id doesn't exist !", {});
    
            expect(res).toBeNull();
        });
    
        it("Should return false when deleting an id that doesn't exist", async () => {
            const res = await repository.deleteById("this id doesn't exist !");
    
            expect(res).toBeFalsy();
        });
    });

    describe("Repository with data", () => {
        let repository: InMemoryTaskRepository;

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

            repository = new InMemoryTaskRepository(data);
        });

        it("Should return all tasks when using findAll", async () => {
            const res = await repository.findAll();

            expect(res.length).toBe(2);
            expect(res[0].id).toBe("1");
            expect(res[0].title).toBe("title of 1");
            expect(res[0].content).toBe("content of 1");
            expect(res[0].completedAt).toBe("date of 1");
            expect(res[1].id).toBe("2");
            expect(res[1].title).toBe("title of 2");
            expect(res[1].content).toBe("content of 2");
        });

        it("Should return task with id 1 when using findById('1')", async () => {
            const res = await repository.findById("1");

            expect(res).toBeDefined();
            expect(res?.id).toBe("1");
            expect(res?.title).toBe("title of 1");
            expect(res?.content).toBe("content of 1");
        });

        it("Should return null when using findById with an id that doesn't exist", async () => {
            const res = await repository.findById("I wish I existed");

            expect(res).toBeNull();
        });

        it("Should return new task when creating a new task", async () => {
            const data = {
                title: "new title",
                content: "new content"
            }

            const res = await repository.create(data);
            
            expect(res.id).toBeDefined();
            expect(res.title).toBe(data.title);
            expect(res.content).toBe(data.content);
        })

        it("Should update the task when updating a task present in the data", async () => {
            const id = "1";
            const data = {
                title: "updated title",
                content: "updated content"
            }

            const res = await repository.update(id, data);

            expect(res?.id).toBe(id);
            expect(res?.title).toBe(data.title);
            expect(res?.content).toBe(data.content);
        })

        it("Should update the task when updating partially (title) the task present in data", async () => {
            const id = "1";
            const data = {
                title: "updated title"
            }
            const before_content = "content of 1";

            const res = await repository.update(id, data);

            expect(res?.id).toBe(id);
            expect(res?.title).toBe(data.title);
            expect(res?.content).toBe(before_content);
        });

        it("Should update the task when updating partially (content) the task present in data", async () => {
            const id = "1";
            const data = {
                content: "updated content"
            }
            const before_title = "title of 1";

            const res = await repository.update(id, data);

            expect(res?.id).toBe(id);
            expect(res?.title).toBe(before_title);
            expect(res?.content).toBe(data.content);
        });

        it("Should delete a task when deleting a task present in the data", async () => {
            const id = "1";

            const res = await repository.deleteById(id);

            expect(res).toBeTruthy();

            expect((await repository.findAll()).length).toBe(1);
        });

        it("Should delete the right task when deleting a task present in the data", async () => {
            const id = "1";

            await repository.deleteById(id);

            const res = await repository.findAll();

            expect(res.length).toBe(1);
            expect(res[0].id).toBe("2");
        });
    });
});