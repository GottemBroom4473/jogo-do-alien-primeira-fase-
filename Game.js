class Game {
  constructor() {
    this.resetBut = createButton("REINICIAR");
    this.fimTxt = createElement("h1");
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
  if(zeroUm >= 40){
gameState = 2;
  }
  if(zeroUm >= 100){
gameState = 3;
  }

    }
    
  }
  arrumarPos(){
  this.resetBut.position(width-250,height -100);
  this.jogador1.position(width/2+150,height - 150);
  this.tabela.position(width/2-100,height -150);
  }
  arrumarPos2(){
    this.fimTxt.position(width/2-300 ,height/2-300);
    this.estilo();
    this.fimTxt.html("VOCE SALVOU A GALAXIA, PARABENS");
  }
  estilo(){
    this.resetBut.class("customButton");
    this.tabela.class("resetText");
    this.jogador1.class("resetText");
    this.fimTxt.class("greeting");
  }
  mouse(){
    this.resetBut.mousePressed(()=>{
      database.ref("/").set({
        gameState:0,
        playerCount:0,
        inimigos:{},
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
  grupoInimigo2 = new Group();
  grupoTiros = new Group();
  form = new Form();
  form.display();


  player = new Player();
  inimigo = new Inimigos();

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
      x:width/2 + 750,
      y:200
    },
    {
      x:windowWidth -100,
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
      x:width/2 -500,
      y:200
    },
    {
      x:width/2+150,
      y:200
    },{
      x:width/2+300,
      y:200
    },
    {
      x:width/2+450,
      y:200
    },
    {
      x:width/2 + 600,
      y:200
    },
    {
      x:width/2,
      y:200
    },
  ];

  this.criarInimigos(grupoInimigo,10,imgAlien,0.2,posicoes);

  
}

fase1(){
  form.hide();

Player.getplayerInfo();
Inimigos.getInimigoInfo();
this.funcaoA();


  var ymdyze = 0;
  for(var i in allInimigos){
    if(grupoInimigo[ymdyze]){
      var x = allInimigos[i].positionX;
      grupoInimigo[ymdyze].position.x = x;
      ymdyze++;
    }
  }
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
    player.pontuacao += 5;
    player.update();

    if(collected.position.x == width/2 + 750 ){
inimigo.classificate = 0;
inimigo.positionX = width * 2;
inimigo.updateInimigo();
    }
    if(collected.position.x == windowWidth -100 ){
      inimigo.classificate = 1;
      inimigo.positionX = width * 2;
      inimigo.updateInimigo();
          }
          if(collected.position.x == width/2 -200 ){
            inimigo.classificate = 2;
            inimigo.positionX = width * 2;
            inimigo.updateInimigo();
                }
                if(collected.position.x == width/2 -350 ){
                  inimigo.classificate = 3;
                  inimigo.positionX = width * 2;
                  inimigo.updateInimigo();
                      }
                      if(collected.position.x == width/2 - 500 ){
                        inimigo.classificate = 4;
                        inimigo.positionX = width * 2;
                        inimigo.updateInimigo();
                            }
                            if(collected.position.x == width/2 + 150 ){
                              inimigo.classificate = 5;
                              inimigo.positionX = width * 2;
                              inimigo.updateInimigo();
                                  }
                                  if(collected.position.x == width/2 + 300 ){
                                    inimigo.classificate = 6;
                                    inimigo.positionX = width * 2;
                                    inimigo.updateInimigo();
                                        }
                                        if(collected.position.x == width/2 + 450 ){
                                          inimigo.classificate = 7;
                                          inimigo.positionX = width * 2;
                                          inimigo.updateInimigo();
                                              }
                                              if(collected.position.x == width/2 + 600 ){
                                                inimigo.classificate = 8;
                                                inimigo.positionX = width * 2;
                                                inimigo.updateInimigo();
                                                    }
                                                    if(collected.position.x == width/2 ){
                                                      inimigo.classificate = 9;
                                                      inimigo.positionX = width * 2;
                                                      inimigo.updateInimigo();
                                                          }
  });
  
}
destroiAliens2(){
  grupoTiros.overlap(grupoInimigo2, function(collector,collected){
    player.pontuacao += 5;
    player.update();

    if(collected.position.x == width/2 + 750 ){
inimigo2.classificate = 0;
inimigo2.positionX = width * 2;
inimigo2.updateInimigo();
    }
    if(collected.position.x == windowWidth -100 ){
      inimigo2.classificate = 1;
      inimigo2.positionX = width * 2;
      inimigo2.updateInimigo();
          }
          if(collected.position.x == width/2 -200 ){
            inimigo2.classificate = 2;
            inimigo2.positionX = width * 2;
            inimigo2.updateInimigo();
                }
                if(collected.position.x == width/2 -350 ){
                  inimigo2.classificate = 3;
                  inimigo2.positionX = width * 2;
                  inimigo2.updateInimigo();
                      }
                      if(collected.position.x == width/2 - 500 ){
                        inimigo2.classificate = 4;
                        inimigo2.positionX = width * 2;
                        inimigo2.updateInimigo();
                            }
                            if(collected.position.x == width/2 + 150 ){
                              inimigo2.classificate = 5;
                              inimigo2.positionX = width * 2;
                              inimigo2.updateInimigo();
                                  }
                                  if(collected.position.x == width/2 + 300 ){
                                    inimigo2.classificate = 6;
                                    inimigo2.positionX = width * 2;
                                    inimigo2.updateInimigo();
                                        }
                                        if(collected.position.x == width/2 + 450 ){
                                          inimigo2.classificate = 7;
                                          inimigo2.positionX = width * 2;
                                          inimigo2.updateInimigo();
                                              }
                                              if(collected.position.x == width/2 + 600 ){
                                                inimigo2.classificate = 8;
                                                inimigo2.positionX = width * 2;
                                                inimigo2.updateInimigo();
                                                    }
                                                    if(collected.position.x == width/2 ){
                                                      inimigo2.classificate = 9;
                                                      inimigo2.positionX = width * 2;
                                                      inimigo2.updateInimigo();
                                                          }
  });
  
}
fase2(){
  form.hide();
  if(flag == 0){
    grupoInimigo.destroyEach();
    grupoTiros.destroyEach();
    inimigo2 = new Inimigos2();
    for(var h = 0;h < 10; h++){
      inimigo2.classificate = h;
      inimigo2.addInimigo();
      }
  
    var posicoes = [
      {
        x:width/2 + 750,
        y:200
      },
      {
        x:windowWidth -100,
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
        x:width/2 -500,
        y:200
      },
      {
        x:width/2+150,
        y:200
      },{
        x:width/2+300,
        y:200
      },
      {
        x:width/2+450,
        y:200
      },
      {
        x:width/2 + 600,
        y:200
      },
      {
        x:width/2,
        y:200
      },
    ];
  
  
  
    this.criarInimigos(grupoInimigo2,10,imgNaveAlien,0.4,posicoes);
    flag = 1;
    
  }
Player.getplayerInfo();
Inimigos2.getInimigoInfo();
this.moveNaves();
this.funcaoA();
var ymdyze = 0;
for(var i in allInimigos2){
  if(grupoInimigo2[ymdyze]){
    var x = allInimigos2[i].positionX;
    grupoInimigo2[ymdyze].position.x = x;
    ymdyze++;
  }
}
  var indice = 0;
for(var i in allPlayers){
  var x = allPlayers[i].positionX;
  grupoNaves[indice].position.x = x;
  indice++;

 if(indice == player.classificate){
if(grupoTiros){
this.destroiAliens2();
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
  drawSprites();
}

fim(){
this.arrumarPos2();
this.funcaoA();  
}
}