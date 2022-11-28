const router = require("express").Router();
const { restart } = require("nodemon");
const Unidades = require("../models/Unidades");

// criação de unidades
router.post("/register", async (req, res) => {
  const Unidade = await new Unidades({
    name: req.body.txtName,
    address: req.body.txtAddress,
    quadras: req.body.txtQuadras,
  });
  Unidade.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});

router.get("/dados", async (req, res) => {
  try {
    const data = await Unidades.find({}, "name address quadras");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar os dados! " });
  }
});

router.delete("/dados/:id", (req, res) => {
  Unidades.findByIdAndDelete(req.params.id)
    .then((unidades) => {
      if (!unidades) {
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
