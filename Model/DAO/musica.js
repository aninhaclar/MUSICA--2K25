/************************************************************************************************ 
 * Objetivo: Criar o CRUD de dados na tabela de música no Banco de dados.
 * Data:     11.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
************************************************************************************************/

//Import da bivlioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require ('@prisma/client')

        //Instância da classe do prisma Client
        const  prisma = new PrismaClient()

//Função para inserir uma nova música
const insertMusica = async function(musica){
    try {
    

    let sql = `insert into tbl_musica ( nome,
                                        duracao, 
                                        data_lancamento, 
                                        letra, 
                                        link,
                                        id_classificacao
                                        )
                                          values 
                                        (
                                          '${musica.nome}',
                                          '${musica.duracao}',
                                          '${musica.data_lancamento}',
                                          '${musica.letra}',
                                          '${musica.link}',
                                          '${musica.id-classificacao}'
                                         )`


//Tem que colocar o async se não o AWAIT não funciona. / 
// 
// Executa o script SQL no banco de dados e guarda o resultado (true or false).
let result = await prisma.$executeRawUnsafe(sql);

if(result)
    return true
else 
    return false // Fase -> Bug no banco de dados
} catch (error) {
        return false  // Fase -> Bug de programação
    }


}

//Função para atualizar uma música existente
const updateMusica = async function(musica){
    try {
        let sql = `Update tbl_musica set nome='${musica.nome}'',
                                         duracao = '${musica.duracao}'', 
                                         data_lancamento = '${musica.data_lancamento}'', 
                                         letra = '${musica.letra}'', 
                                         link = '${musica.link}',
                                         id_classificacao = '${musica.id_classificacao}'
                                    where id = ${musica.id} `

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false 
    
    } catch (error) {
        return false
    }
}


//Função para excluir uma música existente
const deleteMusica = async function(id){
    try {
        let sql = `delete from tbl_musica where id = ${id}`

        let resultMusica = await prisma.$executeRawUnsafe(sql)

        if(resultMusica)
            return true 
        else
            return false

    } catch (error) {
        return false
    }
}


//Função para retornar todas as músicas do BD
const selectAllMusica = async function () {
    try {

        //Scrpit SQL
        let sql = 'select * from tbl_musica order by id desc'
        //Encaminha o script para o banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result 
    else
    return false
    } catch (error) {
        return false
    }
}

//Função para buscar uma música pelo ID
const selectByIdMusica = async function(id){
    try {
        let sql = `select *from tbl_musica where id = ${id}`

        let result =  await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
        return false
    } catch (error) {
        return false

    }
}

module.exports ={
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}