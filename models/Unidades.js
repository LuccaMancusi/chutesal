//config inicial
const mongoose = require("mongoose");

//config unidades para mongodb
const Unidades = mongoose.model("Unidades", {
  name: { type: String },
  address: { type: String },
  cep: { type: Number },
});

module.exports = Unidades;
