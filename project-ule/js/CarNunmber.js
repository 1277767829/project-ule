define(function(){
    // 根据localstorge来渲染当前登陆用户的购物车数量
    var CarNumber=function(){
        this.road();
        this.render();
        this.bindEvent();
    }
    // 预先加载数据库中的用户信息
    CarNumber.prototype.road=function(){
        this.registerarr=JSON.parse(localStorage.getItem("register"))||[];
    }
    // 根据数据库中的用户信息来加载数据
    CarNumber.prototype.render=function(){
        var count=0;
        for(var i=0;i<this.registerarr.length;i++){
            // 找到登录信息为true的用户
            if(this.registerarr[i]["isLogin"]){
                // 然后遍历它goods里面所有的商品数量之和（即每条商品信息的num之和）
               for(var j=0;j<this.registerarr[i]["goods"].length;j++){
                    count+=parseInt(this.registerarr[i]["goods"][j]["num"]);
               }
            }
        }
        // 然后将其显示在页面上
        $("#carNumber").html(count)
    }
    // 然后给数据库添加监听，当其里面的内容发生改变时，重新渲染页面
    CarNumber.prototype.bindEvent=function(){
        var that=this;
        window.addEventListener("storage",function(eve){
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
            that.render();
        })
    }
    return {
        "carNumber":CarNumber
    }
});