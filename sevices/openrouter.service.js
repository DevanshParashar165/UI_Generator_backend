import OpenAI from "openai";

export const openRouter = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.CLIENT_URL,
    "X-Title": "AI UI Generator",
  },
});

export const askAI = async (prompt, model = "deepseek/deepseek-chat") => {
  try {
    const completion = await openRouter.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion?.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("OpenRouter Error:", error.message);
    throw new Error("AI request failed");
  }
};
