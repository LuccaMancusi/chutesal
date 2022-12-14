// config inicial
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// forma de ler JSON / middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// rotas da API
// rota para Usuários
const usersRoutes = require("./routes/usersRoutes");
app.use("/users", usersRoutes);

// rota para Unidades
const unidadesRoutes = require("./routes/unidadesRoutes");
app.use("/unidades", unidadesRoutes);

// rota para Quadras
const quadrasRoutes = require("./routes/quadrasRoutes");
app.use("/quadras", quadrasRoutes);

// rota para campeonatos
const campeonatosRoutes = require("./routes/campeonatosRoutes");
app.use("/campeonatos", campeonatosRoutes);

const jogadoresRoutes = require("./routes/jogadoresRoutes");
app.use("/jogadores", jogadoresRoutes);

const timesRoutes = require("./routes/timesRoutes");
app.use("/times", timesRoutes);
const jogosRoutes = require("./routes/jogosRoutes");
app.use("/jogos", jogosRoutes);

// rota inicial / endpoint
app.get("/unidades", function (req, res) {
  res.sendFile(__dirname + "/public/unidades.html");
});
app.get("/quadras", function (req, res) {
  res.sendFile(__dirname + "/public/quadras.html");
});
app.get("/jogadores", function (req, res) {
  res.sendFile(__dirname + "/public/jogadores.html");
});
app.get("/campeonatos", function (req, res) {
  res.sendFile(__dirname + "/public/campeonatos.html");
});
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/admin", function (req, res) {
  res.sendFile(__dirname + "/public/admin.html");
});
app.get("/cupManager", function (req, res) {
  res.sendFile(__dirname + "/public/cupManager.html");
});
app.get("/visitante", function (req, res) {
  res.sendFile(__dirname + "/public/visitante.html");
});
app.get("/consultarCampeonatos", function (req, res) {
  res.sendFile(__dirname + "/public/consultaCampeonatos.html");
});
app.get("/times", function (req, res) {
  res.sendFile(__dirname + "/public/times.html");
});
app.get("/jogos", function (req, res) {
  res.sendFile(__dirname + "/public/jogos.html");
});
app.get("/consultarJogos", function (req, res) {
  res.sendFile(__dirname + "/public/consultaJogos.html");
});
// conexão mongodb
const DB_USER = "mackenzista";
const DB_PASSWORD = encodeURIComponent("Mackenzie2022");

app.listen(3000);
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@chutesal.i9zh8lf.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => console.log(err));
