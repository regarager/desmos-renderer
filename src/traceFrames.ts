import potrace from "potrace";
import { mkdir, readdirSync, lstatSync } from "fs";
import path from "path";
import { file, inDir } from "./util";
import { parseSVG } from "./svgParser";
import {promisify} from "util";



const trace: (arg1: string) => Promise<string> = promisify(potrace.trace);

function isFile(path: string) {
    return !lstatSync(path).isDirectory();
}
function getFiles() {
    try {
        return readdirSync(inDir).filter(path => isFile(file(`./renders/input/${path}`)));
    } catch (err) {
        console.error(err);
        console.log("Remaking /renders/input...");
        mkdir(inDir, (err) => console.error(err));
        return [];
    }
}

export async function traceFrames() {
    const frames = getFiles()
        .filter(
            (file) =>
                file.endsWith(".png") ||
                file.endsWith(".jpg") ||
                file.endsWith(".jpeg")
        ).map(p => path.join(inDir, p));
        
    const res = [];

    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const stuff = await trace(frame);
        res.push(parseSVG(stuff));
    }
    
    return res;
}