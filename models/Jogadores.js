//config inicial
const mongoose = require("mongoose");

//config unidades para mongodb
const Jogadores = mongoose.model("Jogadores", {
  number: { type: Number },
  name: { type: String },
  nickname: { type: String },
  birthday: { type: Date },
  campeonato: { type: String },
});

module.exports = Jogadores;
