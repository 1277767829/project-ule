;(function(){
    var Add=window.Add=function(){
        this.idx=0;
        this.id=location.search.slice(1);
        this.url="http://localhost/project-ule/json/details.json";
        var that=this;
        this.load(function(){
            that.render();
            that.bindEvent();
        })
    }
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
        this.imgurl=$("#wrap").find(".xiao").eq(this.idx).attr("src");
        $("#smallimg").css("background-image",`url(${this.imgurl})`);
        $("#bigimg").css("background-image",`url(${this.imgurl})`)
    }
    Add.prototype.bindEvent=function(){
        var that=this;
        window.addEventListener("storage",function(eve){
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
        })
        $("#right").on("click",".kl",function(){
            for(var i=0;i<that.registerarr.length;i++){
                if(that.registerarr[i]["isLogin"]){
                     $("#carNumber").html(parseInt($("#carNumber").html())+parseInt($("#shangpinnum").val()));
                    that.state=true;
                    if(that.registerarr[i]["goods"].length==0){
                        that.registerarr[i]["goods"].push({"id":that.id,num:$("#shangpinnum").val(),"checked":true});
                        localStorage.setItem("register",JSON.stringify(that.registerarr));
                    }else{
                        for(var j=0;j<that.registerarr[i]["goods"].length;j++){
                            if(that.id==that.registerarr[i]["goods"][j]["id"]){
                                that.registerarr[i]["goods"][j]["num"]=parseInt(that.registerarr[i]["goods"][j]["num"])+parseInt($("#shangpinnum").val());
                                that.registerarr[i]["goods"][j]["checked"]=true;
                                localStorage.setItem("register",JSON.stringify(that.registerarr));
                                return;
                            }
                        }
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