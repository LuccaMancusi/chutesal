const router = require("express").Router();
const { restart } = require("nodemon");
const Times = require("../models/Times");

// criação de unidades
router.post("/dados", async (req, res) => {
  const Time = await new Times({
    name: req.body.name,
    campeonato: req.body.campeonato,
  });
  Time.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/times");
    }
  });
});

router.get("/dados", async (req, res) => {
  try {
    const data = await Times.find({}, "name campeonato");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar os dados! " });
  }
});

router.get("/dados/:id", async (req, res) => {
  try {
    const data = await Times.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/dados/:id", async (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let campeonato = req.body.campeonato;

  let update = { name, campeonato };

  Times.findByIdAndUpdate(id, update)
    .then(res.status(200).send())
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/dados/:id", (req, res) => {
  Times.findByIdAndDelete(req.params.id)
    .then((times) => {
      if (!times) {
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
