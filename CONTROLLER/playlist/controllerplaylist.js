/*****************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (Crud de dados)
 *  Validações, tratamento de dados, etc...
 * Data:     18.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
*****************************************************************************************/

const message = require('../../Modulo/config.js');
const playlistDAO = require('../../Model/DAO/playlist.js');

// Função para inserir uma nova playlist
const insertPlaylist = async function (playlist) {
    try {
        // Verificando se os dados necessários foram passados corretamente
        if (!playlist.nome || !playlist.criador) {
            return {
                status: false,
                status_code: 400,
                message: "Os campos 'nome' e 'criador' são obrigatórios."
            };
        }

        // Inserção no banco de dados
        let sql = `INSERT INTO tbl_playlist (nome, criador)
                   VALUES ('${playlist.nome}', ${playlist.criador})`;

        // Executando a query no banco de dados
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return {
                status: true,
                status_code: 201,
                message: "Playlist criada com sucesso.",
            };
        } else {
            return {
                status: false,
                status_code: 500,
                message: "Erro interno ao criar playlist."
            };
        }
    } catch (error) {
        console.error("Erro ao inserir playlist: ", error);
        return {
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao criar playlist."
        };
    }
};


// Função para listar as playlists
const listarPlaylist = async function () {
  try {
    let dadosPlaylist = {};
    let resultPlaylist = await playlistDAO.selectAllPlaylist();
    if (resultPlaylist != false) {
      if (resultPlaylist.length > 0) {
        dadosPlaylist.status = true;
        dadosPlaylist.status_code = 200;
        dadosPlaylist.items = resultPlaylist.length;
        dadosPlaylist.playlists = resultPlaylist;
        return dadosPlaylist;
      } else {
        return message.ERROR_NOT_FOUND;
      }
    } else {
      return message.ERROR_INTERNAL_SERVER_MODEL; // 500
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

// Função para atualizar uma playlist
const atualizarPlaylist = async function (id, playlist, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
        playlist.nome == '' || playlist.nome == null || playlist.nome == undefined || playlist.nome.length > 100 ||
        playlist.descricao == '' || playlist.descricao == null || playlist.descricao == undefined ||
        id == '' || id == null || id == undefined || isNaN(id)
      ) {
        return message.ERROR_REQUIRED_FIELDS; // Status code 400
      } else {
        let result = await playlistDAO.selectByIdPlaylist(id);
        if (result != false && result.length > 0) {
          playlist.id = id;
          let resultPlaylist = await playlistDAO.updatePlaylist(playlist);
          if (resultPlaylist) {
            return message.SUCCESS_UPDATE_ITEM; // 200
          } else {
            return message.ERROR_INTERNAL_SERVER_MODEL; // 500
          }
        } else {
          return message.ERROR_NOT_FOUND; // 404
        }
      }
    } else {
      return message.ERROR_CONTENT_TYPE; // 415
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

// Função para excluir uma playlist
const excluirPlaylist = async function (id) {
  try {
    if (
      id == '' || id == undefined || id == null || isNaN(id)
    ) {
      return message.ERROR_REQUIRED_FIELDS; // 400
    } else {
      let resultPlaylist = await playlistDAO.selectByIdPlaylist(id);
      if (resultPlaylist != false && resultPlaylist.length > 0) {
        let result = await playlistDAO.deletePlaylist(id);
        if (result)
          return message.SUCCESS_DELETE_ITEM; // 200
        else
          return message.ERROR_INTERNAL_SERVER_MODEL; // 500
      } else {
        return message.ERROR_NOT_FOUND; // 404
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

// Função para buscar uma playlist pelo ID
const buscarPlaylist = async function (id) {
  try {
    if (
      id == '' || id == undefined || id == null || isNaN(id)
    ) {
      return message.ERROR_REQUIRED_FIELDS; // 400
    } else {
      let dadosPlaylist = {};
      let resultPlaylist = await playlistDAO.selectByIdPlaylist(id);
      if (resultPlaylist != false && resultPlaylist.length > 0) {
        dadosPlaylist.status = true;
        dadosPlaylist.status_code = 200;
        dadosPlaylist.playlist = resultPlaylist;
        return dadosPlaylist;
      } else {
        return message.ERROR_NOT_FOUND; // 404
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
};

module.exports = {
  insertPlaylist,
  listarPlaylist,
  atualizarPlaylist,
  excluirPlaylist,
  buscarPlaylist
};
