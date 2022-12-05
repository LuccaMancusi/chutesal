const router = require("express").Router();
const { restart } = require("nodemon");
const Campeonatos = require("../models/Campeonatos");

// criação de unidades
router.post("/register", async (req, res) => {
  const Campeonato = await new Campeonatos({
    name: req.body.txtName,
    inscricao: req.body.inscricao,
    divulgacao: req.body.divulgacao,
    status: req.body.statusList,
  });
  Campeonato.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campeonatos");
    }
  });
});

router.get("/dados", async (req, res) => {
  try {
    const data = await Campeonatos.find({}, "name inscricao divulgacao status");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar os dados! " });
  }
});

router.delete("/dados/:id", (req, res) => {
  Campeonatos.findByIdAndDelete(req.params.id)
    .then((campeonatos) => {
      if (!campeonatos) {
        return res.status(404).send();
      } else {
        return rest.status(200).send();
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
