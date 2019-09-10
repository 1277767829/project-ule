;(function(){
    var Lou=window.Lou=function(){
        this.l1=$("#lou").find("li").eq(0);
        this.l2=$("#lou").find("li").eq(1);
        this.l3=$("#lou").find("li").eq(2);
        this.l4=$("#lou").find("li").eq(3);
        this.height1=$("#shejian").offset().top;
        this.height2=$("#jiaju").offset().top;
        this.height3=$("#zhineng").offset().top;
        this.height4=0;
        this.bindEvent();
    }
    Lou.prototype.bindEvent=function(){
        var that=this;
        this.l1.click(function(){
            $("html").stop(true).animate({
                scrollTop:that.height1
            },100)
    
        })
        this.l2.click(function(){
            $("html").stop(true).animate({
                scrollTop:that.height2
            },100)
    
        })
        this.l3.click(function(){
            $("html").stop(true).animate({
                scrollTop:that.height3
            },100)
    
        })
        this.l4.click(function(){
            $("html").stop(true).animate({
                scrollTop:that.height4
            },100)
    
        })
        $(document).scroll(function(){
            if($(document).scrollTop()>1000){
                $("#lou").css("display","block");
            }else{
                $("#lou").css("display","none")
            }
        })
    }
})();