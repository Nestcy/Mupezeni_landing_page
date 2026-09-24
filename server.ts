import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  const getGenAI = () => {
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API endpoint for generating marketing ad image via Gemini
  app.post('/api/generate-ad-image', async (req, res) => {
    try {
      const { prompt, productTitle, description } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY is not configured on the server.',
          needsKey: true
        });
      }

      const ai = getGenAI();
      const imagePrompt = prompt || `High-end commercial advertisement product photography of ${productTitle || 'Sony WH-CH720N Wireless ANC Headphones'}: ${description || '35hr battery, noise cancelling, premium modern matte finish'}, on a minimalist retail podium with warm ambient studio lighting, vibrant aesthetic, 4k e-commerce photo.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: imagePrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      const imagePart = parts.find((p) => p.inlineData);

      if (imagePart && imagePart.inlineData?.data) {
        const mimeType = imagePart.inlineData.mimeType || 'image/png';
        const dataUrl = `data:${mimeType};base64,${imagePart.inlineData.data}`;
        return res.json({
          success: true,
          imageUrl: dataUrl,
          model: 'gemini-3.1-flash-lite-image',
          prompt: imagePrompt
        });
      } else {
        return res.status(500).json({ error: 'No image data returned from model.' });
      }
    } catch (err: any) {
      console.error('Error generating image via Gemini API:', err);
      const isQuotaError =
        err?.status === 'RESOURCE_EXHAUSTED' ||
        String(err?.message || '').includes('429') ||
        String(err?.message || '').includes('Quota exceeded');

      return res.status(err?.status === 429 || isQuotaError ? 429 : 500).json({
        error: err?.message || 'Failed to generate image',
        isQuotaError,
        details: err?.details || null
      });
    }
  });

  // Check key and server status
  app.get('/api/gemini-status', (req, res) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY);
    res.json({
      hasKey,
      model: 'gemini-3.1-flash-lite-image',
      status: 'ready'
    });
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
