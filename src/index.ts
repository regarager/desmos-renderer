import express from "express";
import { traceFrames } from "./traceFrames";
import { file } from "./util";

const server = express();
const port = process.env.PORT || 8080;

server.get("/graphs", async (_, res) => {
    res.send(await traceFrames());
});
server.get("/", (_, res) => {
    res.sendFile(file("./public/index.html"));
});

server.listen(port, () => {
    console.log("Server started");
});