const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'secret-key';
const users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json'));
const faults = JSON.parse(fs.readFileSync(__dirname + '/data/faults.json'));
const activeSessions = {}; // userId -> token

function authenticate(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ message: 'Sin token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    if (activeSessions[decoded.id] !== token) {
      return res.status(401).json({ message: 'Sesion invalida' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalido' });
  }
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Credenciales invalidas' });
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
  activeSessions[user.id] = token; // store token for unique session
  res.json({ token });
});

app.get('/faults', authenticate, (req, res) => {
  res.json(faults);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API escuchando en puerto', PORT));
