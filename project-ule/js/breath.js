define(function(){
    var Breath=function(){
        this.idx=0;
        this.$breath=$("#breath");
        this.$lis=$("#breath").children("ul").children("li");
        this.creat();
        this.render();
        this.play();
        this.bindEvent();   
    }
    Breath.prototype.creat=function(){
        $("<dl></dl>").appendTo(this.$breath);
        for(var i=0;i<this.$lis.length;i++){
            $("<dd></dd>").appendTo(this.$breath.children("dl"));
        }
        this.$dds=$("#breath").children("dl").children("dd");
    }
    Breath.prototype.render=function(){
        this.$lis.eq(this.idx).addClass("cur").siblings().removeClass("cur");
        this.$dds.eq(this.idx).addClass("cur").siblings().removeClass("cur");
    }
    Breath.prototype.bindEvent=function(){
        var that=this;
        this.$dds.mouseover(function(){
            var $self=$(this);
            that.$lis.eq(that.idx).stop().animate({opacity:0},60,function(){
                that.idx=$self.index();
                that.$lis.eq(that.idx).stop().animate({opacity:1},60)
                that.render();
            })
        })
        this.$breath.hover(function(){
            clearInterval(that.t);
        },function(){
            that.play();
        })
    }
    Breath.prototype.play=function(){
        var that=this
        this.t=setInterval(function(){
            that.$lis.eq(that.idx).stop().animate({opacity:0},60,function(){
                that.idx++;
                if(that.idx>that.$lis.length-1){
                    that.idx=0;
                }
                that.$lis.eq(that.idx).stop().animate({opacity:1},60);
                that.render();
            })
        },2800)
    }
    return {
        "breath":Breath
    }
});















































