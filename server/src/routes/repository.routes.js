import express from "express";
import path from "path";
import { getRepositorySnapshot } from "../services/repository.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const repositoryPath = req.query.path;

    if (!repositoryPath) {
      return res.status(400).json({
        success: false,
        error: "Repository path is required.",
      });
    }

    const absolutePath = path.resolve(repositoryPath);

    const repository = await getRepositorySnapshot(absolutePath);

    return res.status(200).json({
      success: true,
      data: repository,
    });
  } catch (error) {
    console.error("Repository route error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze repository.",
    });
  }
});

export default router;