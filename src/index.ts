import express from "express";
import yargs from "yargs/yargs";

const server = express();
const port = process.env.PORT || 8080;
const argv = yargs(process.argv.slice(2)).options({
    dir: { type: "string", demandOption: true },
}).parseSync();

server.listen(port, () => {
    console.log("Server started");
});