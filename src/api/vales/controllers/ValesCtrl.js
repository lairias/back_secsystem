const { validationResult } = require("express-validator");
const mysqlConnection = require("../../../config/db");

//const express = require('express-validator');

// CRUD Methods
//Get all Employees

exports.obtenerValesEmpleado = async (req, res, next) => {
  const { cod } = req.params;
  const query =
    "SELECT  SUM(`vales`) as vales FROM tbl_vales_empleados WHERE cod_empleado = ?;";

  try {
    const result = await mysqlConnection.query(query, [cod]);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obternerVale = async (req, res, next) => {
  const query = "CALL SHOW_VALES;";

  try {
    const result = await mysqlConnection.query(query);
    console.log(result);
    return res.json(result["0"]);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obternerValeCod = async (req, res, next) => {
  const { cod } = req.params;
  const query = "CALL SHOW_VALES_COD(?)";

  try {
    const result = await mysqlConnection.query(query, [cod]);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.agregarVale = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { cod_empleado, vales, fecha_vale, usr_registro } = req.body;

  const query = `CALL INSERT_VALES(?, ?, ?,?);`;

  try {
    await mysqlConnection.query(query, [
      cod_empleado,vales,
      fecha_vale,
      usr_registro,
    ]);
    return res.json({ Status: "Vale Agregado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarVale = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { vales, fecha_vale, usr_registro } = req.body;

  const { cod } = req.params;

  const query = "CALL UPDATE_VALES(?,?,?,?);";

  try {
    const result = await mysqlConnection.query(query, [
      cod,
      vales,
      fecha_vale,
      usr_registro,
    ]);
    return res.json({ Status: "Vale Actualizada" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarVale = async (req, res, next) => {
  const { usr_registro } = req.body;
  const { cod } = req.params;
  const query = "CALL DELETE_VALES(?,?);";

  try {
    const result = await mysqlConnection.query(query, [cod, usr_registro]);
    return res.json({ Status: "Vale Eliminada" });
  } catch (error) {
    console.log(error);
    next();
  }
};
