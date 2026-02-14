import { askAI } from '../../sevices/openrouter.service.js';

export const generateUI = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required',
      });
    }
    const finalPrompt = `
You are an expert React UI generator.

Rules:
- Return ONLY React JSX code.
- Use Tailwind CSS.
- No explanations.
- No markdown.
- No imports.
- For react-live

User request: ${prompt}
`;

    const aiCode = await askAI(finalPrompt);

    return res.status(200).json({
      success: true,
      code: aiCode,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to generate UI',
    });
  }
};
