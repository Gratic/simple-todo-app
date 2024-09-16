import makeApp from "./app";
import taskRoute from "./controllers/TaskController";
import { InMemoryTaskRepository } from "./repository/InMemoryTaskRepository";
import cors from "cors";

var corsOptions = {
    // origin: 'http://example.com',
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const TaskRoute = taskRoute(new InMemoryTaskRepository())
const app = makeApp(TaskRoute, cors(corsOptions))
const port = 3000;

// Or, to be more specific:
// app.use(cors({
//   origin: 'http://localhost:3000' // Replace with your frontend's URL
// }));

app.listen(port, () => {
    console.log(`[Server] Listening server is running at http://localhost:${port}`);
});

