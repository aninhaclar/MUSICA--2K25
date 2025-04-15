/************************************************************************************************ 
 * Objetivo: Criar o CRUD de dados na tabela de gênero no Banco de dados.
 * Data:     15.04.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
************************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para inserir um novo gênero
const insertGenero = async function (genero) {
  try {
    let sql = `INSERT INTO tbl_genero (nome)
                VALUES ('${genero.nome}')`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para atualizar um gênero existente
const updateGenero = async function (genero) {
  try {
    let sql = `UPDATE tbl_genero SET nome='${genero.nome}' WHERE id = ${genero.id}`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para excluir um gênero existente
const deleteGenero = async function (id) {
  try {
    let sql = `DELETE FROM tbl_genero WHERE id = ${id}`;

    let resultGenero = await prisma.$executeRawUnsafe(sql);

    if (resultGenero) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para retornar todos os gêneros do BD
const selectAllGenero = async function () {
  try {
    let sql = 'SELECT * FROM tbl_genero ORDER BY id DESC';

    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para buscar um gênero pelo ID
const selectByIdGenero = async function (id) {
  try {
    let sql = `SELECT * FROM tbl_genero WHERE id = ${id}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  insertGenero,
  updateGenero,
  deleteGenero,
  selectAllGenero,
  selectByIdGenero,
};
