import { Curve } from "./svgParser";

const endPart = "\\left\\{0\\le t\\le1\\right\\}"; // the part where its like 0<= stuff

/**
 *
 * @param {string[]} segments
 * @returns {string[]} Segements as bezier curve equations
 */
export function toEquations(curves: Curve[]) {
    // currently working
    const equations: string[] = [];
    let currPoint = [0, 0]; // for commands like M (moveto) also needed for cubic curve start coord i think
    let startPoint = currPoint;
    let setStartPoint = false;

    curves.forEach(curve => {
        const command = curve.command;
        const points = curve.arguments;

        switch (command) {
        case "M":
            currPoint[0] = points[0];
            currPoint[1] = points[1];
            if (!setStartPoint) {
                setStartPoint = true;
                startPoint = currPoint;
            }
            break;
        case "L":
            if (points.length < 4) {
                equations.push(toLinear([...currPoint, ...points]));
            } else {
                equations.push(toLinear(points));
            }
            break;
        case "C":
            equations.push(toCubic([...currPoint, ...points]));
            currPoint[0] = points[points.length - 2];
            currPoint[1] = points[points.length - 1];
            break;
            // quadratic curve
        case "Q":
            equations.push(toQuadratic([...currPoint, ...points]));
            currPoint[0] = points[points.length - 2];
            currPoint[1] = points[points.length - 1];
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
function toLinear(points: number[]) {
    // currently working
    const [x0, y0, x1, y1] = points;
    const xCoord = `(1-t)${x0}+t${x1}`;
    const yCoord = `(1-t)${y0}+t${y1}`;
    return `(${xCoord},${yCoord})${endPart}`;
}

/**
 * @returns {string} Formats the coordinate
 */
function formatQuadraticCoordinate(p0: number, p1: number, p2: number) {
    return `${p1}+(1-t^2)(${p0}-${p1})+(t^2)(${p2}-${p1})`;
}

/**
 *
 * @param {number[][]} points
 * @returns {string} Points formatted in quadratic curve
 */
function toQuadratic(points: number[]) {
    const [x0, y0, x1, y1, x2, y2] = points;
    const xCoord = formatQuadraticCoordinate(x0, x1, x2);
    const yCoord = formatQuadraticCoordinate(y0, y1, y2);
    return `(${xCoord},${yCoord})${endPart}`;
}
/**
 * @returns {string} Formats the coordinates in a cubic bezier curve
 */
function formatCubicCoordinate(p0: number, p1: number, p2: number, p3: number) {
    return `(1-t)((1-t)((1-t)${p0}+t${p1})+t((1-t)${p1}+t${p2}))+t((1-t)((1-t)${p1}+t${p2})+t((1-t)${p2}+t${p3}))`; // lower everything later
}
/**
 * @param {points} points Start points, control points, end point
 * @returns {string} Points formatted in cubic curve
 */
function toCubic(points: number[]) {
    // currently working
    const [x0, y0, x1, y1, x2, y2, x3, y3] = points;
    const xCoord = formatCubicCoordinate(x0, x1, x2, x3);
    const yCoord = formatCubicCoordinate(y0, y1, y2, y3);
    return `(${xCoord},${yCoord})${endPart}`;
}