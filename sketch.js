var fundoFase1;
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


function preload(){
fundoFase1 = loadImage("805197.jpg");
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
  background(fundoFase1);  
  if(playerCount == 2){
    game.updateGame(1);
    
      }
      if(gameState == 1){
    game.fase1();
    game.display();
      }
      if(gameState == 2){
    game.updateGame(2);
      }
  //drawSprites();
}
