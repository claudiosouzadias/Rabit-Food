const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button, button2, button3;
var bunny;
var blink, eat, sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

var star_ing,star;
var star_2;
var ponto,ponto_2,ponto_3;
var up_star;

var balao;

function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  star_ing = loadImage("star.png");

  ponto = loadImage("empty.png");
  ponto_2 = loadImage("one_star.png");
  ponto_3 = loadImage("stars.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //botão 1
  button = createImg('cut_btn.png');
  button.position(180, 90);
  button.size(50, 50);
  button.mouseClicked(drop);

  //botão 2
  button2 = createImg('cut_btn.png');
  button2.position(390, 90);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  rope = new Rope(7, { x: 200, y: 90 });
  rope2 = new Rope(7, { x: 400, y: 90 });

  mute_btn = createImg('mute.png');
  mute_btn.position(width - 50, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  ground = new Ground(250, height, width, 20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(120, 620, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con_2 = new Link(rope2, fruit);

  star = createSprite(320,50,20,20);
  star.addAnimation("inercia",star_ing);
  star.scale = 0.02

  star_2 = createSprite(50,370,20,20);
  star_2.addAnimation("inercia",star_ing);
  star_2.scale = 0.02

  up_star = createSprite(50,20,30,30);
  up_star.addAnimation("vazio",ponto);
  up_star.addAnimation("vazio_2",ponto_2);
  up_star.addAnimation("vazio_3",ponto_3);

  up_star.changeAnimation("vazio");
  up_star.scale = 0.2;

  balao = createImg('baloon2.png');
  balao.position(260,370);
  balao.size(120,120);
  balao.mouseClicked(sopro);
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img, 0, 0, width, height);

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if (collide(fruit, bunny) == true) {
    World.remove(engine.world, fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if (collide(fruit, star,20) == true) {
    star.destroy();
    up_star.changeAnimation("vazio_2");
  }

  if (collide(fruit, star_2,20) == true) {
    star_2.destroy();
    up_star.changeAnimation("vazio_3");
  }

  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit = null;
  }

}

function drop() {
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null;
}

function drop2() {
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body, sprite, x) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= x) {
      return true;
    }
    else {
      return false;
    }
  }
}


function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  }
  else {
    bk_song.play();
  }
}

function sopro(){

  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03})

}

