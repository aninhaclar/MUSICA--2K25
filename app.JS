/************************************************************************************************ 
 * Objetivo: Criar uma API para realizar uma integração com o banco de dados
 * Data:     11.02.2025
 * Autor:    Ana Pires 
 * Versão:   1.0
 * Observações:
 *** Para criar a API precisa instalar:
 *     express        (npm install express --save)
 *     cors           (npm install cors --save)
 *     body-parser    (npm install body-parser --save)
 *** Para criar a conexão com o banco de dados precisa instalar:
 *     prisma         (npm install prisma --save)
 *     @prisma/client (npm install @prisma/client --save)
 *** Prima migrate
 *     prisma migrate-dev            (npx prisma migrate-dev)
 * Após a instalação do prisma e @prisma/client, devemos:
 *        npx prisma init   Para inicializar o prisma no projeto
 * Após esse comando você deverá configurar o .env e o schema.prisma, e rodar o comendo:
 *        npx prisma migrate dev
************************************************************************************************/

const express = require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');

//Import das controllers do projeto
const controllerMusica = require('./CONTROLLER/musica/controllermusica');
const controllerGravadora = require('./CONTROLLER/musica/controllergravadora');
const controllerAlbum = require('./CONTROLLER/musica/controlleralbum');
const controllerArtista = require('./CONTROLLER/musica/controllerartistas');
const controllerGenero = require('./CONTROLLER/musica/controllergenero');
const controllerPlaylist = require('./CONTROLLER/musica/controllerplaylist');

//Cria um objeto para o body do tipo JSON
const bodyParserjson = bodyParser.json();

const app = express();

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    app.use(cors());
    next();
});

// Endpoints da Música
app.post('/v1/controle-musicas/musica', cors(), bodyParserjson, async function(request,response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultMusica = await controllerMusica.inserirMusica(dadosBody, contentType);
    response.status(resultMusica.status_code);
    response.json(resultMusica);
});

app.get('/v1/controle-musicas/musicaLista', cors(), async function(request, response){
    let resultMusica = await controllerMusica.listarMusica();
    response.status(resultMusica.status_code);
    response.json(resultMusica);
});

app.get('/v1/controle-musicas/musicaFiltroID/:id', cors(), async function(request, response) {
    let idMusica = request.params.id;
    let resultMusica = await controllerMusica.buscarMusica(idMusica);  
    response.status(resultMusica.status_code);
    response.json(resultMusica); 
});

app.delete('/v1/controle-musicas/musica/:id', cors(), async function(request, response){
    let idMusica = request.params.id;
    let resultMusica = await controllerMusica.excluirMusica(idMusica);
    response.status(resultMusica.status_code);
    response.json(resultMusica);
});

app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserjson, async function (request, response){
    let contentType = request.headers['content-type'];
    let idMusica = request.params.id;
    let dadosBody = request.body;
    let resultMusica = await controllerMusica.atualizarMusica(idMusica, dadosBody, contentType);
    response.status(resultMusica.status_code);
    response.json(resultMusica);
});

// Endpoints da Gravadora
app.post('/v1/controle-gravadoras/gravadora', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultGravadora = await controllerGravadora.inserirGravadora(dadosBody, contentType);
    response.status(resultGravadora.status_code);
    response.json(resultGravadora);
});

app.get('/v1/controle-gravadoras/gravadoraLista', cors(), async function(request, response) {
    let resultGravadora = await controllerGravadora.listarGravadora();
    response.status(resultGravadora.status_code);
    response.json(resultGravadora);
});

app.get('/v1/controle-gravadoras/gravadoraFiltroID/:id', cors(), async function(request, response) {
    let idGravadora = request.params.id;
    let resultGravadora = await controllerGravadora.buscarGravadora(idGravadora);
    response.status(resultGravadora.status_code);
    response.json(resultGravadora);
});

app.delete('/v1/controle-gravadoras/gravadora/:id', cors(), async function(request, response) {
    let idGravadora = request.params.id;
    let resultGravadora = await controllerGravadora.excluirGravadora(idGravadora);
    response.status(resultGravadora.status_code);
    response.json(resultGravadora);
});

app.put('/v1/controle-gravadoras/gravadora/:id', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let idGravadora = request.params.id;
    let dadosBody = request.body;
    let resultGravadora = await controllerGravadora.atualizarGravadora(idGravadora, dadosBody, contentType);
    response.status(resultGravadora.status_code);
    response.json(resultGravadora);
});

// Endpoints do Álbum
app.post('/v1/controle-albuns/album', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultAlbum = await controllerAlbum.insertAlbum(dadosBody, contentType);
    response.status(resultAlbum.status_code);
    response.json(resultAlbum);
});

app.get('/v1/controle-albuns/albumLista', cors(), async function(request, response) {
    let resultAlbum = await controllerAlbum.listarAlbum();
    response.status(resultAlbum.status_code);
    response.json(resultAlbum);
});

