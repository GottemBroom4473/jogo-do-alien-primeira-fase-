class Inimigos2 {
    constructor() {

    this.classificate = null; 
  
    this.positionX = 0; 
 
    }
    
    addInimigo(){
  var playerIndex = "inimigos2/inimigo"+this.classificate;
  
  if(this.classificate==0){
       this.positionX = width/2+750 }
        if(this.classificate==1){
             this.positionX = windowWidth - 100 }
              if(this.classificate==2){
                   this.positionX = width/2-200 }
                    if(this.classificate==3){
                         this.positionX = width/2-350 }
                          if(this.classificate==4){
                               this.positionX = width/2-500 }
                                if(this.classificate==5){
                                     this.positionX = width/2+150 } 
                                     if(this.classificate==6){
                                          this.positionX = width/2+300 } 
                                          if(this.classificate==7){
                                               this.positionX = width/2+450 }
                                                if(this.classificate==8){
                                                     this.positionX = width/+600 }
                                                      if(this.classificate==9){
                                                           this.positionX = width/2 }
  
  database.ref(playerIndex).set({
    positionX: this.positionX
    
  });
    }
    static getInimigoInfo(){
      var parado = database.ref("inimigos2");
      parado.on("value",data => {
        allInimigos2 = data.val();
      });
    }
    updateInimigo(){
      var jogue = "inimigos2/inimigo" + this.classificate;
      database.ref(jogue).update({
        positionX: this.positionX
      })
    }
    
  }