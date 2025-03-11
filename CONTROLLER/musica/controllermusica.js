/*****************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a Model (Crud de dados)
 *  Validações, tratamento de dados, etc...
 * Data:     18.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
*****************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../Modulo/config.js')
const musicaDAO = require('../../Model/DAO/musica.js')

//Função para inserir uma nova música
const inserirMusica = async function (musica, contentType) {
    
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
        if (musica.nome            == ''    ||  musica.nome            == null || musica.nome            == undefined  || musica.nome.lenght            > 100        ||
            musica.duracao         == ''    ||  musica.duracao         == null || musica.duracao         == undefined  || musica.duracao.lenght         > 8          ||
            musica.data_lancamento == ''    ||  musica.data_lancamento == null || musica.data_lancamento == undefined  || musica.data_lancamento.lenght > 10         ||
                                                                                  musica.letra           == undefined  ||
                                                                                  musica.link            == undefined  || musica.link.lenght            > 200 
  
      )
      {
          return message.ERROR_REQUIRED_FIELDS //Status code 400
      }else{
          //encaminhando os dados da musica para o DAO realizar o insert no BD
          let resultMusica = await musicaDAO.insertMusica(musica) 
  
          if(resultMusica)
              return message.SUCESS_CREATED_ITEM //Status code 201
          else
          return message.ERROR_INTERNAL_SERVER_MODEL  //Status code 500 
        }
    }else{
        return message.ERROR_CONTENT_TYPE //415
    }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //Status code 500 

    }
    
 

}

//Função para atualizar uma  música
const atualizarMusica = async function (id, musica, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
            if (musica.nome            == ''    ||  musica.nome            == null || musica.nome            == undefined  || musica.nome.length            > 100        ||
                musica.duracao         == ''    ||  musica.duracao         == null || musica.duracao         == undefined  || musica.duracao.lenght         > 8          ||
                musica.data_lancamento == ''    ||  musica.data_lancamento == null || musica.data_lancamento == undefined  || musica.data_lancamento.lenght > 10         ||
                                                                                      musica.letra           == undefined  ||
                                                                                      musica.link            == undefined  || musica.link.lenght            > 200        ||
                 id                    == ''    ||  id                    == null  || id                     == undefined  || isNaN                         (id)   
            
      
          )
          {
              return message.ERROR_REQUIRED_FIELDS //Status code 400
          }else{
            let result = await musicaDAO.selectByIdMusica(id)
            if(result != false && typeof(result) == 'object')
                if(result.length > 0){
                    //Update
    
                    //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                    musica.id = id 
                    let resultMusica = await musicaDAO.updateMusica(musica)
                    
                    if(resultMusica){
                        return
                    }else{
                        return message.SUCCESS_UPDATE_ITEM // 200
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
          }
    
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para excluir uma  música
const excluirMusica = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            //Antes de excluir, estamos verificando se existe esse ID
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                    //delete
                    let result = await musicaDAO.deleteMusica(id)

                    if(result)
                        return message.SUCCESS_DELETE_ITEM //200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    
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

// Função para retornar uma lista de músicas
const listarMusica = async function () {
try {

    //Objeto JSON
    let dadosMusica ={}
        //Chama a função para retornar as musicas do banco de dados
        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false){
        if(resultMusica.length > 0){
              
            //Cria um JSON para coloccar o ARRAY de músicas
            dadosMusica.status = true
            dadosMusica.status_code = 200,
            dadosMusica.items = resultMusica.length
            dadosMusica.musics = resultMusica
            return dadosMusica
    }else{
        return  message.ERROR_NOT_FOUND
    }
    }else{
        return message.ERROR_INTERNAL_SERVER_MODEL //500
    }
} catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}
}

// Função para retornar uma música pelo ID
const buscarMusica = async function (id) {
    try {
        if(id  == '' || id  == undefined || id  == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // 400 // adicionamos apenas o tratamento do ID
        }else{ 
        //Objeto JSON
        let dadosMusica ={}

            //Chama a função para retornar as musicas do banco de dados
            let resultMusica = await musicaDAO.selectByIdMusica(id)
            if(resultMusica != false || typeof(resultMusica) == 'object'){
            if(resultMusica.length > 0){
                  
                //Cria um JSON para coloccar o ARRAY de músicas
                dadosMusica.status = true
                dadosMusica.status_code = 200,
                dadosMusica.musics = resultMusica

                return dadosMusica
        }else{
            return  message.ERROR_NOT_FOUND
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}