const potrace = require("potrace");
const fs = require("fs");
const path = require("path");
const gm = require("gm").subClass({ imageMagick: true });

/**
 * @param {string} fileName
 */
const traceFrame = (fileName) => {
    let fName = fileName.slice(fileName.lastIndexOf("/") + 1, fileName.length);
    fName = fName.slice(0, fName.lastIndexOf("."));
    potrace.trace(`./in/${fileName}`, (err, svg) => {
        if (err) throw err;
        fs.writeFileSync(`${process.cwd()}/out/${fName}.svg`, svg);
        console.log(`Traced frame at in/${fileName}`);
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
        const framePath = `${process.cwd()}/in/${frame}`;
        gm(framePath)
            .edge(1)
            .write(framePath, () => {});
        traceFrame(frame);
    });
};

traceFrames();

module.exports = { traceFrames };
