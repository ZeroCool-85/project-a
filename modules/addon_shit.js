
var ShitModule = function(character){

    this.character = character;
    this.shitloads = [];

    this.gameloop =function(){
        var timestamp = new Date().getTime();

        if(Math.random() * 100 > 98)
            this.character.shit();


        for(var i = this.shitloads.length - 1; i >= 0 ; i--){
            var shit = this.shitloads[i];
            ctx.drawImage(shit.image,
                shit.x, shit.y,
                this.SHITWIDTH, this.SHITHEIGHT
            );
            if(shit.time + this.DECAYTIME < timestamp){
                this.shitloads.splice(i,1);
            }
        }
    };

    this.init = function(){

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
                    time : timestamp
                });
            };
        }
    };
};

ShitModule.prototype.SHITSPRITE = 'img/sprite_shit.png';
ShitModule.prototype.SHITHEIGHT = 40;
ShitModule.prototype.SHITWIDTH = 40;
ShitModule.prototype.DECAYTIME = 3000;

registerModule('shit', new ShitModule(player));