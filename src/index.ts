import express, { Express, Request, Response} from "express";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript + nodemon");
});

app.listen(port, () => {
    console.log(`[Server] Listening server is running at http://localhost:${port}`);
});

export function for_test() {
    return 1;
}