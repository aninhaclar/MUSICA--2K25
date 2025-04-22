/*****************************************************************************************
 * Objetivo: Criar o CRUD de dados na tabela de artistas no Banco de dados.
 * Data:     11.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
*****************************************************************************************/

//Import da biblioteca do prisma client para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do Prisma Client
const prisma = new PrismaClient()

//Função para inserir um novo artista
const insertArtista = async function(artista) {
    try {
        let sql = `INSERT INTO tbl_artistas (nome, nacionalidade, data_nascimento)
                   VALUES ('${artista.nome}', 
                           '${artista.nacionalidade}', 
                           '${artista.data_nascimento}')`

        // Executa o script SQL no banco de dados e guarda o resultado (true or false)
        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true; // Sucesso na inserção
        else 
            return false; // Fase -> Bug no banco de dados
    } catch (error) {
        console.error('Erro na inserção do artista:', error);
        return false; // Fase -> Bug de programação
    }
}

//Função para atualizar um artista existente
const updateArtista = async function(artista) {
    try {
        let sql = `UPDATE tbl_artistas SET nome = '${artista.nome}', 
                                             nacionalidade = '${artista.nacionalidade}', 
                                             data_nascimento = '${artista.data_nascimento}'
                   WHERE id = ${artista.id}`

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true; // Sucesso na atualização
        else 
            return false; // Fase -> Bug no banco de dados
    
    } catch (error) {
        console.error('Erro na atualização do artista:', error);
        return false; // Fase -> Bug de programação
    }
}

//Função para excluir um artista existente
const deleteArtista = async function(id) {
    try {
        let sql = `DELETE FROM tbl_artistas WHERE id = ${id}`;

        let resultArtista = await prisma.$executeRawUnsafe(sql);

        if (resultArtista)
            return true; // Sucesso na exclusão do artista
        else 
            return false; // Fase -> Bug no banco de dados

    } catch (error) {
        console.error('Erro na exclusão do artista:', error);
        return false; // Fase -> Bug de programação
    }
}

//Função para retornar todos os artistas do BD
const selectAllArtista = async function() {
    try {
        // Script SQL para selecionar todos os artistas
        let sql = 'SELECT * FROM tbl_artistas ORDER BY id DESC';

        let result = await prisma.$queryRawUnsafe(sql);

        if (result)
            return result; // Retorna os dados dos artistas
        else 
            return false; // Fase -> Nenhum dado encontrado
    } catch (error) {
        console.error('Erro ao listar artistas:', error);
        return false; // Fase -> Bug de programação
    }
}

//Função para buscar um artista pelo ID
const selectByIdArtista = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_artistas WHERE id = ${id}`;

        let result = await prisma.$queryRawUnsafe(sql);

        if (result)
            return result; // Retorna o artista encontrado
        else 
            return false; // Fase -> Artista não encontrado
    } catch (error) {
        console.error('Erro ao buscar artista:', error);
        return false; // Fase -> Bug de programação
    }
}

module.exports = {
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
}
