var fundoFase1, fundoFase2,fundoFase3;
var allPlayers;
var naveJogador1,naveJogador2;
var jogador1,jogador2;
var imgNaveAlien,imgAlien;
var gameState;
var playerCount;
var game;
var database;
var form;
var player;
var grupoNaves = [];
var grupoInimigo;
var grupoTiros;
var contador = 0;
var allInimigos;
var inimigo;

function preload(){
fundoFase1 = loadImage("805197.jpg");
fundoFase2 = loadImage("931599.jpg");
fundoFase3 = loadImage("2868.jpg");
naveJogador1 = loadImage("nave1.png");
naveJogador2 = loadImage("nave2.png");
imgAlien = loadImage("alien.png");
imgNaveAlien = loadImage("naveAlien.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();
  game.estadoBancoDados();
}

function draw() {
   
  if(playerCount == 2){
    game.updateGame(1);
    
      }
      if(gameState == 0){
background(fundoFase1);

      }

      if(gameState == 1){
    background(fundoFase2); 
    game.fase1();
    game.display();
      }
      if(gameState == 2){
    background(fundoFase3);
    game.fase2();
    game.updateGame(2);
      }
  //drawSprites();
}
