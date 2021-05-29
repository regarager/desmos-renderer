const fs = require("fs");
const path = require("path");

const inDir = path.resolve(process.cwd(), "./in/");
const outDir = path.resolve(process.cwd(), "./out/");
const resultDir = path.resolve(process.cwd(), "./result/");

if (fs.existsSync(inDir)) {
    fs.rmSync(inDir, { recursive: true, force: true });
}
fs.mkdirSync(inDir);
console.log("Cleared " + inDir);

if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);
console.log("Cleared " + outDir);

if (fs.existsSync(resultDir)) {
    fs.rmSync(resultDir, { recursive: true, force: true });
}
fs.mkdirSync(resultDir);
console.log("Cleared " + resultDir);
