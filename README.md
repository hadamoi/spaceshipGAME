# 🚀 Keyboard spaceship game
Use the spacebar to shoot bullets. <br />
Move the ship with the left/right keys. <br />
The game ends when the bullet hits the ground.

#### 📝 Description
‣ making bullets
1. Space bar fires bullets.
2. As the bullet is fired, the bullet's y-value continues to decrease.
3. The x-value of the bullet is the x-value of the spacecraft at the moment you pressed space.
4. Bullets must have x,y coordinate values.
5. Take an array of bullets and call render()

#### ✔️ Things to remember
```
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
```
* The setupKeyboardListener() function detects keyboard events and processes the player's input.
* Two functions are registered to handle events when a key is pressed and released.
* When the spacebar key is pressed, the createBullet() function is called to create a bullet.
##### It's important to note that there is a separation between when the keyboard is pressed and when it is released.
