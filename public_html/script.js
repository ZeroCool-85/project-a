/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



console.log(window.innerWidth);
console.log(window.innerHeight);

var c = document.getElementById("game");
var ctx = c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight;
var x = 100;
var y = 100;
var moveleft = false;
var moveup = false;
var moveright = false;
var movedown = false;

setInterval(gameloop, 10);

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
    if(moveleft){
        x -= 10;
    }
    if(moveup){
        y -= 10;
    }
    if(moveright){
        x += 10;
    }
    if(movedown){
        y += 10;
    }
}

function drawPlayer(){
    ctx.fillText("Player",x,y);
}

function collision(){
    if(x < 0 ){
        x = 0;
    }
    else if( x > window.innerWidth-50 ){
        x = window.innerWidth-50;
    }
    
    if(y < 0){
        y = 0;
    }
    else if(y > window.innerHeight-50){
        y = window.innerHeight-50;
    }
}

function gameloop(){
    ctx.clearRect(0, 0, window.screen.availWidth, window.screen.availHeight);
    moveControls();
    playerMove();
    drawPlayer();
    collision();
    console.log(movedown);
    console.log(moveleft);
    console.log(moveright);
    console.log(moveup);
    console.log(x);
    console.log(y);
    
}
