import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeWaterQuality } from "./gemini.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.post("/analyze", async (req, res) => {
    try {
        const waterData = req.body.data;
    
        if (!Array.isArray(waterData) || waterData.length === 0) {
          return res.status(400).json({ error: "Invalid water data provided." });
        }
    
        const analysis = await analyzeWaterQuality(waterData);
    
        if (!analysis) {
          return res.status(500).json({ error: "No analysis was generated." });
        }
    
        res.json({ success: true, analysis });
      } catch (error) {
        console.error("❌ Analysis error:", error);
        res.status(500).json({ error: "Failed to analyze water quality." });
      }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
