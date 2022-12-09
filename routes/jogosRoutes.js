const router = require("express").Router();
const { restart } = require("nodemon");
const Jogos = require("../models/Jogos");

// criação de unidades
router.post("/dados", async (req, res) => {
  const Jogo = await new Jogos({
    team1: req.body.team1,
    team2: req.body.team2,
    score: req.body.score,
    date: req.body.date,
    time: req.body.time,
    campeonato: req.body.campeonato,
  });
  Jogo.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/jogos");
    }
  });
});

router.get("/dados", async (req, res) => {
  try {
    const data = await Jogos.find({}, "team1 team2 score date time campeonato");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar os dados! " });
  }
});

router.get("/dados/:id", async (req, res) => {
  try {
    const data = await Jogos.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// router.put("/dados/:id", async (req, res) => {
//   let id = req.params.id;
//   let name = req.body.name;
//   let unidade = req.body.unidade;

//   let update = { nameQuadra: name, nameUnidade: unidade };

//   Quadras.findByIdAndUpdate(id, update)
//     .then(res.status(200).send())
//     .catch((err) => {
//       res.send(err);
//     });
// });

router.delete("/dados/:id", (req, res) => {
  Jogos.findByIdAndDelete(req.params.id)
    .then((jogos) => {
      if (!jogos) {
        return res.status(404).send();
      } else {
        return res.status(200).send();
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;