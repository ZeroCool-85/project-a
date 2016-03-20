/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



console.log(window.innerWidth);
console.log(window.innerHeight);

var c = document.getElementById("game");
var ctx = c.getContext("2d");
gamewindow_w = window.innerWidth-100;
gamewindow_h = window.innerHeight-100;
c.width  = gamewindow_w;
c.height = gamewindow_h;
var model = new Image();
model.src = 'img/holder_sprite.png';
      
var player = {
    x:100,
    y:100,
    spd: 5,
    imageObj: model,
    direction: 0,
    animation: 0
};

var moveleft = false;
var moveup = false;
var moveright = false;
var movedown = false;

setInterval(gameloop, 40);

function preventDefault(event) {
  event.preventDefault();
}

function moveControls(){
     window.onkeydown = function (e) {
        e.preventDefault();
        switch (e.keyCode){
            case 37:    
                moveleft = true;
                break;
            case 38:    
                moveup = true;
                break;
            case 39:    
                moveright = true;
                break;
            case 40:    
                movedown = true;
                break;
            case 65:    
                moveleft = true;
                break;
            case 87:    
                moveup = true;
                break;
            case 68:    
                moveright = true;
                break;
            case 83:    
                movedown = true;
                break;
            default:    
                return;
        }
        return false;
     };
     
     window.onkeyup = function (e) {
        e.preventDefault();
        switch (e.keyCode){
            case 37:    
                moveleft = false;
                break;
            case 38:    
                moveup = false;
                break;
            case 39:    
                moveright = false;
                break;
            case 40:    
                movedown = false;
                break;
            case 65:    
                moveleft = false;
                break;
            case 87:    
                moveup = false;
                break;
            case 68:    
                moveright = false;
                break;
            case 83:    
                movedown = false;
                break;
            default:    
                return;
        }
        return false;
      };        
}

function playerMove(){
    if(moveleft && !(player.x < 0) ){
        player.animation += 1;
        player.direction = 1;
        player.x -= player.spd;
    }
    if(moveup && !(player.y-5 < 0)){
        player.animation += 1;
        player.direction = 3;
        player.y -= player.spd;
    }
    if(moveright && !(player.x > gamewindow_w-38)){
        player.animation += 1;
        player.direction = 2;
        player.x += player.spd;
    }
    if(movedown && !(player.y > gamewindow_h-52)){
        player.animation += 1;
        player.direction = 0;
        player.y += player.spd;
    }
}

function drawPlayer(){
    
    var spriteWidth     = player.imageObj.width/3;
    var spriteHeight    = player.imageObj.height/4;
    var spriteAnimation = player.animation%3;
    
    ctx.drawImage(player.imageObj, 
        spriteAnimation*spriteWidth,player.direction*spriteHeight, 
        spriteWidth, spriteHeight,
        player.x, player.y,
        player.imageObj.width/5, player.imageObj.height/5);
        console.log( player.imageObj.width/5);
        console.log(player.imageObj.height/5);
}

/* unbenutzt */
function collision(){
    if((player.x-10) < 0 ){   
        return true;
    }
    else if((player.x+10) > gamewindow_w-50 ){
        return true;
    }
    
    if((player.y-10) < 0){
        return true;
    }
    else if((player.y+10) > gamewindow_h-10){
        return true;
    }
    return false;
}

function gameloop(){
    ctx.clearRect(0, 0, window.screen.availWidth, window.screen.availHeight);
    moveControls();
    playerMove(); 
    drawPlayer();
    console.log("down: " + movedown);
    console.log("left: " + moveleft);
    console.log("right: " + moveright);
    console.log("up: " + moveup);
    console.log("x= " + player.x);
    console.log("y= " + player.y);
    
}
