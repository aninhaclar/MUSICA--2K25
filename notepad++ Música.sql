

create database db_controle_musicas_aa;

use db_controle_musicas_aa;

show tables

create table tbl_musica (
      id     int not null primary key auto_increment,
      nome    varchar(100) not null,
      duracao      time not null,
      data_lancamento  date not null,
      letra        text,
      link     varchar(200)
      );
      
     
     
    create table tbl_reproducao (
      id     int not null primary key auto_increment,
      usuario    varchar(100) not null,
      musica      time not null,
      data  date not null,
      hora        text
      );
	  
	  create table tbl_pais (
      id     int not null primary key auto_increment,
	  nome varchar(80) not null
      );
	  
	  create table tbl_gravadora (
      id     int not null primary key auto_increment,
	  nome_gravadora varchar(70) not null,
	  ano_fundacao varchar(14) not null
      );
	  
	  create table tbl_album (
	  id int not null primary key auto_increment,
	  artista varchar(100) not null,
	  titulo varchar(90) not null,
	  ano_lancamento varchar(14)
	  )  
      
        create table tbl_usuarios (
      id     int not null primary key auto_increment,
      nome    varchar(100) not null,
      email  varchar(80) not null,
      senha varchar(35) not null,
	  data_cadastro date
      );
	  
	  create table tbl_artistas (
      id     int not null primary key auto_increment,
	  nome varchar(80) not null,
	  nacionalidade varchar(50)not null,
	  data_nascimento date
      );
	  
	  create table tbl_genero (
      id     int not null primary key auto_increment,
	  tipo varchar(55) not null
      );
	  
	  create table tbl_playlist (
	  id int not null primary key auto_increment,
	  nome  varchar(60) not null,
	  data_criacao date,
	  criador varchar(80)
	  )

select * from db_controle_musicas_aa
 