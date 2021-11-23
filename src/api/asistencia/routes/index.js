const { Router } = require("express");
const express = require("express");
const router = express.Router();

const asistenciasCtrl = require("../controllers/asistenciasCtrl");
router.get("/", asistenciasCtrl.obternerAsistencia);
router.get("/:cod", asistenciasCtrl.obternerAsistenciaCod);
router.post("/", asistenciasCtrl.agregarAsistencia);
router.put("/:cod", asistenciasCtrl.actualizarAsistencia);
router.delete("/:cod", asistenciasCtrl.eliminarAsistencia);

module.exports = router;
