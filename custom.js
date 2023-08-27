// render canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let container = document.getElementById('container');

canvas.width = 400;
canvas.height = 700;
container.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let score = 0;
let gameOver = false; // true : end game

// spaceship location
let spaceshipX = canvas.width / 2 - 30 ;
let spaceshipY = canvas.height - 60;

let bulletList =[]; // a array to store bullets
// bullet location
function Bullet(){
  this.x = 0;
  this.y = 0;
  this.init = function(){
    this.x = spaceshipX + 22;
    this.y = spaceshipY;
    this.alive =  true;

    bulletList.push(this);
  };

  this.update = function(){
    this.y -= 7;
  }

  this.checkHit = function(){
    for(let i=0; i<enemyList.length; i++){
      if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <=enemyList[i].x+40 ){
        score++;
        this.alive = false;
        enemyList.splice(i, 1);
      }
    }
  }
};

function generateRandomValue(min, max){
  let randomNum = Math.floor(Math.random()*(max-min+1)) + min;
  return randomNum;
}

let enemyList = [];

function Enemy(){
  this.x = 0;
  this.y = 0;
  this.init = function() {
    this.x = generateRandomValue(0, canvas.width - 48);
    this.y = 0;
    enemyList.push(this);
  };

  this.update = function(){
    this.y  += 2;
    if(this.y >= canvas.height - 48){
      gameOver = true;
    }
  }
};

function loadImage(){
  backgroundImage = new Image();
  backgroundImage.src = 'images/body_bg.jpg';

  spaceshipImage = new Image();
  spaceshipImage.src = 'images/spaceship.png';

  bulletImage = new Image();
  bulletImage.src = 'images/bullet.png';

  enemyImage = new Image();
  enemyImage.src = 'images/enemy.png';

  gameOverImage = new Image();
  gameOverImage.src = 'images/gameover.png';
};

let keysDown = {};

function setupKeyboardListener() {
  document.addEventListener('keydown', function(event){
    keysDown[event.key] = true;
  });

  document.addEventListener('keyup', function(event){
    delete keysDown[event.key];

    if( event.key == " "){
      createBullet() // make bullet
    };
  });

}

function createBullet(){
  let b = new Bullet(); // create a bullet
  b.init()
}

function createEnemy(){
  const interval = setInterval(() => {
    let e = new Enemy();
    e.init()
  }, 1000);
}

function update(){
  if( 'ArrowRight' in keysDown) {
    spaceshipX += 3; // speed of spaceship
  } else if('ArrowLeft' in keysDown) {
    spaceshipX -= 3;
  }

  if(spaceshipX <= 0){
    spaceshipX = 0
  }

  if(spaceshipX >= canvas.width - 60) {
    spaceshipX = canvas.width - 60
  }

  // update bullets y location
  for(let i=0; i<bulletList.length; i++){
    if(bulletList[i].alive){
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }

  for(let i=0; i<enemyList.length; i++){
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, 60, 60);
  ctx.fillText(`SCORE:${score}`, 20, 40);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  
  for(let i=0; i<bulletList.length; i++){
    if(bulletList[i].alive){
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y - 16, 16, 16);
    }
  }

  for(let i=0; i<enemyList.length; i++){
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y, 48, 48);
  }
};

function main(){
  if(!gameOver){
    update()
    render();
    requestAnimationFrame(main);
  } else{
    ctx.drawImage(gameOverImage,(canvas.width - 240) / 2, canvas.height / 2 - 119, 240, 119)
  }
};

loadImage();
setupKeyboardListener();
createEnemy();
main();


