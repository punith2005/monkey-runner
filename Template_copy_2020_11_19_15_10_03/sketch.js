let ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
let PLAY=1;
let END=0;
let gamestate=1;
let endimage;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  endimage = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(700,200);
  ground=createSprite(350,195,700,10); 
 
  
  monkey=createSprite(50,170,20,20)
  ;
  monkey.addAnimation("image",monkey_running);
  monkey.scale=0.1;
 bananaGroup=new Group();
 obsGroup=new Group(); 
}


function draw() {
background("white");
  
   //console.log(monkey.y);
 if (gamestate===PLAY){
  ground.x = ground.width /2;
  ground.velocityX=-3;
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  scoring();
  bananas();
  obstacles ();
   if (keyDown("space") && monkey.y >= 159 ){
    monkey.velocityY=-15;
  }
  if (bananaGroup.isTouching(monkey)){
    score=score+1;
    bananaGroup.destroyEach;
  }
 if (obsGroup.isTouching(monkey)){
    gamestate=END;
  }
 
}
else if(gamestate===END){
  ground.velocityX=0;
  obsGroup.setLifetimeEach(-1);
 bananaGroup.setLifetimeEach(-1);
 obsGroup.setVelocityXEach(0);
 bananaGroup.setVelocityXEach(0);
 
 monkey.velocityX=0;
 monkey.addAnimation('image',endimage);
 monkey.velocityY=0;
}
 if(keyDown("Q")){
   reset();
 }
  drawSprites();
}

function obstacles(){
  
  if(frameCount%120===0){
    obstacle=createSprite(450,170,20,20);
    obstacle.velocityX=-6;
    obstacle.lifetime=150;
    obstacle.addAnimation('image',obstaceImage);
    obstacle.scale=0.1 
    obsGroup.add(obstacle);
  }
}
 function scoring(){
  // score=score+Math.ceil(frameCount/frameRate())
   
   text("survival time:"+score,100,50);
   textSize(24);
    }
 function bananas(){
   if (frameCount%100===0){
     banana=createSprite(650,Math.round(random(50,100)),10,10);
     banana.addAnimation("image",bananaImage);
     banana.scale=0.1;
     banana.velocityX=-4; 
     banana.lifetime=150;
   bananaGroup.add(banana);
   }
   
 }
function reset(){
 gamestate=PLAY;
 obsGroup.destroyEach();
 bananaGroup.destroyEach();
 score=0;   
 monkey.changeAnimation('image',monkey_running);

}


