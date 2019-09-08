;(function(){
    var Render=window.Render=function(){
        this.id=location.search.slice(1);
        this.url="http://localhost/project-ule/json/details.json";
        var that=this;
        this.load(function(){
            that.render();
        })
    }
    Render.prototype.load=function(callback){
        var that=this;
        $.ajax({
            url:this.url,
            dataType:"json",
            success(res){
                that.json=res;
                callback();
            }
        })
    }
    Render.prototype.render=function(){
        var str1="";
        var str2="";
        for(var i=0;i<this.json.length;i++){
            if(this.id==this.json[i]["goodsid"]){
                str1=`<h3>${this.json[i]["tip"]}</h3>
                <p><span>特卖价</span><i>￥${this.json[i]["price1"]}</i><b>${this.json[i]["price2"]}.00</b></p>
                <div class="num"><span>数量</span><input type="number" value="1"></div>
                <div class="add"><a href="">立即抢购</a><a href="">加入购物车</a></div>`;
                for(var j=0;j<this.json[i]["url"].length;j++){
                    str2+=`<li><img class="xiao" src="${this.json[i]["url"][j]}" alt=""></li>`
                }
                
            }
        }
        $(str1).appendTo($("#right"));
        $(str2).appendTo($("#wrap"))
    }
})();