app.get('/v1/controle-albuns/albumFiltroID/:id', cors(), async function(request, response) {
    let idAlbum = request.params.id;
    let resultAlbum = await controllerAlbum.buscarAlbum(idAlbum);
    response.status(resultAlbum.status_code);
    response.json(resultAlbum);
});

app.delete('/v1/controle-albuns/albumdelete/:id', cors(), async function(request, response) {
    let idAlbum = request.params.id;
    let resultAlbum = await controllerAlbum.excluirAlbum(idAlbum);
    response.status(resultAlbum.status_code);
    response.json(resultAlbum);
});

app.put('/v1/controle-albuns/albumupdate/:id', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let idAlbum = request.params.id;
    let dadosBody = request.body;
    let resultAlbum = await controllerAlbum.atualizarAlbum(idAlbum, dadosBody, contentType);
    response.status(resultAlbum.status_code);
    response.json(resultAlbum);
});

// Endpoints do Artista
app.post('/v1/controle-artistas/artista', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultArtista = await controllerArtista.inserirArtista(dadosBody, contentType);
    response.status(resultArtista.status_code);
    response.json(resultArtista);
});

app.get('/v1/controle-artistas/artistaLista', cors(), async function(request, response) {
    let resultArtista = await controllerArtista.listarArtista();
    response.status(resultArtista.status_code);
    response.json(resultArtista);
});

app.get('/v1/controle-artistas/artistaFiltroID/:id', cors(), async function(request, response) {
    let idArtista = request.params.id;
    let resultArtista = await controllerArtista.buscarArtista(idArtista);
    response.status(resultArtista.status_code);
    response.json(resultArtista);
});

app.delete('/v1/controle-artistas/artista/:id', cors(), async function(request, response) {
    let idArtista = request.params.id;
    let resultArtista = await controllerArtista.excluirArtista(idArtista);
    response.status(resultArtista.status_code);
    response.json(resultArtista);
});

app.put('/v1/controle-artistas/artista/:id', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let idArtista = request.params.id;
    let dadosBody = request.body;
    let resultArtista = await controllerArtista.atualizarArtista(idArtista, dadosBody, contentType);
    response.status(resultArtista.status_code);
    response.json(resultArtista);
});

// Endpoints do Gênero
app.post('/v1/controle-generos/genero', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType);
    response.status(resultGenero.status_code);
    response.json(resultGenero);
});

app.get('/v1/controle-generos/generoLista', cors(), async function(request, response) {
    let resultGenero = await controllerGenero.listarGenero();
    response.status(resultGenero.status_code);
    response.json(resultGenero);
});

app.get('/v1/controle-generos/generoFiltroID/:id', cors(), async function(request, response) {
    let idGenero = request.params.id;
    let resultGenero = await controllerGenero.buscarGenero(idGenero);
    response.status(resultGenero.status_code);
    response.json(resultGenero);
});

app.delete('/v1/controle-generos/genero/:id', cors(), async function(request, response) {
    let idGenero = request.params.id;
    let resultGenero = await controllerGenero.excluirGenero(idGenero);
    response.status(resultGenero.status_code);
    response.json(resultGenero);
});

app.put('/v1/controle-generos/genero/:id', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let idGenero = request.params.id;
    let dadosBody = request.body;
    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType);
    response.status(resultGenero.status_code);
    response.json(resultGenero);
});

// Endpoints da Playlist
app.post('/v1/controle-playlists/playlist', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let resultPlaylist = await controllerPlaylist.inserirPlaylist(dadosBody, contentType);
    response.status(resultPlaylist.status_code);
    response.json(resultPlaylist);
});

app.get('/v1/controle-playlists/playlistLista', cors(), async function(request, response) {
    let resultPlaylist = await controllerPlaylist.listarPlaylist();
    response.status(resultPlaylist.status_code);
    response.json(resultPlaylist);
});

app.get('/v1/controle-playlists/playlistFiltroID/:id', cors(), async function(request, response) {
    let idPlaylist = request.params.id;
    let resultPlaylist = await controllerPlaylist.buscarPlaylist(idPlaylist);
    response.status(resultPlaylist.status_code);
    response.json(resultPlaylist);
});

app.delete('/v1/controle-playlists/playlist/:id', cors(), async function(request, response) {
    let idPlaylist = request.params.id;
    let resultPlaylist = await controllerPlaylist.excluirPlaylist(idPlaylist);
    response.status(resultPlaylist.status_code);
    response.json(resultPlaylist);
});

app.put('/v1/controle-playlists/playlist/:id', cors(), bodyParserjson, async function(request, response) {
    let contentType = request.headers['content-type'];
    let idPlaylist = request.params.id;
    let dadosBody = request.body;
    let resultPlaylist = await controllerPlaylist.atualizarPlaylist(idPlaylist, dadosBody, contentType);
    response.status(resultPlaylist.status_code);
    response.json(resultPlaylist);
});

app.listen(8080, function(){
    console.log('API aguardando requisições...');
});
