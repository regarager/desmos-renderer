const express = require("express");
const { traceFrames } = require("./traceFrame");
const { toSegments, toEquations } = require("./toBezier");
const cheerio = require("cheerio");
const fs = require("fs");
const { resolve } = require("path");
const app = express();

const frameNames = fs
    .readdirSync(resolve(process.cwd(), "./out/"))
    .filter((file) => file.endsWith(".svg"));

const dList = frameNames.map((frameName) => {
    const data = fs.readFileSync("./out/" + frameName, "utf-8");
    const $ = cheerio.load(data);
    return $("svg").children("path").attr("d");
});

const everything = dList.map((d) => toEquations(toSegments(d)));

let frame = 0;
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html");
});

app.get("/frame", (req, res) => {
    res.send(everything[frame]);
    frame++;
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Server started");
});
