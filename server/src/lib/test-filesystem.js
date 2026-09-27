import { scanDirectory } from "./filesystem.js";

const result = await scanDirectory(".");

console.log(result);