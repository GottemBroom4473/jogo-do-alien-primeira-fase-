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
    var jogadores = Object.values(allPlayers);
    this.jogador1.html(jogadores[0].nome + " :" + jogadores[0].pontuacao);
    this.jogador2.html(jogadores[1].nome + " :" + jogadores[1].pontuacao);
  }
  arrumarPos(){
  this.resetBut.position(width-250,height -100);
  this.jogador1.position(400,550);
  this.jogador2.position(400,500);
  this.tabela.position(200,600);
  }
  estilo(){
    this.resetBut.class("customButton");
    this.tabela.class("resetText");
    this.jogador1.class("leadersText");
    this.jogador2.class("leadersText");
  }
  mouse(){
    this.resetBut.mousePressed(()=>{
      database.ref("/").set({
        gameState:0,
        playerCount:0,
        jogadores:{},
        ranking: 0
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
  form = new Form();
  form.display();

  player = new Player();

  jogador1 = createSprite(500, 500, 50, 50);
  jogador1.addImage(naveJogador1);
  jogador1.scale = 0.3;
  jogador2 = createSprite(700, 500, 50,50)
  jogador2.addImage(naveJogador2);
  jogador2.scale = 0.6;
  grupoNaves = [jogador1,jogador2];


  playerCount = player.getCount();

}

fase1(){
  form.hide();

Player.getplayerInfo();

  var indice = 0;
  for(var i in allPlayers){
    var x = allPlayers[i].positionX;
    grupoNaves[indice].position.x = x;
    indice++;
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

  criarInimigos(group,number,image,scale){
    for(var a = 0;a < number;a++){

  var x = Math.round(random(691,1376));
  var y = Math.round(random(-height*5,height*6));

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



}