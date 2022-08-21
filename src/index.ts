import express from "express";
import { writeFileSync } from "fs";
import { toEquations } from "./curves";
import { Curve } from "./svgParser";
import { traceFrames } from "./traceFrames";
import { file } from "./util";

const server = express();
const port = process.env.PORT || 8080;

let width: number;
let height: number;
let equations: string[][];

// middleware
server.use(express.json({limit: "50mb"}));
server.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

server.post("/screenshot", (req, res) => {
    const {data, frame} = req.body;
    const img = data.replace(/^data:image\/\w+;base64,/, "");

    const fileName = file(`/renders/output/frame${frame}.png`);
    writeFileSync(fileName, img, {encoding: "base64"});
    console.log("Wrote image to " + fileName);
    res.send("Success!");
});

server.get("/data", (_, res) => {
    res.send(JSON.stringify({width: width, height: height, count: equations.length}));
});

server.get("/frames/:frame", (req, res) => {
    const frame = parseInt(req.params.frame);
    res.send(equations[frame]);
    console.log(`Request for frame ${frame + 1}`);
});

server.get("/graphs", async (_, res) => {
    res.send(JSON.stringify(equations));
});

server.get("/", (_, res) => {
    res.sendFile(file("./public/index.html"));
});

server.get("/autostart", (_, res) => {
    res.sendFile(file("./public/autostart.html"));
});

server.listen(port, async () => {
    const leCurves = await traceFrames();
    const eqs = (leCurves).map((curves: Curve[]) => toEquations(curves));
    width = leCurves[0][0].width;
    height = leCurves[0][0].height;
    equations = eqs;

    console.log("Server started");
});