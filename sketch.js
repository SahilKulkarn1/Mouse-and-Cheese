var survivalTime=0
var mouse , mouse_running
var banana ,bananaImage,obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground
var score = 0
var survivalTime

var gameState = "PLAY"
var back,backImage
var invground
var restart, restartImg
var gameOver, gameOverImg




function preload(){
  backImage=loadImage("jungle.jpg")
  
  mouse_running =loadAnimation("mousey.png")
  
  bananaImage = loadImage("cheese.png");
  obstacleImage = loadImage("mousetrap.png");
  
  

}

function setup() {
  createCanvas(400,400)
  
  back=createSprite(200,200,400,400)
  back.addImage(backImage)
  back.velocityX=-4
  
  mouse=createSprite(60,340,10,10)
  mouse.addAnimation("mouserunning",mouse_running)
  mouse.scale=0.2    
 
  invground=createSprite(200,380,400,10)
  invground.visible=false 
 
  
  


  obstacleGroup=createGroup(); 
  FoodGroup=createGroup();
}

function draw(){
background("cyan")
  console.log(mouse.y)

if(gameState === "PLAY"){
  if(keyDown("space")&& mouse.y>157){
    mouse.velocityY=-16
  }
  mouse.velocityY=mouse.velocityY+0.7
 if(back.x<0){
 back.x=back.width/2
 } 
  if(mouse.isTouching(FoodGroup)){
   score++ 
  FoodGroup.destroyEach()
  }
  
  if(obstacleGroup.isTouching(mouse)){
   gameState="END"
  }
  switch(score){
    case 10: mouse.scale=0.12
             break;
    case 20: mouse.scale=0.14
             break;
    case 30: mouse.scale=0.16
             break;
   case 40: mouse.scale=0.18
             break;
             default:
      break; 
  }
    fruit()
    obstacles();
    drawSprites();
 }
  
 
  mouse.collide(invground);


 

if (gameState === "END") {
  // gameOver.visible = true;
  // restart.visible = true;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  textSize(50);
fill("black")
stroke(random(0,255), random(50,100), random(0,255))
strokeWeight(12)

  text("GAME OVER", 90,170);

  textSize(20);
  
 // noStroke();
  text("Press space to Restart", 100,300)
  
  if(keyDown("space")) {
    reset();
  }
}

 
  textSize(20)
  fill("white")
  stroke("black")
  text("Score"+score,300,60)
  
}

function reset(){
  score = 0;
  gameState = "PLAY"
}



function obstacles(){
  if(frameCount % 100 === 0) {
    obstacle = createSprite(400,360,40,40);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-4;
    obstacle.scale = 0.06;
    obstacle.lifetime = 140;
    
    obstacleGroup.add(obstacle);
  }
}


function fruit(){
  if(frameCount % 100 === 0) {
    bannana = createSprite(400,200,40,40);
    bannana.addImage(bananaImage);
    bannana.velocityX=-4
    bannana.scale=0.1
    FoodGroup.add(bannana)
  }
}