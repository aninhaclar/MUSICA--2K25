/************************************************************************************************ 
 * Objetivo: Criar o CRUD de dados na tabela de gravadora no Banco de dados.
 * Data:     15.04.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
************************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para inserir uma nova gravadora
const insertGravadora = async function (gravadora) {
  try {
    let sql = `INSERT INTO tbl_gravadora (nome, endereco)
                VALUES ('${gravadora.nome}', '${gravadora.endereco}')`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para atualizar uma gravadora existente
const updateGravadora = async function (gravadora) {
  try {
    let sql = `UPDATE tbl_gravadora SET nome='${gravadora.nome}', endereco='${gravadora.endereco}'
               WHERE id = ${gravadora.id}`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para excluir uma gravadora existente
const deleteGravadora = async function (id) {
  try {
    let sql = `DELETE FROM tbl_gravadora WHERE id = ${id}`;

    let resultGravadora = await prisma.$executeRawUnsafe(sql);

    if (resultGravadora) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para retornar todas as gravadoras do BD
const selectAllGravadora = async function () {
  try {
    let sql = 'SELECT * FROM tbl_gravadora ORDER BY id DESC';

    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para buscar uma gravadora pelo ID
const selectByIdGravadora = async function (id) {
  try {
    let sql = `SELECT * FROM tbl_gravadora WHERE id = ${id}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  insertGravadora,
  updateGravadora,
  deleteGravadora,
  selectAllGravadora,
  selectByIdGravadora,
};
