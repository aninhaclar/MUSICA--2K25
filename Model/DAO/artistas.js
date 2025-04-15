/************************************************************************************************ 
 * Objetivo: Criar o CRUD de dados na tabela de artista no Banco de dados.
 * Data:     15.04.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
************************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para inserir um novo artista
const insertArtista = async function (artista) {
  try {
    let sql = `INSERT INTO tbl_artista (nome, data_nascimento, gravadora_id)
                VALUES ('${artista.nome}', '${artista.data_nascimento}', ${artista.gravadora_id})`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para atualizar um artista existente
const updateArtista = async function (artista) {
  try {
    let sql = `UPDATE tbl_artista SET nome='${artista.nome}', data_nascimento='${artista.data_nascimento}', gravadora_id=${artista.gravadora_id}
               WHERE id = ${artista.id}`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para excluir um artista existente
const deleteArtista = async function (id) {
  try {
    let sql = `DELETE FROM tbl_artista WHERE id = ${id}`;

    let resultArtista = await prisma.$executeRawUnsafe(sql);

    if (resultArtista) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para retornar todos os artistas do BD
const selectAllArtista = async function () {
  try {
    let sql = 'SELECT * FROM tbl_artista ORDER BY id DESC';

    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para buscar um artista pelo ID
const selectByIdArtista = async function (id) {
  try {
    let sql = `SELECT * FROM tbl_artista WHERE id = ${id}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  insertArtista,
  updateArtista,
  deleteArtista,
  selectAllArtista,
  selectByIdArtista,
};
