import express from "express";
import path from "path";
import yargs from "yargs/yargs";

const server = express();
const port = process.env.PORT || 8080;
const argv = yargs(process.argv.slice(2)).options({
    dir: { type: "string", demandOption: true },
}).parseSync();

if (!argv.dir.startsWith("/")) argv.dir = path.join(path.join(__dirname, "../"), argv.dir);

server.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

server.listen(port, () => {
    console.log("Server started");
    console.log(`Input directory: ${argv.dir}`);
});