require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Produit = require('./models/produit'); // Import du modèle Produit
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

// Exemple de route GET
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API');
});

// Route POST pour créer un nouveau produit
app.post('/produits', async (req, res) => {
  try {
    const nouveauProduit = new Produit(req.body); // Crée un nouveau produit à partir des données envoyées
    await nouveauProduit.save(); // Sauvegarde le produit dans la base de données
    res.status(201).json({ message: 'Produit créé avec succès', data: nouveauProduit });
  } catch (err) {
    console.error('Erreur lors de la création du produit:', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
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
