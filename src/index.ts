import express from "express";
import { toEquations } from "./curves";
import { Curve } from "./svgParser";
import { traceFrames } from "./traceFrames";
import { file } from "./util";

const server = express();
const port = process.env.PORT || 8080;

server.get("/graphs", async (_, res) => {
    const leCurves = await traceFrames();
    const equations = (leCurves).map((curves: Curve[]) => toEquations(curves));
    const body = {
        width: leCurves[0][0].width,
        height: leCurves[0][0].height,
        equations: equations
    };
    res.send(JSON.stringify(body));
});

server.get("/", (_, res) => {
    res.sendFile(file("./public/index.html"));
});

server.listen(port, () => {
    console.log("Server started");
});