import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import productRoutes from "../backend/routes/products.routes.js";
import cors from "cors";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const __dirname = path.resolve();
app.use(express.json()); // to accept json from req.body
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Running on http://localhost:${PORT}...`);
});
