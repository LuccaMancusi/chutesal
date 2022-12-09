const mongoose = require("mongoose");

const Times = mongoose.model("Times", {
  name: { type: String },
  campeonato: { type: String },
});

module.exports = Times;
