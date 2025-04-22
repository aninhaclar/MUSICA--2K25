/*****************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (Crud de dados)
 *  Validações, tratamento de dados, etc...
 * Data:     18.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
*****************************************************************************************/

const message = require('../../Modulo/config.js')
const artistaDAO = require('../../Model/DAO/artistas.js'); // Altere para o arquivo correto para o DAO de artistas

// Função para inserir um novo artista
const insertArtista = async function (artista, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                artista.nome == '' || artista.nome == null || artista.nome == undefined || artista.nome.length > 100 ||
                artista.nacionalidade == '' || artista.nacionalidade == null || artista.nacionalidade == undefined || artista.nacionalidade.length > 50 ||
                artista.data_nascimento == '' || artista.data_nascimento == null || artista.data_nascimento == undefined || artista.data_nascimento.length > 10
            ) {
                return message.ERROR_REQUIRED_FIELDS; // Status code 400
            } else {
                let resultArtista = await artistaDAO.insertArtista(artista);

                if (resultArtista)
                    return message.SUCESS_CREATED_ITEM; // Status code 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL; // Status code 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // Status code 415
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
    }
}

// Função para atualizar um artista existente
const atualizarArtista = async function (id, artista, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                artista.nome == '' || artista.nome == null || artista.nome == undefined || artista.nome.length > 100 ||
                artista.nacionalidade == '' || artista.nacionalidade == null || artista.nacionalidade == undefined || artista.nacionalidade.length > 50 ||
                artista.data_nascimento == '' || artista.data_nascimento == null || artista.data_nascimento == undefined || artista.data_nascimento.length > 10 ||
                id == '' || id == null || id == undefined || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS; // Status code 400
            } else {
                let result = await artistaDAO.selectByIdArtista(id);
                if (result != false && typeof(result) == 'object') {
                    if (result.length > 0) {
                        // Adiciona o ID ao objeto artista
                        artista.id = id;
                        let resultArtista = await artistaDAO.updateArtista(artista);

                        if (resultArtista) {
                            return message.SUCCESS_UPDATE_ITEM; // Status code 200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL; // Status code 500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND; // Status code 404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL; // Status code 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // Status code 415
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
    }
}

// Função para excluir um artista existente
const excluirArtista = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // Status code 400
        } else {
            let resultArtista = await artistaDAO.selectByIdArtista(id);

            if (resultArtista != false && typeof(resultArtista) == 'object') {
                if (resultArtista.length > 0) {
                    let result = await artistaDAO.deleteArtista(id);

                    if (result)
                        return message.SUCCESS_DELETE_ITEM; // Status code 200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL; // Status code 500
                } else {
                    return message.ERROR_NOT_FOUND; // Status code 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL; // Status code 500
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
    }
}

// Função para listar todos os artistas
const listarArtista = async function () {
    try {
        let dadosArtista = {};
        let resultArtista = await artistaDAO.selectAllArtista();

        if (resultArtista != false) {
            if (resultArtista.length > 0) {
                dadosArtista.status = true;
                dadosArtista.status_code = 200;
                dadosArtista.items = resultArtista.length;
                dadosArtista.artistas = resultArtista;
                return dadosArtista;
            } else {
                return message.ERROR_NOT_FOUND; // Status code 404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL; // Status code 500
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
    }
}

// Função para buscar um artista pelo ID
const buscarArtista = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; // Status code 400
        } else {
            let dadosArtista = {};
            let resultArtista = await artistaDAO.selectByIdArtista(id);

            if (resultArtista != false && typeof(resultArtista) == 'object') {
                if (resultArtista.length > 0) {
                    dadosArtista.status = true;
                    dadosArtista.status_code = 200;
                    dadosArtista.artistas = resultArtista;
                    return dadosArtista;
                } else {
                    return message.ERROR_NOT_FOUND; // Status code 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL; // Status code 500
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
    }
}

module.exports = {
    insertArtista,
    atualizarArtista,
    excluirArtista,
    listarArtista,
    buscarArtista
}
