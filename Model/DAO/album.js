/************************************************************************************************ 
 * Objetivo: Criar o CRUD de dados na tabela de álbum no Banco de dados.
 * Data:     15.04.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
************************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para inserir um novo álbum
const insertAlbum = async function (album) {
  try {
    let sql = `INSERT INTO tbl_album (titulo, ano_lancamento, artista)
               VALUES ('${album.titulo}', '${album.ano_lancamento}', '${album.artista}')`;

    console.log('SQL gerado:', sql); // debug
    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false;
  } catch (error) {
    console.log('🔥 Erro na inserção do álbum:', error); // debug
    return false;
  }
};



// Função para atualizar um álbum existente
const updateAlbum = async function (album) {
  try {
    let sql = `UPDATE tbl_album SET nome='${album.nome}', data_lancamento='${album.data_lancamento}', gravadora_id=${album.gravadora_id}
               WHERE id = ${album.id}`;

    let result = await prisma.$executeRawUnsafe(sql);

    if (result) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para excluir um álbum existente
const deleteAlbum = async function (id) {
  try {
    let sql = `DELETE FROM tbl_album WHERE id = ${id}`;

    let resultAlbum = await prisma.$executeRawUnsafe(sql);

    if (resultAlbum) return true;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para retornar todos os álbuns do BD
const selectAllAlbum = async function () {
  try {
    let sql = 'SELECT * FROM tbl_album ORDER BY id DESC';

    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

// Função para buscar um álbum pelo ID
const selectByIdAlbum = async function (id) {
  try {
    let sql = `SELECT * FROM tbl_album WHERE id = ${id}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if (result) return result;
    else return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  insertAlbum,
  updateAlbum,
  deleteAlbum,
  selectAllAlbum,
  selectByIdAlbum,
};
