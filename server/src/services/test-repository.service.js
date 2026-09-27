import { analyzeRepository } from "./repository.service.js";

const result = await analyzeRepository(".");

console.log(JSON.stringify(result, null, 2));