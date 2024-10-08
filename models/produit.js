const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
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
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
