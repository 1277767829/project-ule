;(function(){
    var Login=window.Login=function(){
        this.user=document.getElementById("user");
        this.userspan=document.getElementById("userspan");
        this.pass=document.getElementById("pass");
        this.passspan=document.getElementById("passspan");
        this.checkbox=document.getElementById("checkbox");
        this.sub=document.getElementById("sub");
        this.subspan=document.getElementById("subspan");
        this.tiaozhuan=document.getElementById("tiaozhuan");
        this.tiaozhuanspan=document.getElementById("tiaozhuanspan");
        this.loginobj={};
        this.a=0;
        this.b=0;
        this.c=0;
        this.init();
        this.road();
        this.bindEvent();
    }
    Login.prototype.init=function(){
        this.cookieObj=JSON.parse(getcookie("login"));
        if(this.cookieObj){
            this.a=1;
            this.b=1;
            this.user.value=this.cookieObj.user;
            this.pass.value=this.cookieObj.pass;
            this.tiaozhuan.style.display="none";
        }
    }
    Login.prototype.road=function(eve){
        this.registerarr=JSON.parse(localStorage.getItem("register"))||[];
    }
    Login.prototype.bindEvent=function(){
        var that=this;
        window.addEventListener("storage",function(eve){
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
        })
        this.user.onblur=function(){
            var reguser=/^1[0-9]{10}$/;
            that.userspan.innerHTML=reguser.test(this.value)? "" : "请输入正确的手机号";
            that.a=reguser.test(this.value)? "1" : "0";
        }
        this.pass.onblur=function(){
            if(this.value.length==0){
                that.passspan.innerHTML="密码不可以为空";
                that.b=0;
            }else{
                var regpass=/^[a-zA-Z_0-9]{6,20}$/;
                that.passspan.innerHTML=regpass.test(this.value) ? "" : "请输入正确的密码格式";
                that.b=regpass.test(this.value) ? "1" : "0";
            }
            
        }
        this.sub.onclick=function(){
            if(!(that.a*that.b)){
                return;
            }else{
                if(that.registerarr.length==0){
                    that.subspan.innerHTML="手机号尚未注册，请先去注册";
                }else{
                    for(var i=0;i<that.registerarr.length;i++){
                        if(that.user.value==that.registerarr[i]["user"]&&that.pass.value==that.registerarr[i]["pass"]){
                            that.loginobj={"user":that.user.value,"pass":that.pass.value};
                            for(var j=0;j<that.registerarr.length;j++){
                                that.registerarr[j]["isLogin"]=false;
                            }
                            that.registerarr[i]["isLogin"]=true;
                            localStorage.setItem("register",JSON.stringify(that.registerarr));
                            if(that.checkbox.checked){
                                setcookie("login",JSON.stringify(that.loginobj),{expires:30})
                            }else{
                                setcookie("login",JSON.stringify(that.loginobj))
                            }
                            setTimeout(function(){
                                location.href = 'http://localhost/project-ule/index.html';
                            },3000);
                            that.tiaozhuan.style.display="block";
                            that.animate();
                            return ;
                        }
                        if(that.user.value==that.registerarr[i]["user"]&&that.pass.value!=that.registerarr[i]["pass"]){
                            that.passspan.innerHTML="密码错误，请重新输入";
                            return;
                        }
                    }
                    that.subspan.innerHTML="手机号尚未注册，请先去注册";
                }
            }
        }
    }
    Login.prototype.animate=function(){
        this.tiaozhuanspanArr=[".","..","..."];
        this.idx=0;
        var  that=this;
        setInterval(function(){
            that.idx++;
            if(that.idx>2){
                that.idx=0;
            }
            that.tiaozhuanspan.innerHTML=that.tiaozhuanspanArr[that.idx]
        },300)
        
    }
})();