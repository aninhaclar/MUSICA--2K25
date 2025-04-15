const message = require('../../Modulo/config.js');
const generoDAO = require('../../Model/DAO/genero.js');

// INSERIR
const inserirGenero = async function (genero, contentType) {
  try {
    if (String(contentType).toLowerCase() === 'application/json') {
      if (
        !genero.nome || genero.nome.length > 100
      ) {
        return message.ERROR_REQUIRED_FIELDS;
      } else {
        let result = await generoDAO.insertGenero(genero);
        return result ? message.SUCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
      }
    } else {
      return message.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

// ATUALIZAR
const atualizarGenero = async function (id, genero, contentType) {
  try {
    if (String(contentType).toLowerCase() === 'application/json') {
      if (
        !genero.nome || genero.nome.length > 100 ||
        !id || isNaN(id)
      ) {
        return message.ERROR_REQUIRED_FIELDS;
      } else {
        let result = await generoDAO.selectByIdGenero(id);
        if (result.length > 0) {
          genero.id = parseInt(id);
          let updated = await generoDAO.updateGenero(genero);
          return updated ? message.SUCCESS_UPDATE_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
        } else {
          return message.ERROR_NOT_FOUND;
        }
      }
    } else {
      return message.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

// DELETAR
const excluirGenero = async function (id) {
  try {
    if (!id || isNaN(id)) {
      return message.ERROR_REQUIRED_FIELDS;
    } else {
      let result = await generoDAO.selectByIdGenero(id);
      if (result.length > 0) {
        let deleted = await generoDAO.deleteGenero(id);
        return deleted ? message.SUCCESS_DELETE_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
      } else {
        return message.ERROR_NOT_FOUND;
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

// LISTAR TODOS
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
      return message.ERROR_NOT_FOUND;
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

// BUSCAR POR ID
const buscarGenero = async function (id) {
  try {
    if (!id || isNaN(id)) {
      return message.ERROR_REQUIRED_FIELDS;
    } else {
      let result = await generoDAO.selectByIdGenero(id);
      if (result.length > 0) {
        return {
          status: true,
          status_code: 200,
          genero: result
        };
      } else {
        return message.ERROR_NOT_FOUND;
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};

module.exports = {
  inserirGenero,
  atualizarGenero,
  excluirGenero,
  listarGeneros,
  buscarGenero
};
