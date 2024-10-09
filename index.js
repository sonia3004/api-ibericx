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

// Route GET pour récupérer tous les produits
app.get('/produits', async (req, res) => {
  try {
    const produits = await Produit.find(); // Récupère tous les produits dans la base de données
    res.status(200).json(produits); // Renvoie les produits en tant que réponse
  } catch (err) {
    console.error('Erreur lors de la récupération des produits:', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route POST pour ajouter un nouveau produit
app.post('/produits', async (req, res) => {
  try {
    const nouveauProduit = new Produit(req.body); // Crée un nouveau produit à partir des données envoyées dans le corps de la requête
    await nouveauProduit.save(); // Sauvegarde le nouveau produit dans la base de données
    res.status(201).json(nouveauProduit); // Renvoie le produit ajouté avec un code de statut 201 (créé)
  } catch (err) {
    console.error('Erreur lors de l\'ajout du produit:', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route PUT pour mettre à jour un produit existant
app.put('/produits/:id', async (req, res) => {
  try {
    const produitMisAJour = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!produitMisAJour) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json(produitMisAJour);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du produit:', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route DELETE pour supprimer un produit existant
app.delete('/produits/:id', async (req, res) => {
  try {
    const produitSupprime = await Produit.findByIdAndDelete(req.params.id);
    if (!produitSupprime) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression du produit:', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Exemple de route GET pour la page d'accueil
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
