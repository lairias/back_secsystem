const { Router } = require("express");
const express = require("express");
const router = express.Router();

const ValesCrl = require("../controllers/ValesCtrl");

router.get("/", ValesCrl.obternerVale);
router.get("/:cod", ValesCrl.obternerValeCod);
router.post("/", ValesCrl.agregarVale);
router.put("/:cod", ValesCrl.actualizarVale);
router.delete("/:cod", ValesCrl.eliminarVale);
router.get("/monto_vale/:cod", ValesCrl.obtenerValesEmpleado);

module.exports = router;
