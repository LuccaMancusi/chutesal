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

// rota para campeonatos
const campeonatosRoutes = require("./routes/campeonatosRoutes");
app.use("/campeonatos", campeonatosRoutes);

const jogadoresRoutes = require("./routes/jogadoresRoutes");
app.use("/jogadores", jogadoresRoutes);

// rota inicial / endpoint
app.get("/unidades", function (req, res) {
  res.sendFile(__dirname + "/public/unidades.html");
});
app.get("/jogadores", function (req, res) {
  res.sendFile(__dirname + "/public/jogadoress.html");
});
app.get("/campeonatos", function (req, res) {
  res.sendFile(__dirname + "/public/campeonatos.html");
});
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
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
