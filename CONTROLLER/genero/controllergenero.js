/************************************************************************************************ 
 * Objetivo: Controller responsável pela integração entre o APP e a Model (Crud de dados).
 *  Validações, tratamento de dados, etc...
 * Data:     22.04.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
************************************************************************************************/

const message = require('../../Modulo/config.js');
const generoDAO = require('../../Model/DAO/genero.js');

// Função para inserir um novo gênero
const inserirGenero = async function (genero, contentType) {
  try {
    if (String(contentType).toLowerCase() === 'application/json') {
      if (!genero.nome || genero.nome.length > 100 || !genero.tipo || genero.tipo.length > 50) {
        return message.ERROR_REQUIRED_FIELDS; // Status code 400
      } else {
        let result = await generoDAO.insertGenero(genero);
        return result ? message.SUCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL; // Status code 500
      }
    } else {
      return message.ERROR_CONTENT_TYPE; // 415
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
  }
};

// Função para atualizar um gênero existente
const atualizarGenero = async function (id, genero, contentType) {
  try {
    if (String(contentType).toLowerCase() === 'application/json') {
      if (!genero.nome || genero.nome.length > 100 || !genero.tipo || genero.tipo.length > 50 || !id || isNaN(id)) {
        return message.ERROR_REQUIRED_FIELDS; // Status code 400
      } else {
        let result = await generoDAO.selectByIdGenero(id);
        if (result.length > 0) {
          genero.id = parseInt(id);
          let updated = await generoDAO.updateGenero(genero);
          return updated ? message.SUCCESS_UPDATE_ITEM : message.ERROR_INTERNAL_SERVER_MODEL; // Status code 200
        } else {
          return message.ERROR_NOT_FOUND; // Status code 404
        }
      }
    } else {
      return message.ERROR_CONTENT_TYPE; // 415
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
  }
};

// Função para excluir um gênero existente
const excluirGenero = async function (id) {
  try {
    if (!id || isNaN(id)) {
      return message.ERROR_REQUIRED_FIELDS; // Status code 400
    } else {
      let result = await generoDAO.selectByIdGenero(id);
      if (result.length > 0) {
        let deleted = await generoDAO.deleteGenero(id);
        return deleted ? message.SUCCESS_DELETE_ITEM : message.ERROR_INTERNAL_SERVER_MODEL; // Status code 200
      } else {
        return message.ERROR_NOT_FOUND; // Status code 404
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
  }
};

// Função para listar todos os gêneros
const listarGeneros = async function () {
  try {
    let dados = {};
    let result = await generoDAO.selectAllGenero();
    if (result.length > 0) {
      dados.status = true;
      dados.status_code = 200;
      dados.quantidade = result.length;
      dados.generos = result;
      return dados;
    } else {
      return message.ERROR_NOT_FOUND; // Status code 404
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
  }
};

// Função para buscar um gênero pelo ID
const buscarGenero = async function (id) {
  try {
    if (!id || isNaN(id)) {
      return message.ERROR_REQUIRED_FIELDS; // 400
    } else {
      let result = await generoDAO.selectByIdGenero(id);
      if (result.length > 0) {
        return {
          status: true,
          status_code: 200,
          genero: result
        };
      } else {
        return message.ERROR_NOT_FOUND; // 404
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

module.exports = {
  inserirGenero,
  atualizarGenero,
  excluirGenero,
  listarGeneros,
  buscarGenero
};
