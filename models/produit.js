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
  category: { type: String, required: true }, // Ajout du champ category
  size: {
    36: { type: Boolean, default: false },
    37: { type: Boolean, default: false },
    38: { type: Boolean, default: false },
    39: { type: Boolean, default: false },
    40: { type: Boolean, default: false },
    41: { type: Boolean, default: false },
    42: { type: Boolean, default: false },
    43: { type: Boolean, default: false },
    44: { type: Boolean, default: false },
    45: { type: Boolean, default: false },
    46: { type: Boolean, default: false },
  },
});

// Ajout d'une méthode pour inclure les tailles uniquement si le produit est une chaussure
produitSchema.pre('save', function (next) {
  if (this.category !== 'chaussures') {
    this.size = undefined; // Supprime les tailles si ce n'est pas une chaussure
  }
  next();
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
