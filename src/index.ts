import makeApp from "./app";

const app = makeApp()

const port = 3000;

app.listen(port, () => {
    console.log(`[Server] Listening server is running at http://localhost:${port}`);
});

