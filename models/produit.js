const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  href: { type: String, required: true },
  colors: {
    black: { type: Boolean, default: false },
    white: { type: Boolean, default: false },
    red: { type: Boolean, default: false },
  },
  image: [{ type: String }],
  sold: { type: Number, default: 0 },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // Chaussures, vêtements ou accessoires
  sizes: [{ type: String }] // Un tableau pour les tailles, qui s'adapte à chaque catégorie
});

// Middleware pour ajuster les tailles en fonction de la catégorie du produit
produitSchema.pre('save', function (next) {
  if (this.category === 'chaussures') {
    this.sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
  } else if (this.category === 'vêtements') {
    this.sizes = ['S', 'M', 'L', 'XL'];
  } else {
    this.sizes = []; // Pas de tailles pour les accessoires
  }
  next();
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
