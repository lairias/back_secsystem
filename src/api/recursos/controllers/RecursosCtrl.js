// Importing the packages required for the project.
const { validationResult } = require("express-validator");
const mysqlConnection = require("../../../config/db");

//const express = require('express-validator');

// CRUD Methods
//Get all Employees

exports.obternerRecurso = async (req, res, next) => {
  const query = "CALL SHOW_RECURSOS;";

  try {
    const recursos = await mysqlConnection.query(query);
    return res.json(recursos["0"]);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obternerRecursoPorCod = async (req, res, next) => {
  const { cod } = req.params;
  const query = "CALL SHOW_RECURSOS_COD(?)";

  try {
    const result = await mysqlConnection.query(query, [cod]);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.agregarRecurso = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { des_recurso, serie_recurso, almacen, usr_registro, cantidad } =
    req.body;

  const query = `CALL INSERT_RECURSO(?, ?, ?, ?,?);`;

  try {
    const result = await mysqlConnection.query(query, [
      des_recurso,
      serie_recurso,
      almacen,

      usr_registro,
      cantidad,
    ]);
    return res.json({ Status: "Recurso Agregado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.buscarRecurso = async (req, res, next) => {
  const { rtn } = req.params;
  const query = `SELECT * FROM  tbl_recursos   where  serie_recurso like  '%${rtn}%' and  estado = '1';`;
  try {
    const result = await mysqlConnection.query(query);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarRecurso = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    des_recurso,
    serie_recurso,
    almacen,
    usr_registro,
    cantidad,
    estado,
  } = req.body;

  const { cod } = req.params;

  const query = "CALL UPDATE_RECURSO(?, ?, ?, ?, ?,?);";

  try {
    const result = await mysqlConnection.query(query, [
      cod,
      des_recurso,
      serie_recurso,
      almacen,
      usr_registro,
      cantidad,
      estado,
    ]);
    return res.json({ Status: "Recurso Actualizado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.actualizarRecursoCantidad = async (req, res, next) => {
  const { cantidad } = req.body;

  const { cod } = req.params;

  const query = "CALL UPDATE_RECURSO_CANTIDAD_MENOS(?, ?);";

  try {
    const result = await mysqlConnection.query(query, [cod, cantidad]);
    return res.json({ Status: "Recurso Actualizado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.actualizarRecursoCantidad_mas = async (req, res, next) => {
  const { cantidad } = req.body;

  const { cod } = req.params;

  const query = "CALL UPDATE_RECURSO_CANTIDAD_MAS(?, ?);";

  try {
    const result = await mysqlConnection.query(query, [cod, cantidad]);
    return res.json({ Status: "Recurso Actualizado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarRecurso = async (req, res, next) => {
  const { usr_registro } = req.body;
  const { cod } = req.params;
  const query = "CALL DELETE_RECURSO(?, ?);";

  try {
    const result = await mysqlConnection.query(query, [cod, usr_registro]);
    return res.json({ Status: "Recurso Eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
