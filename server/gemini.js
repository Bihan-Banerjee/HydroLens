import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function analyzeWaterQuality(data) {
  const latest = data[data.length - 1];

  const prompt = `
You are an expert environmental chemist and water quality analyst.

You will receive water quality data including pH, turbidity, and hardness over time. Analyze this data in a detailed and structured format.

DO NOT use casual phrases like “Let’s take a look”. Be precise and scientific.

Key points to cover:

1. **Potability Status**
   - Is the water potable (safe to drink)?
   - What specific factors contribute to this verdict?

2. **Cause Analysis**
   - Possible environmental or anthropogenic causes for irregular readings.
   - Detect trends or spikes in turbidity, pH, or hardness over time.

3. **Alternative Uses**
   - If the water is not potable, what applications (e.g., agriculture, industrial cooling, etc.) would it still be suited for?

4. **Recommendations**
   - What treatment processes would improve this water sample?
   - Cite relevant techniques (like reverse osmosis, activated carbon, etc.)

5. **Detailed Insights**
   - Mention safe ranges and how the current sample deviates from those.
   - Explain why certain ranges are considered dangerous or harmless.

Water Data:
${JSON.stringify(data, null, 2)}
  `;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  });

  return result.response.text();
}

