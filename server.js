const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const POWER_AUTOMATE_URL = 'https://defaultc1b8a097d827417ab3a223aaa1af9f.51.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1f03e99f84fb4d7ea939cfd634191cb9/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TY5swpdW9gNnJFuKbdktGwZMu11PPIE3OTol3NH8EbY';

app.post('/calcul', async (req, res) => {
  try {
    const response = await fetch(POWER_AUTOMATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Proxy démarré sur port ' + PORT));