
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