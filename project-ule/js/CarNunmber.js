;(function(){
    var CarNumber=window.CarNumber=function(){
        this.road();
        this.render();
        this.bindEvent();
    }
    CarNumber.prototype.road=function(){
        this.registerarr=JSON.parse(localStorage.getItem("register"))||[];
    }
    CarNumber.prototype.render=function(){
        count=0;
        for(var i=0;i<this.registerarr.length;i++){
            if(this.registerarr[i]["isLogin"]){
               for(var j=0;j<this.registerarr[i]["goods"].length;j++){
                    count+=parseInt(this.registerarr[i]["goods"][j]["num"]);
               }
            }
        }
        $("#carNumber").html(count)
    }
    CarNumber.prototype.bindEvent=function(){
        var that=this;
        window.addEventListener("storage",function(eve){
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
            that.render();
        })
    }
})();