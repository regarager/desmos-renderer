import express from "express";
import { writeFileSync } from "fs";
import { toEquations } from "./curves";
import { Curve } from "./svgParser";
import { traceFrames } from "./traceFrames";
import { file } from "./util";

const server = express();
const port = process.env.PORT || 8080;

// middleware
server.use(express.json({limit: "50mb"}));
server.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

server.post("/screenshot", (req, _) => {
    const {data, frame} = req.body;
    const img = data.replace(/^data:image\/\w+;base64,/, "");

    const fileName = file(`/renders/output/frame${frame}.png`);
    writeFileSync(fileName, img, {encoding: "base64"});
    console.log("Wrote image to " + fileName);
});

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