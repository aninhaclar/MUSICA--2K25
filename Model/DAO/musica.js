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
                                        link)
                        values ('${musica.nome}',
                                '${musica.duracao}',
                                '${musica.data_lancamento}',
                                '${musica.letra}',
                                '${musica.link}'
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
const updateMusica = async function(){

}

//Função para excluir uma música existente
const deleteMusica = (id) => {
    let musicas = lerMusicas();
    const musicaIndex = musicas.findIndex(musica => musica.id === parseInt(id));

    if (musicaIndex !== -1) {
        const [musicaDeletada] = musicas.splice(musicaIndex, 1);
        salvarMusicas(musicas);  // Salva o novo estado do arquivo após deletar
        return musicaDeletada;
    }
    return null;
};


//Função para retornar todas as músicas do BD
const selectAllMusica = async function () {
    try {

        //Scrpit SQL
        let sql = 'select * from tbl_musica order by id desc'
        //Encaminha o script para o banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result //retorna os dados do banco
    else
    return false
    } catch (error) {
        return false
    }
}

//Função para buscar uma música pelo ID
const selectByIdMusica = async function(){

}

module.exports ={
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}