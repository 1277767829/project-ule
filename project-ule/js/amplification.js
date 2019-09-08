;(function(){
    var Amplification=window.Amplification=function(){
        this.idx=0;
        this.bindEvent();
       
    }
    Amplification.prototype.bindEvent=function(){
        var that=this;
        $("#wrap").on("click",".xiao",function(event){
            that.url=$(event.target).attr("src");
            console.log($(event.target).attr("src"));
            console.log($("#smallimg"))
            $("#smallimg").attr("src",that.url);
        })
    }
})();