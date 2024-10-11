const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
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
  category: { type: String, required: true },
  sizes: [{ type: String }],
  mostPopular: { type: Boolean, default: false }, // Ajout de Most Popular
  latest: { type: Boolean, default: false } // Ajout de Latest
});

// Middleware pour ajuster les tailles en fonction de la catégorie du produit
produitSchema.pre('save', function (next) {
  if (this.category === 'chaussures') {
    this.sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
  } else if (this.category === 'vêtements') {
    this.sizes = ['S', 'M', 'L', 'XL'];
  } else {
    this.sizes = [];
  }
  next();
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
