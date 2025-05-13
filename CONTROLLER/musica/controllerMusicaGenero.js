/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 13/05/2025
 * Autor: Ana Pires
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../Modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const musicaGeneroDAO = require('../../Model/DAO/musica_genero.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirMusicaGenero = async function(musicaGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    musicaGenero.id_musica              == ''           || musicaGenero.id_musica     == undefined    || musicaGenero.id_musica  == null || isNaN(musicaGenero.id_musica)  || musicaGenero.id_musica <=0 ||
                    musicaGenero.id_genero              == ''           || musicaGenero.id_genero    == undefined    || musicaGenero.id_genero == null || isNaN(musicaGenero.id_genero) || musicaGenero.id_genero<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultgenero = await musicaGeneroDAO.insertMusicaGenero(musicaGenero)

                    if(resultgenero)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarMusicaGenero = async function(id, musicaGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                 == ''            || id                       == undefined        || id                       == null  || isNaN(id)  || id  <= 0   ||
                    musicaGenero.id_musica             == ''            || musicaGenero.id_musica       == undefined    || musicaGenero.id_musica   == null  || isNaN( musicaGenero.id_musica  )   ||  musicaGenero.id_musica   <=0 ||
                    musicaGenero.id_genero             == ''            ||  musicaGenero.id_genero      == undefined    || musicaGenero.id_genero   == null  || isNaN( musicaGenero.id_genero  )   ||  musicaGenero.id_genero   <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultgenero = await musicaGeneroDAO.selectByIdMusicaGenero(parseInt(id))

                    if(resultgenero != false || typeof(resultgenero) == 'object'){
                        if(resultgenero.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            genero.id = parseInt(id)

                            let result = await musicaGeneroDAO.updateMusicaGenero(musicaGenero)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const excluirMusicaGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultgenero = await musicaGeneroDAO.selectByIdMusicaGenero(parseInt(id))

            if(resultgenero != false || typeof(resultgenero) == 'object'){
                //Se existir, faremos o delete
                if(resultgenero.length > 0){
                    //delete
                    let result = await musicaGeneroDAO.deleteMusicaGenero(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarMusicaGenero = async function(){
    try {
        //Objeto do tipo JSON
        let dadosgenero = {}
        //Chama a função para retornar os generos cadastrados
        let resultgenero = await musicaGeneroDAO.selectAllMusicaGenero()

        if(resultgenero != false || typeof(resultgenero) == 'object'){
            if(resultgenero.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosgenero.status = true
                dadosgenero.status_code = 200
                dadosgenero.items = resultgenero.length
                dadosgenero.music = resultgenero

                return dadosgenero
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarMusicaGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosgenero = {}

            let resultgenero = await musicaGeneroDAO.selectByIdMusicaGenero(parseInt(id))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os generos relacionados a um filme
const buscarGeneroPorMusica = async function(idMusica){
    try {
        if(idMusica == '' || idMusica == undefined || idMusica == null || isNaN(idMusica) || idMusica <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosgenero = {}

            let resultgenero = await musicaGeneroDAO.selectByIdMusicaGenero (parseInt(idMusica))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}





module.exports = {
    inserirMusicaGenero,
    atualizarMusicaGenero,
    excluirMusicaGenero,
    listarMusicaGenero,
    buscarMusicaGenero,
    buscarGeneroPorMusica
} 