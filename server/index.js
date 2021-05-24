const express = require("express");
const { setHeight, toSegments, toEquations } = require("./toBezier");
const cheerio = require("cheerio");
const fs = require("fs");
const { resolve } = require("path");
const app = express();

app.use(express.json());

const frameNames = fs
    .readdirSync(resolve(process.cwd(), "./out/"))
    .filter((file) => file.endsWith(".svg"));

const dList = frameNames.map((frameName) => {
    const data = fs.readFileSync("./out/" + frameName, "utf-8");
    const $ = cheerio.load(data);
    setHeight(parseFloat($("svg").attr("width")));
    return $("svg").children("path").attr("d");
});

const everything = dList.map((d) => toEquations(toSegments(d)));
let lastRequest = 0;

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html");
});

app.get("/frame/:fId", (req, res) => {
    const frame = parseInt(req.params.fId);
    res.send(everything[frame]);
    console.log(`Request for frame ${frame}`);
    const d = new Date().getTime();
    if (lastRequest !== 0) {
        console.log(`Took ${d - lastRequest}ms`);
    }
    lastRequest = d;
});

app.post("/result/:fId", (req, res) => {
    const imgData = req.body.data.replace(/^data:image\/\w+;base64,/, "");
    const frameName = `${process.cwd()}/result/frame${req.params.fId}.png`;
    fs.writeFile(frameName, imgData, { encoding: "base64" }, (err) => {
        if (err) throw err;
        console.log(`Saved frame at ${frameName}`);
    });
    res.send({});
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Server started");
});
