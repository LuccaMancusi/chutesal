const router = require("express").Router();
const { restart } = require("nodemon");
const Jogadores = require("../models/Jogadores");

// criação de unidades
router.post("/dados", async (req, res) => {
  const Jogador = await new Jogadores({
    number: req.body.number,
    name: req.body.name,
    nickname: req.body.nickname,
    birthday: req.body.birthday,
    campeonato: req.body.campeonato,
  });
  Jogador.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send(
        "<script>alert('Inscrição realizada com sucesso!'); window.location.href = '/'; </script>"
      );
    }
  });
});

router.get("/dados", async (req, res) => {
  try {
    const data = await Jogadores.find(
      {},
      "number name nickname birthday campeonato"
    );
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar os dados! " });
  }
});

router.delete("/dados/:id", (req, res) => {
  Jogadores.findByIdAndDelete(req.params.id)
    .then((jogadores) => {
      if (!jogadores) {
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
