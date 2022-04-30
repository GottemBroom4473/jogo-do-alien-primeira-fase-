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

  jogador1 = createSprite(400, 200, 50, 50);
  jogador1.addImage(naveJogador1);
  jogador1.scale = 0.3;
  jogador2 = createSprite(600, 200, 50,50)
  jogador2.addImage(naveJogador2);
  jogador2.scale = 0.6;
  
  playerCount = player.getCount();

}

  play(){
  form.hide();

var linhaChegada = height*5.5;

  Player.getplayerInfo();
  player.getRanking();

  if(allPlayers !== undefined){
    image(imgPista,0,-height*5,width,height*5.5);
    var caneta = 0;
    this.funcaoA();
    for(var j in allPlayers){
      caneta = caneta + 1;
      var x = allPlayers[j].positionX;
      var y = -allPlayers[j].positionY +(height/2-150);

      carro[caneta -1].position.x = x;
      carro[caneta -1].position.y = y;

    if(caneta == player.classificate){

    this.barraDeVida();
    this.barraDeGasolina();

    if(player.classificate == 1 ){
      //camera.position.x = carro[caneta -1].position.x +350;
      camera.position.y = carro[caneta -1].position.y -400;
      
    }
else{
  //camera.position.x = carro[caneta -1].position.x -350;
  camera.position.y = carro[caneta -1].position.y -400;
}

      fill("orange");
      stroke(20);
      ellipse(x,y,200,200);
      this.colisaoComMoedas(caneta);
      this.colisaoNaGasolina(caneta);
      this.colisaoNosObstaculos(caneta);
      }
    }
  }
  this.moveCarros();

if(player.positionY >= linhaChegada){
gameState = 2;
player.ranking += 1;
player.updateRanking(player.ranking);
player.update();
this.voceGanhou();
}
/*else if(player.positionY >= linhaChegada && player.ranking == 2){
gameState = 2;
player.ranking += 2;
player.updateRanking(player.ranking);
player.update();
this.vocePerdeu();
}*/


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
  moveCarros(){
    if(keyIsDown(UP_ARROW)){
      player.positionY = player.positionY + 5;
      player.update();
      this.movendo = true;
    }
    else{
      this.movendo = false;
    }
    if(keyIsDown(RIGHT_ARROW) && player.positionX < 1376){
      player.positionX = player.positionX + 5;
      player.update();
      this.movendo = true;
    }
    else{
      this.movendo = false;
    }
   if(keyIsDown(LEFT_ARROW) && player.positionX > 691){
      player.positionX = player.positionX - 5;
      player.update();
      this.movendo = true;
    }
    else{
      this.movendo = false;
    }
    
  }

  criarSprites(group,number,image,scale){
    for(var a = 0;a < number;a++){

  var x = Math.round(random(691,1376));
  var y = Math.round(random(-height*5,height*6));

  var objeto = createSprite(x,y);
  objeto.addImage(image);
  objeto.scale = scale;
  group.add(objeto);
    }
  }

  colisaoComMoedas(indice){
    carro[indice-1].overlap(moedas,function(collector,collected){
      player.pontuacao++;
      collected.remove();
      player.update();
    });
  }

  colisaoNaGasolina(indice){
  carro[indice-1].overlap(gasolina,function(collector,collected){
    player.combustivel = 200;
    collected.remove();
  });
  if(player.combustivel > 0 && this.movendo == true){
    player.combustivel -= 0.25
    }
  if(player.combustivel <= 0){
  gameState = 2;
  this.vocePerdeu();
  }
  }

  colisaoNosObstaculos(indice){
    carro[indice-1].overlap(obstaculos,function(collector,collected){
      player.vida -= 25;
      collected.remove();
    });
    if(player.vida <= 0){
    gameState = 2;
    this.vocePerdeu();
    }
  }

  voceGanhou(){
    swal({
      title:"RECEBA",
      text:"RECEBA voce ganhou meus parabens!!VOCE E O MELHOR,MAGNIFICO",
      imageUrl:"https://img.olhardigital.com.br/wp-content/uploads/2022/03/luva-846x450.jpeg",
      imageSize:"350x350",
      confirmButtonText:"Vamos Para Outra"
    });
  }

vocePerdeu(){
  swal({
    title:"PERDEU KJKJKJKJK",
    text:"TALVEZ VOCE GANHE NA PROXIMA VOCE CONSEGUE",
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcGEfx4lOUAaogZphfVQ7nBdJhMHLUGyDPhFRFbk3tLMluuhQg3R4CrzVPO8G-ZYlMyzU&usqp=CAU",
    imageSize:"350x350",
    confirmButtonText:"Tenta de novo"
  });
}
  
barraDeVida(){
image(imgVida,400,-player.positionY,60,60);
rect(400,-player.positionY-100,40,player.vida);
}

barraDeGasolina(){
  image(imgGasolina,200,-player.positionY,60,60);
  rect(200,-player.positionY-200,40,player.combustivel);
}

}