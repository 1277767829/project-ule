define(function(){
    var Tab=function(){
        this.$a=$("#dijia").children(".dijia-t").children("a");
        this.$li=$("#dijia").children(".dijia-b").children("ul").children("li");
        this.idx=0;
        this.bindEvent();
    }
    Tab.prototype.bindEvent=function(){
        var that=this;
        this.$a.mouseover(function(){
            $(this).addClass("cur").siblings().removeClass("cur");
            if(that.idx<$(this).index()){
                that.$li.eq(that.idx).stop(true).animate({top:-200},500);
                that.idx=$(this).index();
                that.$li.eq(that.idx).css("top",200).animate({top:0},500);
            }
            if(that.idx>$(this).index()){
                that.$li.eq(that.idx).stop(true).animate({top:200},500);
                that.idx=$(this).index();
                that.$li.eq(that.idx).css("top",-200).animate({top:0},500);
            }
        })
    }
    return {
        "tab":Tab
    }
});