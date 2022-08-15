import path from "path";

export function file(p: string) {
    return path.join(process.cwd(), p);
}

export const inDir = file("./renders/input/");
export const outDir = file("./renders/output");