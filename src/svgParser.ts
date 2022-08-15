import cheerio from "cheerio";

export interface Curve {
    command: string
    arguments: number[]
    width: number;
    height: number;
}

/**
 * Reads an SVG file and returns a series of bezier curves with color
 * @param {string} filePath Path of the SVG file to parse
 */
export function parseSVG(text: string): Curve[] {
    const svg = cheerio.load(text);
    const width = parseFloat(svg("svg").attr("width") || "1000");
    const height = parseFloat(svg("svg").attr("height") || "1000");
    const d = svg("svg").children().first().attr("d");

    if (!d) return [];

    // actual code
    const segments = d.split(" ");
    const commands = ["M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z"];
    let [currCmd] = segments; // first thing is always a command
    let currArgs = [];
    const argsList = [];
    let firstTime = true;
    
    for (const segment of segments) {
        if (commands.includes(segment)) {
            if (!firstTime) {
                const curve: Curve = {command: currCmd, arguments: currArgs, width: width, height: height};
                argsList.push(curve);
            }
            currCmd = segment;
            firstTime = false;
            currArgs = [];
        } else {
            const val = parseFloat(segment);
            if (currArgs.length % 2 == 1) {
                currArgs.push(height - val);
            } else currArgs.push(val);
        }
    }

    return argsList;
}