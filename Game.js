class Game {
  constructor() {
    this.resetBut = createButton("REINICIAR");

    this.tabela = createElement("h2");
    this.jogador1 = createElement("h2");
    this.jogador2 = createElement("h2");

    this.movendo = false;
  }
  display(){
    this.arrumarPos();
    this.estilo();
    this.mouse();
    this.tabela.html("PLACAR:");

  }
  funcaoA(){
    if(allPlayers != undefined){
      var jogadores = Object.values(allPlayers);
      var zeroUm = jogadores[0].pontuacao + jogadores[1].pontuacao;
      this.jogador1.html(zeroUm);
  
     console.log(jogadores[0].pontuacao);
    }
    
  }
  arrumarPos(){
  this.resetBut.position(width-250,height -100);
  this.jogador1.position(width/2+150,height - 150);
  this.tabela.position(width/2-100,height -150);
  }
  estilo(){
    this.resetBut.class("customButton");
    this.tabela.class("resetText");
    this.jogador1.class("resetText");
  }
  mouse(){
    this.resetBut.mousePressed(()=>{
      database.ref("/").set({
        gameState:0,
        playerCount:0,
        jogadores:{}
      });
      window.location.reload();
    });
  }

  estadoBancoDados(){
  var estadoJogo = database.ref("gameState");
  estadoJogo.on("value",function(data){gameState = data.val()});
  //fazer pegar o valor atualizado do gameState
  }

start(){
  grupoInimigo = new Group();
  grupoTiros = new Group();
  form = new Form();
  form.display();


  player = new Player();

  jogador1 = createSprite(500, 500, 50, 50);
  jogador1.addImage(naveJogador1);
  jogador1.scale = 0.4;
  jogador2 = createSprite(700, 500, 50,50)
  jogador2.addImage(naveJogador2);
  jogador2.scale = 0.7;
  grupoNaves = [jogador1,jogador2];


  playerCount = player.getCount();

  var posicoes = [
    {
      x:windowWidth - 50,
      y:200
    },
    {
      x:width/2-200,
      y:200
    },
    {
      x:width/2-350,
      y:200
    },
    {
      x:width/2-500,
      y:200
    },
    {
      x:width/2+150,
      y:200
    },
    {
      x:width/2+300,
      y:200
    },{
      x:width/2+450,
      y:200
    },
    {
      x:width/+600,
      y:200
    },
    {
      x:width/2,
      y:200
    },
    {
      x:width/2+750,
      y:200
    },
  ];

  this.criarInimigos(grupoInimigo,10,imgAlien,0.2,posicoes);

  
}

fase1(){
  form.hide();

Player.getplayerInfo();
this.funcaoA();
this.testeFase2();

  var indice = 0;
  for(var i in allPlayers){
    var x = allPlayers[i].positionX;
    grupoNaves[indice].position.x = x;
    indice++;

   if(indice == player.classificate){
if(grupoTiros){
this.destroiAliens();
}
    if(player.classificate==1){
      if(keyDown("space")){
      if(frameCount % 10 == 0){
        var tiros = createSprite(x, 500, 5,10);
      tiros.shapeColor = "red";
      tiros.velocityY = -4;
      grupoTiros.add(tiros);
      }
    }
    }
    if(player.classificate==2){
    if(keyDown("space")){
      if(frameCount % 10 == 0){
      var tiros = createSprite(x, 550, 5,10);
      tiros.shapeColor = "red";
      tiros.velocityY = -4;
      grupoTiros.add(tiros);
      }
    }
  }

  }
  }


  this.moveNaves();
  
  drawSprites();
}
  updateGame(state){
    database.ref("/").update({gameState:state});
  }
  getState(){
    var joao = database.ref("gameState");
    joao.on("value",function(data){
      gameState = data.val();
    });
  }
  moveNaves(){
  
    
    if(keyIsDown(RIGHT_ARROW)){
      player.positionX = player.positionX + 5;
      player.update();
    }
    
   if(keyIsDown(LEFT_ARROW)){
      player.positionX = player.positionX - 5;
      player.update();

    }
    
    
  }

  criarInimigos(group,number,image,scale,posicoes = []){
    for(var a = 0;a < number;a++){
var x = posicoes[a].x;
var y = posicoes[a].y;
    

  var objeto = createSprite(x,y);
  objeto.addImage(image);
  objeto.scale = scale;
  group.add(objeto);
    }
  }
  
barraDeVida(){
image(imgVida,400,-player.positionY,60,60);
rect(400,-player.positionY-100,40,player.vida);
}

destroiAliens(){
  grupoTiros.overlap(grupoInimigo, function(collector,collected){
    collected.remove();
    player.pontuacao += 5;
    player.update();
    contador += 1;
  });
}
testeFase2(){
if(contador > 9){
gameState = 2;

}
};

}