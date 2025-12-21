import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { calculator, inputs, results } = req.body;

    if (!calculator || !inputs || !results) {
      return res.status(400).json({ error: "Missing data" });
    }

    const prompt = `
You are an experienced mechanical and structural engineer.

Explain the following calculation in simple but professional engineering language.

Calculator type: ${calculator}

Inputs:
${JSON.stringify(inputs, null, 2)}

Results:
${JSON.stringify(results, null, 2)}

Explain:
1. What these results mean
2. Why this formula is used
3. Engineering interpretation
4. Safety or design insight
5. Practical application
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const explanation = response.choices[0].message.content;

    res.status(200).json({ explanation });
  } catch (err: any) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI explanation failed" });
  }
}
