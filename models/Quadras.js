//config inicial
const mongoose = require("mongoose");

//config quadras para mongodb
const Quadras = mongoose.model("Quadras", {
  nameQuadra: { type: String },
  nameUnidade: { type: String },
});

module.exports = Quadras;
