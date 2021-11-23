const { validationResult } = require("express-validator");
const mysqlConnection = require("../../../config/db");

//const express = require('express-validator');

// CRUD Methods
//Get all Employees

exports.obternerAsistencia = async (req, res, next) => {
  const query = "CALL SHOW_ASISTENCIA()";

  try {
    const result = await mysqlConnection.query(query);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obternerAsistenciaCod = async (req, res, next) => {
  const { cod } = req.params;
  const query = "CALL SHOW_ASISTENCIA_COD(?)";

  try {
    const result = await mysqlConnection.query(query, [cod]);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.agregarAsistencia = async (req, res, next) => {
  const {
    cod_empleado,
    asistencia,
    des_asistencia,
    hrs_asistidas,
    fec_asistencia,
    usr_registro,
  } = req.body;
  const query = "CALL INSERT_ASISTENCIA(?,?,?,?,?,?)";

  try {
    const result = await mysqlConnection.query(query, [
      cod_empleado,
      asistencia,
      des_asistencia,
      hrs_asistidas,
      fec_asistencia,
      usr_registro,
    ]);
    return res.json(result, { Status: "Asistencia Agregada" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarAsistencia = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    cod_empleado,
    asistencia,
    des_asistencia,
    hrs_asistidas,
    fec_asistencia,
    usr_registro,
  } = req.body;

  const { cod } = req.params;

  const query = "CALL UPDATE_ASISTENCIA(?,?,?,?,?);";

  try {
    const result = await mysqlConnection.query(query, [
      cod,
      asistencia,
      des_asistencia,
      hrs_asistidas,
      fec_asistencia,
      usr_registro,
    ]);
    return res.json({ Status: "Asistencia Actualizada" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarAsistencia = async (req, res, next) => {
  const { usr_registro } = req.body;
  const { cod } = req.params;
  const query = "CALL DELETE_ASISTENCIA(?,?);";

  try {
    const result = await mysqlConnection.query(query, [cod, usr_registro]);
    return res.json({ Status: "Asistencia- Eliminada" });
  } catch (error) {
    console.log(error);
    next();
  }
};
