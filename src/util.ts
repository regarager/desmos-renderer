import path from "path";

export function file(p: string) {
    return path.join(process.cwd(), p);
}