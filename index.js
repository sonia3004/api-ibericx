require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

process.env.DEBUG = 'express:*';

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB Atlas'))
  .catch(err => {
    console.error('Erreur de connexion à MongoDB', err.message);
    process.exit(1); // Arrêter l'application en cas d'échec de la connexion à MongoDB
  });

// Exemple de route
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API');
});

// Gestion des routes non trouvées
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs internes du serveur
app.use((err, req, res, next) => {
  console.error('Erreur interne du serveur:', err);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
