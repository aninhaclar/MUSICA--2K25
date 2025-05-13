/*****************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (Crud de dados)
 *  Validações, tratamento de dados, etc...
 * Data:     18.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
*****************************************************************************************/

const message = require('../../Modulo/config.js');
const albumDAO = require('../../Model/DAO/album.js');

// Função para inserir um novo álbum
const insertAlbum = async function (album, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                album.titulo === '' || album.titulo == null || album.titulo.length > 90 ||
                album.ano_lancamento === '' || album.ano_lancamento == null ||
                album.artista === '' || album.artista == null || album.artista.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let resultAlbum = await albumDAO.insertAlbum(album);
                return resultAlbum ? message.SUCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log("🔥 Erro no controller:", error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Função para listar os álbuns
const listarAlbum = async function () {
    try {
        let dadosAlbum = {};
        let resultAlbum = await albumDAO.selectAllAlbum();

        if (resultAlbum && resultAlbum.length > 0) {
            dadosAlbum.status = true;
            dadosAlbum.status_code = 200;
            dadosAlbum.items = resultAlbum.length;
            dadosAlbum.albuns = resultAlbum;
            return dadosAlbum;
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Função para atualizar um álbum
const atualizarAlbum = async function (id, album, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                album.titulo === '' || album.titulo == null || album.titulo.length > 90 ||
                album.ano_lancamento === '' || album.ano_lancamento == null ||
                album.artista === '' || album.artista == null || album.artista.length > 100 ||
                id == '' || id == null || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                const existeAlbum = await albumDAO.selectByIdAlbum(id);
                if (existeAlbum && existeAlbum.length > 0) {
                    album.id = id;
                    const resultAlbum = await albumDAO.updateAlbum(album);
                    return resultAlbum ? message.SUCCESS_UPDATE_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
                } else {
                    return message.ERROR_NOT_FOUND;
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log("🔥 Erro no controller (atualizar):", error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Função para excluir um álbum
const excluirAlbum = async function (id) {
    try {
        if (id == '' || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS;
        } else {
            const resultAlbum = await albumDAO.selectByIdAlbum(id);
            if (resultAlbum && resultAlbum.length > 0) {
                const result = await albumDAO.deleteAlbum(id);
                return result ? message.SUCCESS_DELETE_ITEM : message.ERROR_INTERNAL_SERVER_MODEL;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Função para retornar um álbum pelo ID
const buscarAlbum = async function (id) {
    try {
        if (id == '' || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS;
        } else {
            let dadosAlbum = {};
            let resultAlbum = await albumDAO.selectByIdAlbum(id);
            if (resultAlbum && resultAlbum.length > 0) {
                dadosAlbum.status = true;
                dadosAlbum.status_code = 200;
                dadosAlbum.album = resultAlbum;
                return dadosAlbum;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

module.exports = {
    insertAlbum,
    listarAlbum,
    atualizarAlbum,
    excluirAlbum,
    buscarAlbum
};
