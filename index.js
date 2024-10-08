require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connecté à MongoDB Atlas'))
.catch(err => console.error('Erreur de connexion à MongoDB', err));

// Exemple de route
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
