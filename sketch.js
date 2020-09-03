var trex,trexImage;
var grounImage,ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup,cloudsGroup;
var score,obstacle;


function preload(){
trexImage = loadImage("trex.png");  

 
}



function setup() {
  createCanvas(windowWidth,windowHeight);
 
  trex = createSprite(50,height-70,200,200);
  trex.addImage("running", trexImage);
  trex.scale=0.5
  trex.setCollider("rectangle",0,0,160,190)
  

  
  
  
  ground = createSprite(width/2,height-10,width,125);
  ground.x = ground.width /2;
  ground.shapeColor="brown";
  ground.velocityX=-2;
  ground.scale=2;
  
  obstaclesGroup=new Group()
  cloudsGroup=new Group()
  
  score=0

}

function draw(){
  if(gameState === PLAY){
  background("white");
  text("Score: "+ score, 500,50);
  score = score + Math.round(getFrameRate()/60);
  trex.collide(ground);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
     if(touches.lenght>0||keyDown("space")&& trex.y >= 300) {
        trex.velocityY = -12;
        touches=[];
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
     if(obstaclesGroup.isTouching(trex)){
      gameState = END;
     }
    spawnClouds() 
    spawnObstacles()
    drawSprites()
  }
  if (gameState==END){
    fill("black");
    text("Press Space to restart or touch screen for mobile ",200,200)
    if(keyDown("space")) {
      reset();
      }
    if(touches.lenght>0) {
      
        reset();
      touches=[];
    }
  }
   
}

  function spawnObstacles(){
 if (frameCount % 60 === 0){
   obstacle = createSprite(600,height-155,10,40)
   obstacle.velocityX = -(6 + score/100);
   obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.shapeColor="green" 
              break;
      case 2: obstacle.shapeColor="yellow" 
              break;
     default: break;         
  
  
    }
}
  }
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,90,30);
    cloud.y = Math.round(random(80,120));
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.shapeColor="lightblue";
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
     cloud.depth = trex.depth;
    cloud.depth = cloud.depth -1;
  
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function reset(){
 //change gamestate
 gameState=PLAY;
 //visible=false
// destroy cloud and obstacle
  cloudsGroup.destroyEach();
 obstaclesGroup.destroyEach();
 score=0;
}
