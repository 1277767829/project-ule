;(function(){
    "use strict"
    var List=window.List=function(){
        this.$list=$("#list");
        this.$dt=$("#list").children("dt");
        this.url="http://localhost/project-ule/json/list.json";
        var that=this;
        this.road(function(){
            that.creat();
            that.bindEvent();
        });
    }
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
    List.prototype.creat=function(){
        this.strdd="";
        for(var i=0;i<this.json.length;i++){
            var strfenlei="";
            var strpinpai="";
            for(var j=0;j<this.json[i]["fenlei"].length;j++){
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
                            <span class="cur">分类</span>
                            <span>品牌</span>
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
        // this.$list[0].innerHTML+=this.strdd;
        $(this.strdd).appendTo(this.$list);
        // console.log(this.$list)
    }
    List.prototype.bindEvent=function(){
        this.$dd=$("#list").children("dd");
        var that=this;
        // console.log(this.$dd)
       
        this.$list.on("mouseover",this.$dt,function(event){
            console.log($(event.target),4)
            if($(event.target).index()<that.$dd.length){
                that.$dd.css("display","none")
                that.$dd.eq($(event.target).index()).css({"display":"block"});
            }else{
                that.$dd.css("display","none")
            }
            return false;
        })
        // this.$list.on("mouseenter",".dd",function(){
        //     $(event.target).css({"display":"block","background":"red"});
        //     console.log($(event.target))
        // })
        this.$list.on("mouseout",function(){
            that.$dd.css("display","none")
        })
      
    }
})();