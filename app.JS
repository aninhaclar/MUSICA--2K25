/************************************************************************************************ 
 * Objetivo: Criar uma API paa realizar uma integração com o banco de dados
 * Data:     11.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
 * Observações:
 *** Para criar a API precisa instalar
 *     express        (npm install express --save)
 *     cors           (npm install cors --save )
 *     body-parser    ( npm install body-parser  --save)
 *** Para criar a conexão com banco de dados precisa instalar:
 *     prisma         (npm install prisma --save)
 *     @prisma/client (npm install @prisma/client --save)
 *** Prima migrate
 *     prisma migrate-dev            (npx prisma migrate-dev)
 * Após a instalação do prisma e @prisma/client, devemos:
 *        npx prima init   Para inicializar o prisma no projeto
 * Após esse comando você deverá configurar o .env e o schema.prisma, e rodar o comendo:
 *        npx prisma migrate dev
************************************************************************************************/

const express = require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');

//Import das controllers do projeto
const controllerMusica = require('./CONTROLLER/musica/controllermusica')

//Cria um objeto para o body do tipo JSON
const bodyParserjson = bodyParser.json()

const app = express()

app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*');
    response.header('Acess-Control-Allow-MethodsOPTIONS', 'GET, POST, PUT, DELETE ');

    app.use(cors())

    next()
})

// Endpoint para controlar a música
app.post('/v1/controle-musicas/musica', cors(), bodyParserjson, async function(request,response) {

    //Recebe o content type da requisição
    let contentType = request.headers['contentType']

    // console.log (request.headers)

    let dadosBody = request.body

    //Chama a função da conroller para inserir os dados e aguardo o retorno da função
    let resultMusica = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.get('/v1/controle-musicas/musicaLista', cors(), async function(request, response){
    let resultMusica = await controllerMusica.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
} )


app.get('/v1/controle-musicas/musicaFiltroID/:id', cors(), async function(request, response) {
    let idMusica = request.params.id

    let resultMusica = await controllerMusica.buscarMusica(idMusica);  

        response.status(resultMusica.status_code)
        response.json(resultMusica) 
    
});

app.delete('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    //Recebe o ID
    let idMusica = request.params.id

    //Chama a função
    let resultMusica = await controllerMusica.excluirMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserjson, async function (request, response){

    //Recebe o contentType da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID da musica
    let idMusica = request.params.id

    //Reecebe os dados do corpo da requisição
    let dadosBody = request.body

    //Chama a função e encaminha os argumentos de ID, body e contentType
    let resultMusica = await controllerMusica.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
app.listen(8080, function(){
    console.log('API aguardando requisições...')
})
