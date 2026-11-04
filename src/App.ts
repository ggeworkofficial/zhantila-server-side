import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public test route
app.get("/api/v1/public/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Zhantila API is running successfully.",
    data: {
      status: "healthy",
    },
  });
});

export default app;