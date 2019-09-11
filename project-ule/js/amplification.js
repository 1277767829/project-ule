define(function(){
    // 实现放大镜功能，里面的图片可以根据用户选择的下方图片来显示
    var Amplification=function(){
        // 放大镜中的图片放大比例
        this.rate=$("#move").height()/$("#bigimg").height();
        this.bindEvent();
       
    }
    // 给下方的图片绑定点击事件，选择需要显示的图片
    Amplification.prototype.bindEvent=function(){
        var that=this;
        $("#wrap").on("click",".xiao",function(event){
            that.url=$(event.target).attr("src");
            $("#smallimg").css("background-image",`url(${that.url})`);
            $("#bigimg").css("background-image",`url(${that.url})`);
        })
        $("#smallimg").mousemove(function(event){
            var omoveleft=event.pageX-$(this).offset().left-$("#move").width()/2;
            var omovetop=event.pageY-$(this).offset().top-$("#move").height()/2;
            if(omoveleft<0){
                omoveleft=0;
            }else if(omoveleft>this.offsetWidth-$("#move").width()){
                omoveleft=this.offsetWidth-$("#move").width();
            }
            if(omovetop<0){
                omovetop=0;
            }else if(omovetop>this.offsetHeight-$("#move").height()){
                omovetop=this.offsetHeight-$("#move").height();
            }
            $("#move").css({"display":"block","left":omoveleft+"px","top":omovetop+"px"});
            var x=-omoveleft/that.rate;
            var y=-omovetop/that.rate;
            $("#bigimg").css({"backgroundPosition":x+"px "+y+"px","display":"block"});
        })
        $("#smallimg").mouseleave(function(event){
            $("#move").css("display","none");
            $("#bigimg").css("display","none");
        })
    }
    return {
        "amplification":Amplification
    }
})();