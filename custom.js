// render canvas
let canvas;
let ctx;
canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

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
      console.log('gameOver')
    }
  }
};

function loadImage(){
  backgroundImage = new Image();
  backgroundImage.src = 'images/bg.png';

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
    console.log('무슨키가 눌렸어?', keysDown);
  });

  document.addEventListener('keyup', function(event){
    delete keysDown[event.key];

    if( event.key == " "){
      createBullet() // make bullet
    };
  });

}

function createBullet(){
  console.log('shoot')
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
    ctx.drawImage(gameOverImage,10, gameOverImage.height - 20, 380, 200)
  }
};

loadImage();
setupKeyboardListener();
createEnemy();
main();

// making bullets
// 1. Space bar fires bullets.
// 2. As the bullet is fired, the bullet's y-value continues to decrease.
// 3. The x-value of the bullet is the x-value of the spacecraft at the moment you pressed space.
// 4. Bullets must have x,y coordinate values.
// 5. Take an array of bullets and call render()


