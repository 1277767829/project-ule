;(function(){
    var Goods=window.Goods=function(){
        this.url="http://localhost/project-ule/json/goods.json";
        var that=this;
        this.road(function(){
            that.render();
        })
    }
    Goods.prototype.road=function(callback){
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
    Goods.prototype.render=function(){
        str="";
        for(var i=0;i<this.json.length;i++){
            str+=`<li>
                <a target="_blank" href="http://localhost/project-ule/details.html?${this.json[i]["goodsid"]}">
                    <img src="${this.json[i]["url"]}" alt="">
                    <p>${this.json[i]["tip"]}</p>
                    <div class="bottom">
                        <i>￥</i>
                        <b>${this.json[i]["price1"]}</b>
                        <span>￥${this.json[i]["price2"]}.00</span>
                        <s>立即购买</s>
                    </div>
                </a>
            </li>`
        }
        $(str).appendTo($("#good"));
    }
})();