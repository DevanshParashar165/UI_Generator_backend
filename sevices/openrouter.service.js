import { OpenRouter } from "@openrouter/sdk";

export const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.CLIENT_URL, // your frontend url
    "X-Title": "AI UI Generator",
  },
});

export const askAI = async (prompt, model = "deepseek/deepseek-chat") => {
  const completion = await openRouter.chat.send({
    model,
    messages: [
      {
        role: "user",
        content: "Act as a UI generator for my prompt : "+prompt,
      },
    ],
    stream: false,
  });

  return completion.choices[0].message.content;
};
