/************************************************************************************************ 
 * Objetivo: Criar o CRUD de dados na tabela de gênero no Banco de dados.
 * Data:     22.04.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
************************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir um novo gênero
const insertGenero = async function (genero) {
  try {
    let sql = `INSERT INTO tbl_genero (nome, tipo) VALUES ('${genero.nome}', '${genero.tipo}')`;
    let result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.log('🔥 Erro no insertGenero:', error);
    return false;
  }
};

// Atualizar um gênero existente
const updateGenero = async function (genero) {
  try {
    let sql = `UPDATE tbl_genero SET nome = '${genero.nome}', tipo = '${genero.tipo}' WHERE id = ${genero.id}`;
    let result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.log('🔥 Erro no updateGenero:', error);
    return false;
  }
};

// Deletar um gênero
const deleteGenero = async function (id) {
  try {
    let sql = `DELETE FROM tbl_genero WHERE id = ${id}`;
    let result = await prisma.$executeRawUnsafe(sql);
    return result ? true : false;
  } catch (error) {
    console.log('🔥 Erro no deleteGenero:', error);
    return false;
  }
};

// Selecionar todos os gêneros
const selectAllGenero = async function () {
  try {
    let sql = `SELECT * FROM tbl_genero ORDER BY id DESC`;
    let result = await prisma.$queryRawUnsafe(sql);
    return result ? result : false;
  } catch (error) {
    return false;
  }
};

// Selecionar gênero por ID
const selectByIdGenero = async function (id) {
  try {
    let sql = `SELECT * FROM tbl_genero WHERE id = ${id}`;
    let result = await prisma.$queryRawUnsafe(sql);
    return result ? result : false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  insertGenero,
  updateGenero,
  deleteGenero,
  selectAllGenero,
  selectByIdGenero
};
