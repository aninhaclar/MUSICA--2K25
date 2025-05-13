

/************************************************************************************************ 
 * Objetivo: Criar o CRUD de dados na tabela de gênero no Banco de dados.
 * Data:     22.04.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
************************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir um novo gênero
const insertMusicaGenero = async function (genero) {
  try {
    let sql = `INSERT INTO tbl_muica_genero      (
                                            id_musica, 
                                            id_genero
                                           ) 
                                              VALUES 
                                            (
                                              '${MusicaGenero.id_musica}', 
                                              '${MusicaGenero.id_genero}'
                                            )`
                                            
                console.log(sql)
                
    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true
    else
        return false 
} catch(error) {

    return false
}

};

// Atualizar um gênero existente
const updateMusicaGenero = async function (genero) {
  try {
    let sql = `UPDATE tbl_musica_genero set 
                                      id_musica = '${MusicaGenero.id_musica}', 
                                      id_genero = '${MusicaGenero.id_genero}' 

                                     WHERE id = ${MusicaGenero.id}`;
                                     
let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true
     else
        return false 
    } catch(error) {
        return false
  }
};

// Deletar um gênero
const deleteMusicaGenero = async function (id) {
try {
    let sql = `delete from tbl_musica_genero where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else 
    return false 
} catch (error){
    return false
}
};

// Selecionar todos os gêneros
const selectAllMusicaGenero = async function () {
  try {
    let sql = `select * from tbl_musica_genero order by desc`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return result
    else
    return false
  
  } catch (error) {
    return false
  }
}
// Selecionar gênero por ID
const selectByIdMusicaGenero = async function (id) {
try {
    let sql = `select * from tbl_musica_genero order by id desc`

    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else
        return false
} catch (error) {
    return false
}
};

module.exports = {
  insertMusicaGenero,
  updateMusicaGenero,
  deleteMusicaGenero,
  selectAllMusicaGenero,
  selectByIdMusicaGenero
};
