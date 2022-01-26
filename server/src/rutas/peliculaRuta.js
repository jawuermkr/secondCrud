const express = require("express");
const router = express.Router();

const peliculaControl = require("../controladores/peliculaControl");

router.post("/insert", peliculaControl.create);
router.get("/get", peliculaControl.search);
router.put("/put/:id", peliculaControl.editar);
router.delete("/delete/:id", peliculaControl.eliminar);

module.exports = router;
