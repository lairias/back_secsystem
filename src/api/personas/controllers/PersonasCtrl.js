// Importing the packages required for the project.
const { validationResult } = require("express-validator");
const mysqlConnection = require("../../../config/db");

//const express = require('express-validator');

// CRUD Methods
//Get all Employees

exports.obternerPersona = async (req, res, next) => {
  const query = "CALL SHOW_PERSONAS;";

  try {
    const personas = await mysqlConnection.query(query);
    console.log(personas);
    return res.json(personas["0"]);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obternerPersonaPorCod = async (req, res, next) => {
  const { cod } = req.params;
  const query = "CALL SHOW_PERSONAS_COD(?)";

  try {
    const result = await mysqlConnection.query(query, [cod]);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.buscarPersona = async (req, res, next) => {
  const { rtn } = req.params;
  const query = `SELECT tbl_personas.cod_persona,
 tbl_personas.primer_nom,
 tbl_personas.segundo_nom,
 tbl_personas.primer_apel,
 tbl_personas.sexo,
 tbl_personas.edad,
 tbl_personas.tipo_persona,
 tbl_personas.fec_nac_persona,
 tbl_personas.rtn_persona,
 tbl_direcciones.cod_direc,
 tbl_direcciones.des_direc,
 tbl_direcciones.municipio,
 tbl_direcciones.departamento,
 tbl_telefonos.cod_tel,
 tbl_telefonos.num_tel,
 tbl_telefonos.tipo_tel,
 tbl_personas.usr_registro,
 tbl_personas.fec_registro
 FROM tbl_personas
 INNER JOIN rel_personas_dir ON rel_personas_dir.cod_persona = tbl_personas.cod_persona
 INNER JOIN tbl_direcciones ON tbl_direcciones.cod_direc = rel_personas_dir.cod_direc
 INNER JOIN rel_personas_tel ON rel_personas_tel.cod_persona = tbl_personas.cod_persona
 INNER JOIN tbl_telefonos ON tbl_telefonos.cod_tel = rel_personas_tel.cod_tel  WHERE  rtn_persona like  '%${rtn}%'   ;`;
  // const query = `SELECT * FROM  tbl_personas   where rtn_persona like  '%${rtn}%' ;`;
  console.log(query);
  try {
    const result = await mysqlConnection.query(query);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.agregarPersona = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    primer_nom,
    segundo_nom,
    primer_apel,
    sexo,
    edad,
    tipo_persona,
    fec_nac_persona,
    rtn_persona,
    des_direc,
    municipio,
    departamento,
    num_tel,
    tipo_tel,
    usr_registro,
  } = req.body;

  const query = `CALL INSERT_PERSONA(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  try {
    await mysqlConnection.query(query, [
      primer_nom,
      segundo_nom,
      primer_apel,
      sexo,
      edad,
      tipo_persona,
      fec_nac_persona,
      rtn_persona,
      des_direc,
      municipio,
      departamento,
      num_tel,
      tipo_tel,
      usr_registro,
    ]);
    return res.json({ Status: "Persona Agregada" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarPersona = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    primer_nom,
    segundo_nom,
    primer_apel,
    sexo,
    edad,
    tipo_persona,
    fec_nac_persona,
    rtn_persona,
    des_direc,
    municipio,
    departamento,
    num_tel,
    tipo_tel,
    usr_registro,
  } = req.body;

  const { cod } = req.params;

  const query =
    "CALL UPDATE_PERSONA(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

  try {
    const result = await mysqlConnection.query(query, [
      cod,
      primer_nom,
      segundo_nom,
      primer_apel,
      sexo,
      edad,
      tipo_persona,
      fec_nac_persona,
      rtn_persona,
      des_direc,
      municipio,
      departamento,
      num_tel,
      tipo_tel,
      usr_registro,
    ]);
    return res.json({ Status: "Persona Actualizada" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarPersona = async (req, res, next) => {
  const { usr_registro } = req.body;
  const { cod } = req.params;
  const query = "CALL DELETE_PERSONA(?, ?);";

  try {
    const result = await mysqlConnection.query(query, [cod, usr_registro]);
    return res.json({ Status: "Persona Eliminada" });
  } catch (error) {
    console.log(error);
    next();
  }
};
