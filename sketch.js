var fundoFase1;
var naveJogador1,naveJogador2;
var jogador1,jogador2;
var gameState;
var playerCount;
var game;
var database;
var form;
var player;



function preload(){
fundoFase1 = loadImage("805197.jpg");
naveJogador1 = loadImage("nave1.png");
naveJogador2 = loadImage("nave2.png");
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
  /*if(playerCount == 2){
    game.updateGame(1);
    
      }
      if(gameState == 1){
    game.play();
    game.display();
      }*/
  drawSprites();
}
