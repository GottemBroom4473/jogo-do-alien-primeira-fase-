class Form {
  constructor() {
  this.input = createInput("").attribute("placeholder","Digite o seu nome");
  this.playButton = createButton("let's go!!");
  this.title = createElement("h1");
  this.greeting = createElement("h2");
  }
  display(){
    this.arrumarPos();
    this.estilo();
    this.mouse();
  }
  arrumarPos(){
    this.input.position(width/2-225,height/2-100);
    this.playButton.position(width/2-100,height/2);
    this.title.position(width/2-300 ,height/2-300);
    this.greeting.position(width/2-300,height/2-100);
  }
  estilo(){
    this.playButton.class("customButton");
    this.input.class("customInput");
    this.greeting.class("greeting");
    this.title.class("greeting");
    this.title.html(" ALIEN ATTACK ");

  }
  mouse(){
    this.playButton.mousePressed(()=>{
      this.input.hide();
      this.playButton.hide();
      var mensagem = "ESPERANDO PARCEIRO...";
      this.greeting.html(mensagem);
      playerCount = playerCount + 1;
      for(var h = 0;h < 10; h++){
      inimigo.classificate = h;
      inimigo.addInimigo();
      }
      player.nome = this.input.value();
      player.classificate = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
    });
  }
  hide(){
    this.input.hide();
    this.playButton.hide();
    this.greeting.hide();
    this.title.hide();
  }
}
