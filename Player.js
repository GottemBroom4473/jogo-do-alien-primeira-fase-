class Player {
  constructor() {
  this.nome = null;
  this.classificate = null; 

  this.positionX = 0;
  this.positionY = 0;

  this.combustivel = 200;
  this.pontuacao = 0;

  this.ranking = 0; 

  this.vida = 100;
  }
  getCount(){
var contagem = database.ref("playerCount");
contagem.on("value",data =>{playerCount = data.val()})
}
  updateCount(count){
database.ref("/").update({playerCount:count})
}
  addPlayer(){
var playerIndex = "jogadores/jogador"+this.classificate;

if(this.classificate == 1){
this.positionX = width/3 + 10;
}
else{
  this.positionX = width/2 + 300;
}

database.ref(playerIndex).set({
  nome: this.nome,
  positionX: this.positionX,
  positionY: this.positionY,
  combustivel: this.combustivel,
  pontuacao: this.pontuacao,
  vida: this.vida
});
  }
  static getplayerInfo(){
    var parado = database.ref("jogadores");
    parado.on("value",data => {
      allPlayers = data.val();
    });
  }
  update(){
    var jogue = "jogadores/jogador" + this.classificate;
    database.ref(jogue).update({
      positionX: this.positionX,
      positionY: this.positionY,
      pontuacao: this.pontuacao,
      combustivel: this.combustivel,
      vida: this.vida
    })
  }
  getRanking(){
    var rank = database.ref("ranking");
rank.on("value",data =>{this.ranking = data.val()})
  }
  updateRanking(count){
    database.ref("/").update({ranking:count})
  }
}

