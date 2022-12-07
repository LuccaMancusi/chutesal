//config inicial
const mongoose = require("mongoose");

//config unidades para mongodb
const Campeonatos = mongoose.model("Campeonatos", {
  name: { type: String },
  unidade: { type: String },
  inscricao: { type: Date },
  divulgacao: { type: Date },
  status: { type: String },
});

module.exports = Campeonatos;
