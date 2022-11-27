//config inicial
const mongoose = require("mongoose");

//config unidades para mongodb
const Unidades = mongoose.model("Unidades", {
  key: { type: String },
  name: { type: String },
  address: { type: String },
  quadras: { type: Number },
});

module.exports = Unidades;
