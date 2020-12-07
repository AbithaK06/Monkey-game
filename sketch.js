var PLAY = 1;
var END = 0;
var gameState = PLAY;

var survivalTime = 0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var flag = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyImage = loadImage("sprite_0.png");
  gameoverImage = loadImage("gameover.png");
}



function setup() {
obstacle=null;
monkey = createSprite(70,318,10,10);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;
monkey.setCollider("circle",0,0,330);
monkey.debug = false;
  
ground = createSprite(400,350,900,10);
ground.velocityX = -4;
ground.x = ground.width/2;
console.log(ground.x);
  
gameover = createSprite(180,200,20,20);
gameover.addImage(gameoverImage);
 

  
obstacleGroup = createGroup();
foodGroup     = createGroup();
}


function draw() {
  background("lightblue");
  
  if (gameState ===PLAY){
    gameover.visible = false;
    spawnObstacles();
    spawnBanana();
    
    if(ground.x<0){
    ground.x = ground.width/2;
    } 
     if(keyDown("space")&& monkey.y>=300){
    monkey.velocityY = -12;
    console.log(monkey.y);
     }
    
      monkey.velocityY = monkey.velocityY+0.8;
    
     stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:" + survivalTime,100,50);

    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
   }
  
  else if (gameState === END) {
    gameover.visible = true;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.destroy();
    ground.destroy();
  }

   monkey.collide(ground);
  
  
 
  drawSprites();
  
}

function spawnObstacles(){
 if (frameCount % 300=== 0){
   obstacle = createSprite(400,330,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6 ;
   obstacle.lifetime = 100; 
   obstacle.scale=0.1;
   obstacle.setCollider("circle",0,0,330);
   obstacle.debug = false;
   obstacleGroup.add(obstacle);
 }
}

function spawnBanana(){
 if (frameCount % 80=== 0){
   banana = createSprite(400,200,10,40);
   banana.addImage(bananaImage);
   banana.velocityX = -6 ;
   banana.lifetime = 100; 
   banana.scale=0.1;
   foodGroup.add(banana);
   
 }
}




