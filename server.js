const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const FILE = 'whitelist.json';
let whitelist = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : {};

app.get('/whitelist', (req, res) => res.json(whitelist));

app.post('/whitelist', (req, res) => {
  const { userId, expiresAt, key } = req.body;
  if (key !== 'MY_SECRET_KEY_123') return res.status(403).send('Forbidden');
  whitelist[userId] = expiresAt;
  fs.writeFileSync(FILE, JSON.stringify(whitelist, null, 2));
  res.send('Saved');
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
