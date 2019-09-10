;(function(){
    // 表单验证：根据用户输入的信息来判断是否可以成功注册
    var Form=window.Form=function(){
        // 获取一系列的节点
        this.user=document.getElementById("user");
        this.userspan=document.getElementById("userspan");
        this.verify=document.getElementById("verify");
        this.verifyspan=document.getElementById("verifyspan");
        this.pass1=document.getElementById("pass1");
        this.pass1span=document.getElementById("pass1span");
        this.pass2=document.getElementById("pass2");
        this.pass2span=document.getElementById("pass2span");
        this.checkbox=document.getElementById("checkbox");
        this.checkboxspan=document.getElementById("checkboxspan");
        this.sub=document.getElementById("sub");
        this.subspan=document.getElementById("subspan");
        this.cover=document.getElementById("cover");
        this.random=document.getElementById("random");
        this.operator=document.getElementById("operator");
        this.num1=document.getElementById("num1");
        this.num2=document.getElementById("num2");
        // 每个input的状态只有他们都为1的时候才可以成功注册
        this.a=0;
        this.b=0;
        this.c=0;
        this.d=0;
        this.e=0;
        // 这是预先设置的数据库中接收注册用户信息的数组
        this.registerarr=[];
        this.render();
        this.road();
        this.bindEvent();
    }
    // 表单初始化
    Form.prototype.init=function(){
        this.a=0;
        this.b=0;
        this.c=0;
        this.d=0;
        this.e=0;
        this.user.value="";
        this.userspan.innerHTML="";
        this.cover.style.display="block";
        this.verify.value="";
        this.verifyspan.innerHTML="";
        this.pass1.value="";
        this.pass1span.innerHTML="";
        this.pass2.value="";
        this.pass2span.innerHTML="";
    }
    // 给验证码框渲染内容，验证码框由两个数字和一个运算符组成
    Form.prototype.render=function(){
        // 每次渲染时，随机一个运算符两个数字
        var operatorarr=["+","-","*"];
        this.num1.innerHTML=parseInt(Math.random()*10);
        this.num2.innerHTML=parseInt(Math.random()*10);
        this.operator.innerHTML=operatorarr[parseInt(Math.random()*3)];
    }
    // 预先加载数据库注册的数据数组
    Form.prototype.road=function(){
        this.registerarr=JSON.parse(localStorage.getItem("register"))||[];
    }
    // 给表单添加绑定事件
    Form.prototype.bindEvent=function(){
        var that=this;
        // 给user添加鼠标光标失去事件，有三种情况：1.手机号格式不符合；2.手机号已被注册；3.手机号即符合格式又未被注册
        this.user.onblur=function(){
            // 判断手机号格式的正则
            var reguser=/^1[0-9]{10}$/;
            // 当手机号符合格式时
            if(reguser.test(this.value)){
                // 当数据库中没有已注册的数据则，直接可用（即判断这个user表用户输入正确，开启下一个验证码表的填写）
                if(that.registerarr.length<1){
                    that.a=1;
                    that.cover.style.display="none";
                    that.userspan.innerHTML="此手机号可用";
                    that.userspan.style.color="green";
                }else{
                    // 当数据库已有注册的数据时
                    for(var i=0;i<that.registerarr.length;i++){
                        // 遍历所有用户的数据，判断此手机号是否已经被注册，如果已注册则直接返回不进行下面的操作
                        if(this.value==that.registerarr[i]["user"]){
                            that.a=0;
                            that.cover.style.display="block";
                            that.userspan.innerHTML="该手机号已被注册，请重新输入";
                            that.userspan.style.color="red";
                            return;
                        }
                    }
                    // 遍历完所有的数据又没有相同的手机号，则此手机号可用
                    that.a=1;
                    that.cover.style.display="none";
                    that.userspan.innerHTML="此手机号可用";
                    that.userspan.style.color="green";
                }
            }else{
                // 如果正则判定为负，则用户输错了手机号
                that.a=0;
                that.cover.style.display="block";
                that.userspan.innerHTML="请输入正确的手机号";
                that.userspan.style.color="red";
            }
        }
        // 点击哪个验证码框，会重新加载一组数据
        this.random.onclick=function(){
           that.render();
        }
        // 给验证码表添加事件
        this.verify.onblur=function(){
            // 先获取验证码框中的运算符，根据不同的运算符，来进行不同的计算
            switch (that.operator.innerHTML) {
                case "+":
                    that.jieguo=parseInt(that.num1.innerHTML)+parseInt(that.num2.innerHTML);
                    break;
                case "-":
                    that.jieguo=that.num1.innerHTML-that.num2.innerHTML;
                    break;
                case "*":
                    that.jieguo=that.num1.innerHTML*that.num2.innerHTML;
                default:
                    break;
            }
            // 当验证表中的value值等于验证框内的计算结果时，输入正确
            if(this.value==that.jieguo){
                that.verifyspan.innerHTML="输入正确";
                that.verifyspan.style.color="green";
                that.b=1;
            }else{
                that.verifyspan.innerHTML="计算错误，请重新计算";
                that.verifyspan.style.color="red";
                that.b=0;
            }
        }
        // 给第一个密码表添加事件
        this.pass1.onblur=function(){
            // 用正则判定输入的密码是否符合格式
            var regpass=/^[a-zA-Z_0-9]{6,20}$/;
            if(regpass.test(this.value)){
                that.pass1span.innerHTML="输入正确"
                that.pass1span.style.color="green";
                that.c=1;
            }else{
                that.pass1span.innerHTML="输入错误，请输入正确的6~20位数由字母、数字、“_”的组合的密码"
                that.pass1span.style.color="red";
                that.c=0;
            }
        }
        // 给再次输入密码表添加事件
        this.pass2.onblur=function(){
            // 判断之前的密码表是否输入正确
            if(that.c==0){
                that.pass2span.innerHTML="请先输入正确的密码"
                that.pass2span.style.color="red";
                that.d=0;
            }else{
                // 如果正确则判断两次输入的内容是否一样
                if(that.pass1.value==this.value){
                    that.pass2span.innerHTML="输入正确"
                    that.pass2span.style.color="green";
                    that.d=1;
                }else{
                    that.pass2span.innerHTML="两次输入不一致，请重新输入"
                    that.pass2span.style.color="red";
                    that.d=0;
                }
            }
        }
        // 给下面的用户协议复选框添加点击监听事件事件
        this.checkbox.onclick=function(){
            if(this.checked){
                that.e=1;
                that.checkboxspan.innerHTML="";
            }else{
                that.e=0;
                that.checkboxspan.innerHTML="请先阅读协议，并同意";
            }
        }
        // 给下面注册按钮添加点击事件
        this.sub.onclick=function(){
            // 如果用户不点击同意用户协议的复选框直接点击注册的情况
            if(that.e==0){
                that.checkboxspan.innerHTML="请先阅读协议，并同意";
            }
            // 根据状态值和是否为5来判断是否注册成功，成功后则注册表所有表都初始化
            if(that.a+that.b+that.c+that.e+that.d==5){
                that.subspan.innerHTML="恭喜你注册成功";
                that.subspan.style.color="green";
                that.registerarr.push({"user":that.user.value,"pass":that.pass1.value,"goods":[],"isLogin":false})
                localStorage.setItem("register",JSON.stringify(that.registerarr));
                that.init();
                that.render();
            }else{
                that.subspan.innerHTML="请先完成上述步骤";
                that.subspan.style.color="red";
            }
        }
    }
})();