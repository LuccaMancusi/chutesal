const router = require("express").Router();
const { restart } = require("nodemon");
const Quadras = require("../models/Quadras");

// criação de unidades
router.post("/dados", async (req, res) => {
  const Quadra = await new Quadras({
    nameQuadra: req.body.txtName,
    nameUnidade: req.body.unidade,
  });
  Quadra.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/quadras");
    }
  });
});

router.get("/dados", async (req, res) => {
  try {
    const data = await Quadras.find({}, "nameQuadra nameUnidade");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar os dados! " });
  }
});

router.get("/dados/:id", async (req, res) => {
  try {
    const data = await Quadras.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/dados/:id", async (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let unidade = req.body.unidade;

  let update = { name, unidade };

  Quadras.findByIdAndUpdate(id, update)
    .then(res.status(200).send())
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/dados/:id", (req, res) => {
  Quadras.findByIdAndDelete(req.params.id)
    .then((quadras) => {
      if (!quadras) {
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
