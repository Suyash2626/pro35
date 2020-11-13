//Create variables here
var dog,happyDog;
var database;
var foodS;
var foodStock;
var feedDog,addFoods;
var fedTime, lastFed;
var foodObj;
var feed,addFood;


function preload()
{
  //load images here
  i1=loadImage("images/dogImg.png");
  i2=loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(600, 600);
  foodObj=new Food();
  
  dog=createSprite(450,450);
  dog.addImage(i1);
  dog.addImage(i2);
  dog.scale=0.15

  database=firebase.database()

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  
  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(0);

foodObj.display();



fedTime=database.ref('FedTime')
fedTime.on("value",function(data){
  lastFed=data.val();
})
  
//add styles here

if(lastFed>=12){
  text("Last Feed:"+lastFed%12+"PM",350,30)
}else if(lastFed===0){
  text("Last Feed:12 AM",350,30)
}else{
  text("Last Feed:"+lastFed+"AM",350,30)
}



fill(255,255,254);
 stroke("white");
  text("Food remaining : "+foodS,500,300);
 
 drawSprites();
  
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}








function  feedDog(){
  dog.addImage(i2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}






function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



















