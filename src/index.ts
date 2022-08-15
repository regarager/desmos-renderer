import express from "express";
import { toEquations } from "./curves";
import { Curve } from "./svgParser";
import { traceFrames } from "./traceFrames";
import { file } from "./util";

const server = express();
const port = process.env.PORT || 8080;

server.get("/graphs", async (_, res) => {
    res.send(JSON.stringify((await traceFrames()).map((curves: Curve[]) => toEquations(curves))));
});

server.get("/", (_, res) => {
    res.sendFile(file("./public/index.html"));
});

server.listen(port, () => {
    console.log("Server started");
});