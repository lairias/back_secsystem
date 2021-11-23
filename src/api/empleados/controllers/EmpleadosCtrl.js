// Importing the packages required for the project.
const { validationResult } = require("express-validator");
const mysqlConnection = require("../../../config/db");

//const express = require('express-validator');

// CRUD Methods
//Get all Employees
exports.buscarEmpleado = async (req, res, next) => {
  const { rtn } = req.params;
  const query = `SELECT tbl_empleados.cod_empleado, 
 tbl_empleados.cod_persona, 
 tbl_empleados.estado_empleado, 
 tbl_empleados.tipo_empleado, 
 tbl_empleados.hrstrab_emp, 
 tbl_contratos.cod_contratos, 
 tbl_contratos.des_contrato, 
 tbl_contratos.fec_ini_contrato, 
 tbl_contratos.fec_fin_contrato, 
 tbl_contratos.tipo_contrato,
 tbl_personas.primer_nom,
 tbl_personas.primer_apel,
 tbl_personas.rtn_persona,
 tbl_empleados.usr_registro,
 tbl_empleados.fec_registro
 FROM tbl_empleados
 INNER JOIN rel_emp_contratos ON rel_emp_contratos.cod_empleado = tbl_empleados.cod_empleado
 INNER JOIN tbl_contratos ON tbl_contratos.cod_contratos = rel_emp_contratos.cod_contratos
 INNER JOIN tbl_personas ON tbl_personas.cod_persona = tbl_empleados.cod_persona  where rtn_persona like  '%${rtn}%'  and  tipo_persona = 'empleado' ;`;
  console.log(query);
  try {
    const result = await mysqlConnection.query(query);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerEmpleado = async (req, res, next) => {
  const query = "CALL SHOW_EMPLEADOS;";

  try {
    const empleados = await mysqlConnection.query(query);
    return res.json(empleados["0"]);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerEmpleadoPorCod = async (req, res, next) => {
  const { cod } = req.params;
  const query = "CALL SHOW_EMPLEADOS_COD(?)";

  try {
    const result = await mysqlConnection.query(query, [cod]);
    return res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.agregarEmpleado = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    cod_persona,
    estado_empleado,
    tipo_empleado,
    hrstrab_emp,
    des_contrato,
    fec_ini_contrato,
    fec_fin_contrato,
    usr_registro,
  } = req.body;

  const query = `CALL INSERT_EMPLEADO(?, ?, ?, ?, ?, ?, ?, ?);`;

  try {
    const result = await mysqlConnection.query(query, [
      cod_persona,
      estado_empleado,
      tipo_empleado,
      hrstrab_emp,
      des_contrato,
      fec_ini_contrato,
      fec_fin_contrato,
      usr_registro,
    ]);
    return res.json({ Status: "Empleado Agregado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarEmpleado = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    estado_empleado,
    tipo_empleado,
    hrstrab_emp,
    des_contrato,
    fec_ini_contrato,
    fec_fin_contrato,
    usr_registro,
  } = req.body;

  const { cod } = req.params;

  const query = "CALL UPDATE_EMPLEADO(?, ?, ?, ?, ?, ?, ?, ?);";

  try {
    const result = await mysqlConnection.query(query, [
      cod,
      estado_empleado,
      tipo_empleado,
      hrstrab_emp,
      des_contrato,
      fec_ini_contrato,
      fec_fin_contrato,
      usr_registro,
    ]);
    return res.json({ Status: "Empleado Actualizado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.actualizarEmpleadoContrato = async (req, res, next) => {
  const { fec_fin_contrato } = req.body;

  const { cod } = req.params;

  const query = "CALL UPDATE_CONTRATO_EMPLEADO(?,?)";

  try {
    const result = await mysqlConnection.query(query, [cod, fec_fin_contrato]);
    return res.json({ Status: "Empleado Actualizado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarEmpleado = async (req, res, next) => {
  const { usr_registro } = req.body;
  const { cod } = req.params;
  const query = "CALL DELETE_EMPLEADO(?, ?);";

  try {
    const result = await mysqlConnection.query(query, [cod, usr_registro]);
    return res.json({ Status: "EmplEado Eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
