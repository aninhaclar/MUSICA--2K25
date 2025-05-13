/*****************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (Crud de dados)
 *  Validações, tratamento de dados, etc...
 * Data:     18.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
*****************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../Modulo/config.js');
const gravadoraDAO = require('../../Model/DAO/gravadora.js');

//Função para inserir uma nova gravadora
const insertGravadora = async function (gravadora, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (gravadora.nome == '' || gravadora.nome == null || gravadora.nome == undefined || gravadora.nome.length > 100 ||
                gravadora.ano_fundacao == '' || gravadora.ano_fundacao == null || gravadora.ano_fundacao == undefined) {
                return message.ERROR_REQUIRED_FIELDS; //Status code 400
            } else {
                let resultGravadora = await gravadoraDAO.insertGravadora(gravadora);
                if (resultGravadora)
                    return message.SUCESS_CREATED_ITEM; //Status code 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL; //Status code 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //Status code 500
    }
};

//Função para listar as gravadoras
const listarGravadora = async function () {
    try {
        let dadosGravadora = {};
        let resultGravadora = await gravadoraDAO.selectAllGravadora();
        if (resultGravadora != false) {
            if (resultGravadora.length > 0) {
                dadosGravadora.status = true;
                dadosGravadora.status_code = 200;
                dadosGravadora.items = resultGravadora.length;
                dadosGravadora.gravadoras = resultGravadora;
                return dadosGravadora;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL; //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

//Função para atualizar uma gravadora
const atualizarGravadora = async function (id, gravadora, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (gravadora.nome == '' || gravadora.nome == null || gravadora.nome == undefined || gravadora.nome.length > 100 ||
                gravadora.ano_fundacao == '' || gravadora.ano_fundacao == null || gravadora.ano_fundacao == undefined || 
                id == '' || id == null || id == undefined || isNaN(id)) {
                return message.ERROR_REQUIRED_FIELDS; //Status code 400
            } else {
                let result = await gravadoraDAO.selectByIdGravadora(id);
                if(result != false && result.length > 0) {
                    gravadora.id = id;
                    let resultGravadora = await gravadoraDAO.updateGravadora(gravadora);
                    if(resultGravadora) {
                        return message.SUCCESS_UPDATE_ITEM; //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return message.ERROR_NOT_FOUND; //404
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Função para excluir uma gravadora
const excluirGravadora = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id);
            if(resultGravadora != false && resultGravadora.length > 0) {
                let result = await gravadoraDAO.deleteGravadora(id);
                if(result)
                    return message.SUCCESS_DELETE_ITEM; //200
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL; //500
            } else {
                return message.ERROR_NOT_FOUND; //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Função para retornar uma gravadora pelo ID
const buscarGravadora = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let dadosGravadora = {};
            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id);
            if(resultGravadora != false && resultGravadora.length > 0) {
                dadosGravadora.status = true;
                dadosGravadora.status_code = 200;
                dadosGravadora.gravadora = resultGravadora;
                return dadosGravadora;
            } else {
                return message.ERROR_NOT_FOUND; //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

module.exports = {
    insertGravadora,
    listarGravadora,
    atualizarGravadora,
    excluirGravadora,
    buscarGravadora
};
