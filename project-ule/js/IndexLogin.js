define(function(){
    // 这里主要是根据lockstorage来控制页面顶部请登录和免费注册这两个按钮
    var IndexLogin=function(){
        // 获取节点
        this.indexUser=document.getElementById("indexUser");
        this.indexRegister=document.getElementById("indexRegister");
        this.carnumber=document.getElementById("carNumber");
        this.init();
        this.road();
        this.render();
        this.bindEvent();
    }
    // init功能：初始化页面（即用户未登陆的情况）顶部那两个按钮的值，和它们的链接
    IndexLogin.prototype.init=function(){
        this.indexUser.href="http://localhost/project-ule/login.html";
        this.indexRegister.href="http://localhost/project-ule/registered.html";
        this.indexUser.innerHTML="[请登录]";
        this.indexRegister.innerHTML="[免费注册]";
        // 这个表示页面状态，用户未登录
        this.state=false;
    }
    // 预先加载localstorage里面的数据
    IndexLogin.prototype.road=function(){
        this.registerarr=JSON.parse(localStorage.getItem("register"))||[];
    }
    // 根据localstorage里的数据（即选中那条登陆状态为true的数据，如果没有为true的就直接返回）来渲染这两个按钮
    IndexLogin.prototype.render=function(){
        // 如果注册数据库中没有用户直接返回
        if(this.registerarr.length==0)return;
        for(var i=0;i<this.registerarr.length;i++){
            // 选择数据中登陆状态为true的那条数据
            if(this.registerarr[i]["isLogin"]){
                // 利用正则将用户名的格式改为183****0689的形式的
                var reg=/^(\d{3})\d{4}(\d{4})$/;
                var str=this.registerarr[i]["user"];
                str=str.replace(reg,"$1****$2");
                // 同时改变那两个按钮的显示内容和链接
                this.indexUser.innerHTML=str;
                this.indexUser.href="javescript:;";
                this.indexRegister.href="javescript:;"
                this.indexRegister.innerHTML="退出";
                this.state=true;
                return;
            }
        }
        // 如果有登录状态的用户前面直接返回了，不会执行到这里，只有当数据库有数据而且都未登录时才执行
        this.init();
    }
    // 给元素绑定监听
    IndexLogin.prototype.bindEvent=function(){
        var that=this;
        //！！ 因为onstorage是全局绑定在window身上的，所以这里要用DOM2级来绑定避免重复绑定而被后绑定的覆盖
        window.addEventListener("storage",function(eve){
            // 当数据库发生改变时，调用render来渲染
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
            that.render();
        })
        //给退出按钮绑定点击事件：点击退出就会使这条用户的登录状态改为false
        this.indexRegister.onclick=function(){
            // 先判断当前页面是否已经有用户登录了
            if(that.state){
                for(var i=0;i<that.registerarr.length;i++){
                    // 找到当前登录状态数据为true的那条数据
                    if(that.registerarr[i]["isLogin"]){
                        // 修改登录状态，存入localstorage
                        that.registerarr[i]["isLogin"]=false;
                        localStorage.setItem("register",JSON.stringify(that.registerarr));
                        // 修改登录按钮的链接
                        that.indexUser.href="http://localhost/project-ule/login.html";
                        // 这里要注意你当前点击的就是那个注册的节点，所以将它链接改注册页面时不能直接改要有个延时，要不然会直接跳转到注册页面
                        that.indexRegister.href="javescript:;";
                        setTimeout(() => {
                            that.indexRegister.href="http://localhost/project-ule/registered.html";
                        }, 50);
                        // 修改两个按钮的显示内容
                        that.indexUser.innerHTML="[请登录]";
                        that.indexRegister.innerHTML="[免费注册]";
                        // 因为onstorage是监听当其它页面的storage发生改变时触发的事件，所以当前操作localstorage发生变化时不会触发onstorage事件，所以我们要人为修改这里购物车的数量
                        that.carnumber.innerHTML=0;
                        //修改页面登陆状态
                        that.state=false;
                        
                    }
                }
            }
        }
    }
    return {
        "indexLogin":IndexLogin
    }
});