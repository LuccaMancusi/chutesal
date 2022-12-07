const router = require("express").Router();
const { restart } = require("nodemon");
const Unidades = require("../models/Unidades");
const Quadras = require("../models/Quadras");

// criação de unidades
router.post("/dados", async (req, res) => {
  const Unidade = await new Unidades({
    name: req.body.txtName,
    address: req.body.txtAddress,
    cep: req.body.txtCep,
  });
  Unidade.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/unidades");
    }
  });
});

router.get("/dados", async (req, res) => {
  try {
    const data = await Unidades.find({}, "name address cep");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao carregar os dados! " });
  }
});

router.get("/dados/:id", async (req, res) => {
  try {
    const data = await Unidades.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.put("/dados/:id", async (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let address = req.body.address;
  let cep = req.body.cep;
  const quadras = await Quadras.find({});
  const objModificado = await Unidades.findById(id);

  let update = { name, address, cep };

  Unidades.findByIdAndUpdate(id, update)
    .then(res.status(200).send())
    .catch((err) => {
      res.send(err);
    });
  for (var quadra of quadras) {
    if (quadra.nameUnidade == objModificado.name) {
      await Quadras.findOneAndUpdate(
        { nameUnidade: objModificado.name },
        { nameUnidade: name }
      );
    }
  }
});

router.delete("/dados/:id", async (req, res) => {
  const quadras = await Quadras.find({});
  const deleteQuadras = async function (nome) {
    await Quadras.deleteMany({ nameUnidade: nome });
  };
  Unidades.findByIdAndDelete(req.params.id)
    .then((unidades) => {
      if (!unidades) {
        return res.status(404).send();
      } else {
        for (var quadra of quadras) {
          if (quadra.nameUnidade == unidades.name) {
            deleteQuadras(quadra.nameUnidade);
            break;
          }
        }
        return res.status(200).send();
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
