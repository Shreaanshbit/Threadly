import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { seedAdminIfNeeded } from "./utils/seedAdmin.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();
await seedAdminIfNeeded();

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Threadly backend is running" });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));