const potrace = require("potrace");
const fs = require("fs");
const path = require("path");
const jimp = require("jimp");
/**
 * @param {string} fileName
 */
const traceFrame = (fileName) => {
    let fName = fileName.slice(fileName.lastIndexOf("/") + 1, fileName.length);
    fName = fName.slice(0, fName.lastIndexOf("."));
    potrace.trace(`./in/${fileName}`, (err, svg) => {
        if (err) throw err;
        fs.writeFileSync(`${process.cwd()}/out/${fName}.svg`, svg);
    });
};

/**
 * @param {string} inDir
 */
const traceFrames = (inDir = process.cwd() + "/in/") => {
    const frames = fs
        .readdirSync(path.resolve(process.cwd(), inDir))
        .filter(
            (file) =>
                file.endsWith(".png") ||
                file.endsWith(".jpg") ||
                file.endsWith(".jpeg")
        );
    frames.forEach((frame) => {
        jimp.read(`${process.cwd()}/in/${frame}`, (err, data) => {
            if (err) throw err;
            data.contrast(1).write(`${process.cwd()}/in/${frame}`);
        });
        traceFrame(frame);
    });
};

traceFrames();

module.exports = { traceFrames };
