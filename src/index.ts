import app from "./app";

const port = 3000;

app.listen(port, () => {
    console.log(`[Server] Listening server is running at http://localhost:${port}`);
});

export function for_test() {
    return 1;
}

