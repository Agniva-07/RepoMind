import express from "express";
import healthRouter from "./routes/health.routes.js";
import repositoryRouter from "./routes/repository.routes.js";

const app = express();

app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/repository", repositoryRouter);

export default app;