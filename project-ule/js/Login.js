define(function(){
    // 登录页面登录表格的功能：当用户输入正确的已注册的信息后，修改数据库中已注册的这条用户的登录状态并且3秒后跳转至首页（其实可以跳转至之前打开这个页面的网页，但是又有可能是从注册页面跳转过来的这时候就不需要跳转回去了）
    var Login=function(){
        // 获取一系列节点
        this.user=document.getElementById("user");
        this.userspan=document.getElementById("userspan");
        this.pass=document.getElementById("pass");
        this.passspan=document.getElementById("passspan");
        this.checkbox=document.getElementById("checkbox");
        this.sub=document.getElementById("sub");
        this.subspan=document.getElementById("subspan");
        this.tiaozhuan=document.getElementById("tiaozhuan");
        this.tiaozhuanspan=document.getElementById("tiaozhuanspan");
        // 准备一个登录空对象来接收登录成功时表格数据
        this.loginobj={};
        // 判定各个表的填写情况的状态码
        this.a=0;
        this.b=0;
        this.c=0;
        this.init();
        this.road();
        this.bindEvent();
    }
    // 初始页面登录表的内容
    Login.prototype.init=function(){
        // 先判定本地cookie中是否有login的值
        if(this.getcookie("login")){
            this.cookieObj=JSON.parse(this.getcookie("login"))||{};
        }
        // 如果有值那就直接填充内容，把信号量改为1
        if(this.cookieObj){
            this.a=1;
            this.b=1;
            this.user.value=this.cookieObj.user;
            this.pass.value=this.cookieObj.pass;
            this.tiaozhuan.style.display="none";
        }
    }
    // 先加载数据库中的数据
    Login.prototype.road=function(eve){
        this.registerarr=JSON.parse(localStorage.getItem("register"))||[];
    }
    // 给登录表添加绑定事件
    Login.prototype.bindEvent=function(){
        var that=this;
        // 给数据库动态添加监听
        window.addEventListener("storage",function(eve){
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
        })
        // 给用户名输入表添加监听
        this.user.onblur=function(){
            // 第一步先判断用户输入的手机号符合不符合格式
            var reguser=/^1[0-9]{10}$/;
            that.userspan.innerHTML=reguser.test(this.value)? "" : "请输入正确的手机号";
            that.a=reguser.test(this.value)? "1" : "0";
        }
        // 给密码输入表添加监听
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
        // 给登陆按钮添加点击监听
        this.sub.onclick=function(){
            // 只要a和b这两个信号量其中一个任一为0，则直接返回点击无效
            if(!(that.a*that.b)){
                return;
            }else{
                // 先判断手机号是否已经存在于注册数据库中，如果数据库本身就没有数据，则直接提示尚未注册
                if(that.registerarr.length==0){
                    that.subspan.innerHTML="手机号尚未注册，请先去注册";
                }else{
                    // 当数据库中有数据时
                    for(var i=0;i<that.registerarr.length;i++){
                        // 而且输入的手机号已经存在于数据库时，将输入的信息存入本地cookie中，同时修改数据库中这个注册用户的登录状态
                        if(that.user.value==that.registerarr[i]["user"]&&that.pass.value==that.registerarr[i]["pass"]){
                            that.loginobj={"user":that.user.value,"pass":that.pass.value};
                            // 这里是为了防止用户同时登录多个账号，只要登录一个账号其他账号的状态全都改为false；
                            for(var j=0;j<that.registerarr.length;j++){
                                that.registerarr[j]["isLogin"]=false;
                            }
                            that.registerarr[i]["isLogin"]=true;
                            localStorage.setItem("register",JSON.stringify(that.registerarr));
                            // 根据是否记住账号密码前复选框的状态来决定这条cookie的保存时间
                            if(that.checkbox.checked){
                                that.setcookie("login",JSON.stringify(that.loginobj),{expires:30})
                            }else{
                                that.setcookie("login",JSON.stringify(that.loginobj))
                            }
                            // 登录成功之后，3秒后跳转到首页
                            setTimeout(function(){
                                location.href = 'http://localhost/project-ule/index.html';
                            },3000);
                            // 让下方提示正在跳转中的文本显示
                            that.tiaozhuan.style.display="block";
                            that.animate();
                            return ;
                        }
                        // 如果用户名相符而密码不一样，则提示密码输入错误
                        if(that.user.value==that.registerarr[i]["user"]&&that.pass.value!=that.registerarr[i]["pass"]){
                            that.passspan.innerHTML="密码错误，请重新输入";
                            return;
                        }
                    }
                    // 当数据库中没有这条用户信息时
                    that.subspan.innerHTML="手机号尚未注册，请先去注册";
                }
            }
        }
    }
    // 表示用户等待跳转时下方提示文本出现的动画效果
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
    Login.prototype.setcookie=function(key,value,options){
        options=options ||{};
        var expires="";
        var d=new Date();
        d.setDate(d.getDate()+options.expires);
        expires=";expires="+d;
        var path=options.path ? ";path="+options.path : "";
        document.cookie=`${key}=${value}${expires}${path};`
    }
    Login.prototype.getcookie=function(key){
        var arr=document.cookie.split("; ");
        for(var i=0;i<arr.length;i++){
            if(key==arr[i].split("=")[0]){
                return arr[i].split("=")[1];
                
            }
        }
        return '';
    }
    return {
        "login":Login
    }
});