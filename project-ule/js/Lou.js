;(function(){
    // 给首页添加楼层定位效果
    var Lou=window.Lou=function(){
        // 获取一系列的节点和高度数据
        this.l1=$("#lou").find("li").eq(0);
        this.l2=$("#lou").find("li").eq(1);
        this.l3=$("#lou").find("li").eq(2);
        this.l4=$("#lou").find("li").eq(3);
        // 这是jQurey中获取元素offsettop值的方法
        this.height1=$("#shejian").offset().top;
        this.height2=$("#jiaju").offset().top;
        this.height3=$("#zhineng").offset().top;
        this.height4=0;
        this.bindEvent();
    }
    // 给每个li绑定事件
    Lou.prototype.bindEvent=function(){
        var that=this;
        // 当点击L1时，鼠标的滚轮高度会回到height1，下面同理
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
        // 这里是给滚轮绑定监听，当鼠标滚轮的高度大于1000时楼层显示，当小于时楼层消失。
        $(document).scroll(function(){
            if($(document).scrollTop()>1000){
                $("#lou").css("display","block");
            }else{
                $("#lou").css("display","none")
            }
        })
    }
})();