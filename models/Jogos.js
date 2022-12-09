//config inicial
const mongoose = require("mongoose");

//config unidades para mongodb
const Jogos = mongoose.model("Jogos", {
  team1: { type: String },
  team2: { type: String },
  score: { type: String },
  date:  { type: Date },
  time: { type: String },
  campeonato: {type: String },
});

module.exports = Jogos;