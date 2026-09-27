import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Project Brain API is running",
  });
});

export default router;