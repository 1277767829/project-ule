define(function(){
    // 动态加载页面商品信息
    var Goods=function(){
        // 请求后台的数据地址
        this.url="http://localhost/project-ule/json/goods.json";
        var that=this;
        // 这里当加载完后台传输过来的数据后要执行的操作
        this.road(function(){
            that.render();
        })
    }
    // 请求后台数据
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
    // 根据请求到的数据来加载渲染页面内容
    Goods.prototype.render=function(){
        str="";
        for(var i=0;i<this.json.length;i++){
            // 这里要注意给a标签添加href时要添加后缀，然后商品详情页根据这个后缀来加载页面
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
    return {
        "goods":Goods
    }
});