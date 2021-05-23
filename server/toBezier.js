let endPart = "\\left\\{0\\le t\\le1\\right\\}"; // the part where its like 0<= stuff

/**
 *
 * @param {string[]} segments
 * @returns {string[]} Segements as bezier curve equations
 */
function toEquations(segments) {
    // currently working
    const equations = [];
    let currPoint = [0, 10]; // for commands like M (moveto) also needed for cubic curve start coord i think
    segments.forEach((segment) => {
        const tokens = segment.split(" "); // items like M (command), 5 (coordinate)
        const [cmd] = tokens; // first element is always command i think
        const points = parsePoints(segment.slice(2)); // ADD THE currPoint TO THE POINTS ARRAY WHEN PASSING AS ARG YOU CLOWN
        let endPoint = [0, 10];
        let startPoint = [0, 10];
        let setStartPoint = false;
        switch (cmd.toUpperCase()) {
            // move to
            case "M":
                [currPoint] = points;
                if (!setStartPoint) {
                    setStartPoint = true;
                    startPoint = currPoint;
                }
                break;
            // line
            case "L":
                equations.push(toLinear([currPoint, ...points]));
                currPoint = points[points.length - 1];
                break;
            // horizontal line
            case "H":
                endPoint = [...currPoint];
                endPoint[0] = parseFloat(tokens[1]);
                equations.push(toLinear([currPoint, endPoint]));
                currPoint = points[points.length - 1];
                break;
            // vertical line
            case "V":
                endPoint = [...currPoint];
                endPoint[1] = parseFloat(tokens[2]);
                equations.push(toLinear([currPoint, endPoint]));
                currPoint = points[points.length - 1];
                break;
            // cubic curve
            case "C":
                equations.push(toCubic([currPoint, ...points]));
                currPoint = points[points.length - 1];
                break;
            // quadratic curve
            case "Q":
                equations.push(toQuadratic([currPoint, ...points]));
                currPoint = points[points.length - 1];
                break;
            // go to start
            case "Z":
                currPoint = startPoint;
                break;
        }
    });
    return equations;
}

/**
 * @param {number[][]} points
 * @returns {string} Points formatted in linear curve
 */
function toLinear(points) {
    // currently working
    const [[x0, y0], [x1, y1]] = points;
    const xCoord = `(1-t)${x0}+t${x1}`;
    const yCoord = `(1-t)${y0}+t${y1}`;
    return `(${xCoord},${yCoord})${endPart}`;
}
/**
 *
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @returns {string} Formats the coordinate
 */
function formatQuadraticCoordinate(p0, p1, p2) {
    return `${p1}+(1-t^2)(${p0}-${p1})+(t^2)(${p2}-${p1})`;
}
/**
 *
 * @param {number[][]} points
 * @returns {string} Points formatted in quadratic curve
 */
function toQuadratic(points) {
    let [[x0, y0], [x1, y1], [x2, y2]] = points;
    let xCoord = formatQuadraticCoordinate(x0, x1, x2);
    let yCoord = formatQuadraticCoordinate(y0, y1, y2);
    return `(${xCoord},${yCoord})${endPart}`;
}
/**
 *
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @returns {string} Formats the coordinate
 */
function formatCubicCoordinate(p0, p1, p2, p3) {
    return `(1-t)((1-t)((1-t)${p0}+t${p1})+t((1-t)${p1}+t${p2}))+t((1-t)((1-t)${p1}+t${p2})+t((1-t)${p2}+t${p3}))`; // lower everything later
}
/**
 * @param {points} points Start points, control points, end point
 * @returns {string} Points formatted in cubic curve
 */
function toCubic(points) {
    // currently working
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = points;
    let xCoord = formatCubicCoordinate(x0, x1, x2, x3);
    let yCoord = formatCubicCoordinate(y0, y1, y2, y3);
    return `(${xCoord},${yCoord})${endPart}`;
}
/**
 * @param {string} str Points in the format x1 y1, x2 y2
 * @returns {number[][]} Input points converted to number[]
 */
function parsePoints(str) {
    // currently working
    const points = str
        .split(",")
        .map((point) => point.trim())
        .map((point, index) =>
            point
                .split(" ")
                .map((coord, index) => parseCoord(parseFloat(coord), index))
        );

    return points;
}

/**
 * @param {string} d d attribute of \<svg\>
 * @returns {string[]} A list of SVG commands
 */
function toSegments(d) {
    const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    const segments = [];
    let currCommand = "";
    const chars = d.split("").filter((char) => char !== "");
    chars.forEach((char, index) => {
        if (letters.includes(char.toUpperCase())) {
            if (currCommand.trim() !== "") segments.push(currCommand.trim());
            currCommand = "";
        }
        currCommand += char;
    });
    segments.push(currCommand);
    return segments;
}

/**
 * @param {number} coord Coordinate
 * @param {number} index 0 for x coord, 1 for y coord
 * @returns {number} Converted to make graph work i guess?
 */
function parseCoord(coord, index) {
    if (index === 0) return coord / 100;
    else return (1000 - coord) / 100;
}
module.exports = { toEquations, toSegments };
