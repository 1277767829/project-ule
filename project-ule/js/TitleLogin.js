define(function(){
    var IndexLogin=window.IndexLogin=function(){
        this.indexUser=document.getElementById("indexUser");
        this.indexRegister=document.getElementById("indexRegister");
        this.init();
        this.road();
        this.render();
        this.bindEvent();
    }
    IndexLogin.prototype.init=function(){
        this.indexUser.href="http://localhost/project-ule/login.html";
        this.indexRegister.href="http://localhost/project-ule/registered.html";
        this.indexUser.innerHTML="[请登录]";
        this.indexRegister.innerHTML="[免费注册]";
        this.state=false;
    }
    IndexLogin.prototype.road=function(){
        this.registerarr=JSON.parse(localStorage.getItem("register"))||[];
    }
    IndexLogin.prototype.bindEvent=function(){
        var that=this;
        window.addEventListener("storage",function(eve){
            console.log(1);
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
            that.render();
        })
        this.indexRegister.onclick=function(){
            if(that.state){
                for(var i=0;i<that.registerarr.length;i++){
                    if(that.registerarr[i]["isLogin"]){
                        that.registerarr[i]["isLogin"]=false;
                        localStorage.setItem("register",JSON.stringify(that.registerarr));
                        that.indexUser.href="http://localhost/project-ule/login.html";
                        that.indexRegister.href="javescript:;";
                        setTimeout(() => {
                            that.indexRegister.href="http://localhost/project-ule/registered.html";
                        }, 50);
                        that.indexUser.innerHTML="[请登录]";
                        that.indexRegister.innerHTML="[免费注册]";
                        that.state=false;
                        
                    }
                }
            }
        }
    }
    IndexLogin.prototype.render=function(){
        if(this.registerarr.length==0)return;
        for(var i=0;i<this.registerarr.length;i++){
            if(this.registerarr[i]["isLogin"]){
                var reg=/^(\d{3})\d{4}(\d{4})$/;
                var str=this.registerarr[i]["user"];
                str=str.replace(reg,"$1****$2");
                this.indexUser.innerHTML=str;
                this.indexUser.href="javescript:;";
                this.indexRegister.href="javescript:;"
                this.indexRegister.innerHTML="退出";
                this.state=true;
                return;
            }
        }
        this.init();
    }
});