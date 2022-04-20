const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var balas = [];

var angle;

var tower;
var pistola;
var bala;
var barco;

var boatSpritedata, boatSpritesheet;

var barcoAnimate = [];

var matriz = [22,44,66];
console.log(matriz[2]);

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  boatSpritedata = loadJSON("./assets/barco/barco.json");
  boatSpritesheet = loadImage("./assets/barco/barco.png");

}
// javascript object notation JSON

function setup() {
  canvas = createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  angle = -PI/4;//45°

  var boatFrames = boatSpritedata.frames;
  for(var i = 0; i < boatFrames.length; i++)
  {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    barcoAnimate.push(img);
  }

  /*rectMode(CENTER);
  ellipseMode(RADIUS);*/
  //Usa una nueva palabra clave para crear un objeto torre.(desafío 4)
  tower = new Tower(150,350,160,310);
  pistola = new Gustav(180,110,100,50,angle);
  bala = new Ball(pistola.x,pistola.y);
  barco = new Pirata(width,height-100,200,200,-100);
  
}

function draw() 
{
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
//muestra la torre(desafío 4)
 tower.display();
 bala.display();
 pistola.display();
 barco.display();
 
 for(var i = 0; i < balas.length; i++)
 {
   showBala(balas[i],i);

 }

 Matter.Body.setVelocity(barco.body,{

  x:-2,
  y:0
 });
}

function keyPressed() 
{ 
  if (keyCode === DOWN_ARROW) 
  { 
    var bala = new Ball(pistola.x, pistola.y); 
    balas.push(bala); 
  } 
} 
//función para mostrar la bala 
function showBala(bala, index) 
{ 
  bala.display(); 
  if (bala.body.position.x >= width || bala.body.position.y >= height - 50) 
  { 
    Matter.World.remove(world, bala.body); 
    balas.splice(index, 1); 
  } 
} 

function keyReleased() 
{ 
  if (keyCode === DOWN_ARROW) 
  { 
    balas[balas.length - 1].shoot(); 
  } 
}

function showBoat()
{
  if (barco.length > 0)
  {
    if ( barco.length < 4 && barco[barco.length - 1].body.position.x < width - 300 )
    {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var pirata = new Pirata( width, height - 100, 170, 170, position, barcoAnimate );
      barco.push(pirata);
    }
    for (var i = 0; i < barco.length; i++)
    {
      Matter.Body.setVelocity(barco[i].body, { x: -0.9, y: 0 });
      barco[i].display();
      barco[i].animate();
    }
  }
  else
  {
    var pirata = new Pirata(width, height - 60, 170, 170, -60, barcoAnimate);
    barco.push(pirata);
  }
}
