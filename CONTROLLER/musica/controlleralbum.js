/*****************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (Crud de dados)
 *  Validações, tratamento de dados, etc...
 * Data:     18.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
*****************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../Modulo/config.js');
const albumDAO = require('../../Model/DAO/album.js');

//Função para inserir um novo álbum
const insertAlbum = async function (album, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            // Validação dos campos com os nomes corretos
            if (
                album.titulo == '' || album.titulo == null || album.titulo == undefined || album.titulo.length > 90 ||
                album.ano_lancamento == '' || album.ano_lancamento == null || album.ano_lancamento == undefined ||
                album.artista == '' || album.artista == null || album.artista == undefined || album.artista.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS; // Status code 400
            } else {
                let resultAlbum = await albumDAO.insertAlbum(album);
                if (resultAlbum)
                    return message.SUCESS_CREATED_ITEM; // Status code 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL; // Status code 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // Status code 415
        }
    } catch (error) {
        console.log("🔥 Erro no controller:", error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // Status code 500
    }
};

//Função para listar os álbuns
const listarAlbum = async function () {
    try {
        let dadosAlbum = {};
        let resultAlbum = await albumDAO.selectAllAlbum();
        if (resultAlbum != false) {
            if (resultAlbum.length > 0) {
                dadosAlbum.status = true;
                dadosAlbum.status_code = 200;
                dadosAlbum.items = resultAlbum.length;
                dadosAlbum.albuns = resultAlbum;
                return dadosAlbum;
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

//Função para atualizar um álbum
const atualizarAlbum = async function (id, album, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (album.nome == '' || album.nome == null || album.nome == undefined || album.nome.length > 100 ||
                album.data_lancamento == '' || album.data_lancamento == null || album.data_lancamento == undefined ||
                id == '' || id == null || id == undefined || isNaN(id)) {
                return message.ERROR_REQUIRED_FIELDS; //Status code 400
            } else {
                let result = await albumDAO.selectByIdAlbum(id);
                if(result != false && result.length > 0) {
                    album.id = id;
                    let resultAlbum = await albumDAO.updateAlbum(album);
                    if(resultAlbum) {
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

//Função para excluir um álbum
const excluirAlbum = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let resultAlbum = await albumDAO.selectByIdAlbum(id);
            if(resultAlbum != false && resultAlbum.length > 0) {
                let result = await albumDAO.deleteAlbum(id);
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

//Função para retornar um álbum pelo ID
const buscarAlbum = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS; //400
        } else {
            let dadosAlbum = {};
            let resultAlbum = await albumDAO.selectByIdAlbum(id);
            if(resultAlbum != false && resultAlbum.length > 0) {
                dadosAlbum.status = true;
                dadosAlbum.status_code = 200;
                dadosAlbum.album = resultAlbum;
                return dadosAlbum;
            } else {
                return message.ERROR_NOT_FOUND; //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

module.exports = {
    insertAlbum,
    listarAlbum,
    atualizarAlbum,
    excluirAlbum,
    buscarAlbum
};
