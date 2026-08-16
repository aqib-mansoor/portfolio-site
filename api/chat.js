export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }

  const models = ['gemini-flash-latest', 'gemini-3.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

  for (const model of models) {
    try {
      const systemInstruction = `You are Aqib Mansoor's virtual assistant. Aqib is a Full-Stack developer based in Rawalpindi, Pakistan. 
His tech stack includes React, React Native, Node.js (Express), PHP (Laravel), MySQL, TypeScript, TailwindCSS.
Key projects: 
- Nexus Crypto Hub (Real-time crypto tracker with GSAP/CoinGecko)
- FoodieExpress (Multi-vendor delivery system with Customer, Vendor, Rider and Admin applications)
- Apply Daddy (Automated job tracker)
- Bannu Gul BP (Restaurant system)
His email is aqibmansoor40@gmail.com. Phone/WhatsApp is +92 318 5952411.
LinkedIn: https://www.linkedin.com/in/aqib248
GitHub: https://github.com/aqib-mansoor
He is open to full-time work, remote contracts, and freelance projects.
Keep your answers professional, friendly, and concise. Short answers are preferred.`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemInstruction },
                { text: `User message: ${message}` }
              ]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return res.status(200).json({ reply });
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        console.warn(`Gemini Model ${model} failed, trying next:`, errData);
      }
    } catch (err) {
      console.error(`Gemini API Error with model ${model}:`, err);
    }
  }

  return res.status(502).json({ error: 'All Gemini models failed to generate content.' });
}
