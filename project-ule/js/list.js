define(function(){
    "use strict"
    //三级菜单功能的实现
    var List=function(){
        // 获取节点以及请求数据的地址
        this.$list=$("#list");
        this.$dt=$("#list").children("dt");
        this.url="http://localhost/project-ule/json/list.json";
        var that=this;
        //当ajax请求数据成功之后，渲染数据给页面增加内容并且绑定事件
        this.road(function(){
            that.creat();
            that.bindEvent();
        });
    }
    // 向后端请求json数据，同时传入回调函数，在请求数据成功后执行
    List.prototype.road=function(callback){
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
    // 在获取到json数据后，把数据渲染到页面上
    List.prototype.creat=function(){
        // 准备空字符串来接收dd标签的数据
        this.strdd="";
        for(var i=0;i<this.json.length;i++){
            // 准备空字符串来接收dd标签里的leifei标签内容和pinpai标签内容，每接收一个新的dd标签前都需要清空这两个字符串防止累加
            var strfenlei="";
            var strpinpai="";
            for(var j=0;j<this.json[i]["fenlei"].length;j++){
                // 准备接收fenlei标签内的li标签内容
                var strli="";
                for(var k=0;k<this.json[i]["fenlei"][j]["li"].length;k++){
                    strli+=`<li><a href="">${this.json[i]["fenlei"][j]["li"][k]}</a></li>`
                }
                strfenlei+=` <b>${this.json[i]["fenlei"][j]["b"]}</b>
                            <ul>${strli}</ul>`
            }
            for(var l=0;l<this.json[i]["pinpai"].length;l++){
                strpinpai+=`<li><a href=""><img src="${this.json[i]["pinpai"][l]}" alt=""></a></li>`
            }
            this.strdd+=` <dd class="dd">
                        <div class="title">
                            <span class="cur title-t">分类</span>
                            <span class="title-t">品牌</span>
                        </div>
                        <div class="content">
                            <div class="fenlei clear">
                                ${strfenlei}
                            </div>
                            <div class="pinpai clear">
                                <ul>
                                    ${strpinpai}
                                </ul>
                            </div>
                        </div>
                    </dd>`;
        }
        //！这里要注意添加到dl标签里的方式，因为只有dd标签是动态根据数据生成的而dt标签是html页面原有的，所以这里要选择appendTo。如果我们连dt也动态生成的话，这样后面绑定事件的时候就会很麻烦（因为这样你就需要里事件委托去绑定dt身上的事件，而dt里面的子元素也会通过事件冒泡来触发这就会导致你的this不是dt这个标签） 
        $(this.strdd).appendTo(this.$list);
    }
    // 给dl、dt绑定事件
    List.prototype.bindEvent=function(){
        this.$dd=$("#list").children("dd");
        var that=this;
        // 当鼠标移入dt标签时触发的事件（移入的dt相对应的dd显示，其他dd不显示），这里用mouseover而不是mouseenter：enter会导致在dt之间移动时不会触发事件
        this.$dt.on("mouseover",function(event){
            // 因为我这里json数据就两条没有和dt的数量对应上，所以要先判断一下index（）的值
            if($(this).index()<that.$dd.length){
                that.$dd.css("display","none")
                that.$dd.eq($(this).index()).css({"display":"block"});
            }else{
                that.$dd.css("display","none")
            }
        })
        // 利用事件委托的机制给dd里面的.title-t绑定移入事件（移入的.title-t相对应的下面内容显示，其他内容不显示）
        this.$list.on("mouseover",".title-t",function(event){
            console.log($(event.target).index(),1)
            $(this).addClass("cur").siblings().removeClass("cur");
            $(this).parent().siblings().children().eq($(this).index()).css("display","block").siblings().css("display","none");
        })
        // 然后给dl绑定事件（鼠标移出时，dd消失）
        this.$list.on("mouseleave",function(){
            that.$dd.css("display","none")
        })
    }
    return {
        "list":List
    }
});