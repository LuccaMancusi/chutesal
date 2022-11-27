const router = require("express").Router();
const Unidades = require("../models/Unidades");

// criação de unidades
router.post("/register", async (req, res) => {
  const Unidade = await new Unidades({
    id: generateID(),
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
    const data = await Unidades.find({}, "name address quadras -_id");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar os dados! " });
  }
});

function generateID() {
  return Math.random().toString(36).substring(2, 9);
}

module.exports = router;
