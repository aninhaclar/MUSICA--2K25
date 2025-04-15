/************************************************************************************************ 
 * Objetivo: Criar o CRUD de dados na tabela de playlist no Banco de dados.
 * Data:     15.04.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
************************************************************************************************/

// Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client');

// Instância da classe do Prisma Client
const prisma = new PrismaClient();

// Função para inserir uma nova playlist
const insertPlaylist = async function (playlist) {
  try {
    let sql = `INSERT INTO tbl_playlist (nome, usuario_id)
                VALUES ('${playlist.nome}', ${playlist.usuario_id})`;

    // Executa o script SQL no banco de dados e guarda o resultado (true ou false)
    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false; // Fase -> Bug no banco de dados
  } catch (error) {
    return false; // Fase -> Bug de programação
  }
};

// Função para atualizar uma playlist existente
const updatePlaylist = async function (playlist) {
  try {
    let sql = `UPDATE tbl_playlist SET nome='${playlist.nome}', usuario_id=${playlist.usuario_id}
               WHERE id = ${playlist.id}`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para excluir uma playlist existente
const deletePlaylist = async function (id) {
  try {
    let sql = `DELETE FROM tbl_playlist WHERE id = ${id}`;

    let resultPlaylist = await prisma.$executeRawUnsafe(sql);

    if (resultPlaylist) return true; // Retorna um Boolean true indicando a exclusão da playlist
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para retornar todas as playlists do BD
const selectAllPlaylist = async function () {
  try {
    // Script SQL
    let sql = 'SELECT * FROM tbl_playlist ORDER BY id DESC';

    // Encaminha o script para o banco de dados
    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result; // Retorna os dados do banco
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para buscar uma playlist pelo ID
const selectByIdPlaylist = async function (id) {
  try {
    let sql = `SELECT * FROM tbl_playlist WHERE id = ${id}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  insertPlaylist,
  updatePlaylist,
  deletePlaylist,
  selectAllPlaylist,
  selectByIdPlaylist,
};
