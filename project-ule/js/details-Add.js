;(function(){
    // 根据请求的网址后缀来加载页面的商品信息，同时点击添加购物车功能时修改数据库中的goods商品信息
    var Add=window.Add=function(){
        // 这个idx表示当前大框显示的照片的下标
        this.idx=0;
        // 截取网址后缀
        this.id=location.search.slice(1);
        // 设置获取后台数据地址
        this.url="http://localhost/project-ule/json/details.json";
        var that=this;
        // 表示加载完数据后需要执行的操作
        this.load(function(){
            that.render();
            that.bindEvent();
        })
    }
    // 向后台请求数据
    Add.prototype.load=function(callback){
        var that=this;
        this.registerarr=JSON.parse(localStorage.getItem("register"))||[];
        $.ajax({
            url:this.url,
            dataType:"json",
            success(res){
                that.json=res;
                callback();
            }
        })
    }
    // 根据数据来加载渲染页面，这里要注意加载的动态数据范围，不要把固定的标签也动态生成这样会导致一系列不必要的麻烦
    Add.prototype.render=function(){
        var str1="";
        var str2="";
        for(var i=0;i<this.json.length;i++){
            if(this.id==this.json[i]["goodsid"]){
                str1=`<h3>${this.json[i]["tip"]}</h3>
                <p><span>特卖价</span><i>￥${this.json[i]["price1"]}</i><b>${this.json[i]["price2"]}.00</b></p>
                <div class="num"><span>数量</span><input id="shangpinnum" type="number" value="1"></div>
                <div class="add"><a href="javescript:;">立即抢购</a><s class="kl">加入购物车</s></div>`;
                for(var j=0;j<this.json[i]["url"].length;j++){
                    str2+=`<li><img class="xiao" src="${this.json[i]["url"][j]}" alt=""></li>`
                }
                
            }
        }
        $(str1).appendTo($("#right"));
        $(str2).appendTo($("#wrap"));
        // 渲染大框里的背景图片和放大镜里的背景图片（这里不给大框里用插入图片的方式来显示照片是写的时候发现这样写move在移动时会一直闪烁，改了之后就好了（忘了当时是否同时也改了大框的标签为固定的html标签））
        this.imgurl=$("#wrap").find(".xiao").eq(this.idx).attr("src");
        $("#smallimg").css("background-image",`url(${this.imgurl})`);
        $("#bigimg").css("background-image",`url(${this.imgurl})`)
    }
    // 绑定事件
    Add.prototype.bindEvent=function(){
        var that=this;
        // 给数据库绑定状态监听，获取最新的数据库数据
        window.addEventListener("storage",function(eve){
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
        })
        // 给添加购物车按钮绑定点击监听
        $("#right").on("click",".kl",function(){
            for(var i=0;i<that.registerarr.length;i++){
                // 先判断当前是否有用户登录
                if(that.registerarr[i]["isLogin"]){
                    // 因为onstorage只能监听其他页面的特点这里只能手动修改购物车框显示效果
                     $("#carNumber").html(parseInt($("#carNumber").html())+parseInt($("#shangpinnum").val()));
                    //  如果用户信息中的商品信息为0时（即第一次点击添加购物车这功能时，直接将商品信息存入数据库）
                    if(that.registerarr[i]["goods"].length==0){
                        // 商品信息的内容主要有三个：1.id 2.num 3.checked（根据这个状态来选择是否在购物车内被打钩，在商品详情页被点击的商品默认都需要打钩）
                        that.registerarr[i]["goods"].push({"id":that.id,num:$("#shangpinnum").val(),"checked":true});
                        localStorage.setItem("register",JSON.stringify(that.registerarr));
                    }else{
                        // 如果此时用户的商品信息数组已经有数据了，则先判断这个商品是否在这个用户的商品数组中（根据id来判断）
                        for(var j=0;j<that.registerarr[i]["goods"].length;j++){
                            // 如果已经有了则直接在原有的数值上加上这次数值
                            if(that.id==that.registerarr[i]["goods"][j]["id"]){
                                that.registerarr[i]["goods"][j]["num"]=parseInt(that.registerarr[i]["goods"][j]["num"])+parseInt($("#shangpinnum").val());
                                that.registerarr[i]["goods"][j]["checked"]=true;
                                localStorage.setItem("register",JSON.stringify(that.registerarr));
                                return;
                            }
                        }
                        // 如果没有这条商品，则在商品数组中追加进去
                        that.registerarr[i]["goods"].push({"id":that.id,num:$("#shangpinnum").val(),"checked":true});
                        localStorage.setItem("register",JSON.stringify(that.registerarr));
                    }
                    return;
                }
            }
            location.href = 'http://localhost/project-ule/login.html';
        })
    }
})();