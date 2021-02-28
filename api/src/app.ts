import express, {Application, Request, Response}  from "express";

const app: express.Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
});

app.listen(5000, () => console.log("Server running"));