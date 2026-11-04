import "dotenv/config";
import app from "./App";

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`Zhantila API is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

server.on("error", (error) => {
  console.error("Failed to start the server:", error);
  process.exit(1);
});