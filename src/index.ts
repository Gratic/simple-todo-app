import makeApp from "./app";
import taskRoute from "./controllers/TaskController";
import { InMemoryTaskRepository } from "./repository/InMemoryTaskRepository";

const TaskRoute = taskRoute(new InMemoryTaskRepository())
const app = makeApp(TaskRoute)

const port = 3000;

app.listen(port, () => {
    console.log(`[Server] Listening server is running at http://localhost:${port}`);
});

