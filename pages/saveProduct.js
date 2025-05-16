// pages/api/saveProduct.js

export default async function handler(req, res) {
  const RAILWAY_API_URL = 'https://mtp-supply-api-production.up.railway.app/api/saveProduct';

  try {
    const response = await fetch(RAILWAY_API_URL, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed', detail: error.message });
  }
}
