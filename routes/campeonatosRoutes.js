const router = require("express").Router();
const { restart } = require("nodemon");
const Campeonatos = require("../models/Campeonatos");

// criação de unidades
router.post("/dados", async (req, res) => {
  const Campeonato = await new Campeonatos({
    name: req.body.txtName,
    unidade: req.body.unidadesList,
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
    const data = await Campeonatos.find(
      {},
      "name unidade inscricao divulgacao status"
    );
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar os dados! " });
  }
});

router.get("/dados/:id", async (req, res) => {
  try {
    const data = await Campeonatos.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/dados/:id", async (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let unidade = req.body.unidade;
  let inscricao = req.body.inscricao;
  let divulgacao = req.body.divulgacao;
  let status = req.body.status;

  let update = { id, name, unidade, inscricao, divulgacao, status };

  Campeonatos.findByIdAndUpdate(id, update)
    .then(res.status(200).send())
    .catch((err) => {
      res.send(err);
    });
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
