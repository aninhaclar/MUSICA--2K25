/*****************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (Crud de dados)
 *  Validações, tratamento de dados, etc...
 * Data:     18.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
*****************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../Modulo/config.js');
const artistasDAO = require('../../Model/DAO/artistas.js');

//Função para inserir um novo artista
const insertArtista = async function (artista, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (artista.nome == '' || artista.nome == null || artista.nome == undefined || artista.nome.length > 100 ||
                artista.data_nascimento == '' || artista.data_nascimento == null || artista.data_nascimento == undefined) {
                return message.ERROR_REQUIRED_FIELDS; //Status code 400
            } else {
                let resultArtista = await artistasDAO.insertArtista(artista);
                if (resultArtista)
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

//Função para listar os artistas
const listarArtista = async function () {
    try {
        let dadosArtista = {};
        let resultArtista = await artistasDAO.selectAllArtista();
        if (resultArtista != false) {
            if (resultArtista.length > 0) {
                dadosArtista.status = true;
                dadosArtista.status_code = 200;
                dadosArtista.items = resultArtista.length;
                dadosArtista.artistas = resultArtista;
                return dadosArtista;
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

//Função para atualizar um artista
const atualizarArtista = async function (id, artista, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (artista.nome == '' || artista.nome == null || artista.nome == undefined || artista.nome.length > 100 ||
                artista.data_nascimento == '' || artista.data_nascimento == null || artista.data_nascimento == undefined ||
                id == '' || id == null || id == undefined || isNaN(id)) {
                return message.ERROR_REQUIRED_FIELDS; //Status code 400
            } else {
                let result = await artistasDAO.selectByIdArtista(id);
                if(result != false && result.length > 0) {
                    artista.id = id;
                    let resultArtista = await artistasDAO.updateArtista(artista);
                    if(resultArtista) {
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

//Função para excluir um artista
const excluirArtista = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let resultArtista = await artistasDAO.selectByIdArtista(id);
            if(resultArtista != false && resultArtista.length > 0) {
                let result = await artistasDAO.deleteArtista(id);
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

//Função para retornar um artista pelo ID
const buscarArtista = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let dadosArtista = {};
            let resultArtista = await artistasDAO.selectByIdArtista(id);
            if(resultArtista != false && resultArtista.length > 0) {
                dadosArtista.status = true;
                dadosArtista.status_code = 200;
                dadosArtista.artista = resultArtista;
                return dadosArtista;
            } else {
                return message.ERROR_NOT_FOUND; //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

module.exports = {
    insertArtista,
    listarArtista,
    atualizarArtista,
    excluirArtista,
    buscarArtista
};
