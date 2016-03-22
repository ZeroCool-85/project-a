
function init(){
    Collisions.setPlayer(player);
}

var c       = document.getElementById("game");
var ctx     = c.getContext("2d");
var playerModel   = new Image();
var enemyModel    = new Image();
var map     = new Image();

var modules = {};

playerModel.src   = 'img/holder_sprite.png';
enemyModel.src    = 'img/holder_sprite.png';
map.src     = 'img/map.gif';

gamewindow_w    = 1024;
gamewindow_h    = 768;
c.width     = gamewindow_w;
c.height    = gamewindow_h;

var player = {
    x:100,
    y:100,
    spd: 5,
    img: playerModel,
    direction: 0,
    animation: 0,
    width: playerModel.width/5,
    height : playerModel.height/5
};

console.log(playerModel.width/5);
console.log(playerModel.height/5);

var enemy = {
    x:600,
    y:400,
    spd: 5,
    img: enemyModel,
    direction: 0,
    animation: 0
};

var moveleft = false;
var moveup = false;
var moveright = false;
var movedown = false;
setInterval(gameloop, 40);

function logBox(){
    ctx.fillStyle = 'black';
    ctx.fillRect(824,0,200,100);
    ctx.fillStyle = 'white';
    ctx.fillText('Player X: ' +player.x, 830, 10);
    ctx.fillText('Player Y: ' +player.y, 830, 20);
}

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

    var spriteWidth     = player.img.width/3;
    var spriteHeight    = player.img.height/4;
    var spriteAnimation = player.animation%3;

    ctx.drawImage(player.img,
        spriteAnimation*spriteWidth,player.direction*spriteHeight,
        spriteWidth, spriteHeight,
        player.x, player.y,
        player.img.width/5, player.img.height/5);
    //console.log( player.img.width/5);
    //console.log(player.img.height/5);
}

function drawEnemy(){

    var spriteWidth     = enemy.img.width/3;
    var spriteHeight    = enemy.img.height/4;
    //var spriteAnimation = enemy.animation%3;

    ctx.drawImage(enemy.img,
        0,0,
        spriteWidth, spriteHeight,
        enemy.x, enemy.y,
        enemy.img.width/5, enemy.img.height/5);
    //console.log(enemy);
}

function enemyMove(){
    if(enemy.x > 620){
        enemy.spd = enemy.spd * (-1);
    }
    else if(enemy.x < 500){
        enemy.spd = enemy.spd * (-1);
    }
    enemy.x += enemy.spd;
    enemy.y -= enemy.spd;
}

function drawMap(){
    ctx.drawImage(map,0,0);
}

var Collisions = {
    player: null,
    hasCollision: function (x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x1+w1<x2 || x2+w2<x1 || y1+h1<y2 || y2+h2<y1);
    },
    hasPlayerCollision: function (x,y,w,h){
        return this.player === null ? false : this.hasCollision(x,y,w,h,this.player.x, this.player.y, this.player.width, this.player.height);
    },
    setPlayer: function(player){
        this.player = player;
    }
};

function gameloop(){
    ctx.clearRect(0, 0, window.screen.availWidth, window.screen.availHeight);
    drawMap();

    for(mod in modules){
        if(modules.hasOwnProperty(mod)){
            modules[mod].gameloop();
        }
    }

    moveControls();
    playerMove();
    enemyMove();
    drawPlayer();
    drawEnemy();
    logBox();
    //console.log("down: " + movedown);
    //console.log("left: " + moveleft);
    //console.log("right: " + moveright);
    //console.log("up: " + moveup);
    //console.log("x= " + player.x);
    //console.log("y= " + player.y);

}

function registerModule(modulename, module){
    modules[modulename] = module;
    if(module['init'] !== undefined){
        module.init();
    }
}

function removeModule(modulename){
    delete modules[modulename];
}



init();;
var ShitModule = function(character){
    this.character = character;
    this.shitloads = [];
    this.nextpossibleshittime = 0;
};

ShitModule.prototype.SHITSPRITE = 'img/sprite_shit.png';
ShitModule.prototype.SHITSPRITEDNG = 'img/sprite_shit_dng.png';
ShitModule.prototype.SHITHEIGHT = 40;
ShitModule.prototype.SHITWIDTH = 40;
ShitModule.prototype.DECAYTIME = 10000;
ShitModule.prototype.DANGERTIME = 3000;
ShitModule.prototype.SHITDELAY = 10000;
ShitModule.prototype.init = function(){

    var thiz = this;
    if(this.character !== undefined){
        this.character.shit = function(){
            var timestamp = new Date().getTime();
            var shit = new Image();
            shit.src = thiz.SHITSPRITE;

            thiz.shitloads.push({
                image : shit,
                x : thiz.character.x,
                y : thiz.character.y,
                width : thiz.SHITWIDTH,
                height : thiz.SHITHEIGHT,
                rootX : thiz.character.x - thiz.SHITWIDTH/2,
                rootY : thiz.character.y - thiz.SHITHEIGHT/2,
                time : timestamp,
                isDangerous : false
            });
        };
    }
};
ShitModule.prototype.gameloop = function(){
    var timestamp = new Date().getTime();

    if(timestamp > this.nextpossibleshittime) {
        if (Math.random() * 100 > 98){
            this.character.shit();
            this.nextpossibleshittime = timestamp + this.SHITDELAY;
        }
    }

    for(var i = this.shitloads.length - 1; i >= 0 ; i--){
        var shit = this.shitloads[i];
        ctx.drawImage(shit.image,
            shit.x, shit.y,
            shit.width, shit.height
        );
        if(shit.isDangerous){
            if( Collisions.hasPlayerCollision(shit.rootX, shit.rootY, shit.width, shit.height) ){
                shit.width += 10;
                shit.height += 10;
                shit.x -= 5;
                shit.y -= 5;
            }
        }
        if(shit.time + this.DANGERTIME < timestamp){
            shit.image.src = this.SHITSPRITEDNG;
            shit.isDangerous = true;
        }
        if(shit.time + this.DECAYTIME < timestamp){
            this.shitloads.splice(i,1);
        }
    }
};



registerModule('shit', new ShitModule(player));