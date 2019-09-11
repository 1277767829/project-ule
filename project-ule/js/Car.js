;(function(){
    // 购物车实现的功能有：根据当前登录的用户来加载此用户的购物车信息
    var Car=window.Car=function(){
        // 请求后台数据的地址
        this.url="http://localhost/project-ule/json/goods.json";
        var that=this;
        // 当数据加载完之后需要执行的操作
        this.road(function(){
            that.render();
            that.heji();
            that.bindEvent();
        })
    }
    Car.prototype.road=function(callback){
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
    // 渲染购物车中tbody的内容
    Car.prototype.render=function(){
        var str="";
        for(var i=0;i<this.registerarr.length;i++){
            if(this.registerarr[i]["isLogin"]){
                this.goodsarr=this.registerarr[i]["goods"]||[];
                for(var j=0;j<this.json.length;j++){
                    for(var k=0;k<this.goodsarr.length;k++){
                        if(this.json[j]["goodsid"]==this.goodsarr[k]["id"]){
                            // 这里是根据商品信息中的checked属性来判断是否需要在复选框中打钩，不能直接在input标签中写checked=“true或者false”，因为只要你写了checked属性，不管等于什么复选框都会打钩的。
                            this.checkedState=this.goodsarr[k]["checked"]&&`checked="checked"`;
                            str+=`<tr id=${this.goodsarr[k]["id"]}>
                            <td class="lie1"><input class="checkbox" type="checkbox" ${this.checkedState}></td>
                            <td class="lie2"><img src=${this.json[j]["url"]} alt=""></td>
                            <td class="lie3"><a href="http://localhost/project-ule/details.html?${this.goodsarr[k]["id"]}">${this.json[j]["tip"]}</a></td>
                            <td class="lie4">￥<b>${this.json[j]["price1"]}</b></td>
                            <td class="lie5"><input class="number" type="number" value=${this.goodsarr[k]["num"]} min='1'></td>
                            <td class="lie6">￥<b>${this.json[j]["price1"]*this.goodsarr[k]["num"]}</b></td>
                            <td class="lie7"><i>删除</i> </td>
                        </tr>`
                        }
                    }
                }
                $("tbody").html(str);
                return;
            }
        }
        $("tbody").html(str);
    }
    // 这里其实就是加载购物车中的tfooty部分，根据每行是否被打钩来统计商品总数和商品总价
    Car.prototype.heji=function(){
        this.numcount=0;
        this.pricecount=0;
        this.trs=$("tbody").find("tr")||[];
        for(var i=0;i<this.trs.length;i++){
            if(this.trs[i].firstElementChild.firstElementChild.checked){
                this.numcount+=parseInt( this.trs[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].value);
                this.pricecount+=parseInt( this.trs[i].getElementsByTagName("td")[5].getElementsByTagName("b")[0].innerHTML);
            }
        }
        var str2=` <tr>
                        <td class="lie1">总计：</td>
                        <td class="lie2"></td>
                        <td class="lie3"><s>商品总数量</s></td>
                        <td class="lie4"><i>${this.numcount}</i></td>
                        <td class="lie5">总价格</td>
                        <td class="lie6">￥<b>${this.pricecount}</b></td>
                        <td class="lie7"><a href="javescript:;">结算</a> </td>
                    </tr>`
        $("tfoot").html(str2)
    }
    
    Car.prototype.bindEvent=function(){
        var that=this;
        // 给数据添加监听，当数据库发生改变时重新加载tbody与tfoot
        window.addEventListener("storage",function(eve){
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
            that.render();
            that.heji();
        })
        // 给删除键添加点击事件监听，当它被点击时在页面删除这一行，同时需要在数据库中更新商品信息，然后再加载一遍tfoot（因为有可能把打钩的删除了）
        $("tbody").on("click","i",function(){
            this.parentNode.parentNode.remove();
            for(var i=0;i<that.goodsarr.length;i++){
                if(this.parentNode.parentNode.getAttribute("id")==that.goodsarr[i].id){
                    that.goodsarr.splice(i,1);
                }
            }
            for(var j=0;j<that.registerarr.length;j++){
                if(that.registerarr[j]["isLogin"]){
                    that.registerarr[j]["goods"]=that.goodsarr;
                    localStorage.setItem("register",JSON.stringify(that.registerarr));
                }
            }
            that.heji();
        })
        // 给tbody中的复选框添加点击监听
        $("tbody").on("click",".checkbox",function(){
            that.heji();
            // 根据复选框的状态来更新数据库中商品checked状态
            if(this.checked){
                for(var i=0;i<that.goodsarr.length;i++){
                    if(this.parentNode.parentNode.id==that.goodsarr[i].id){
                       that.goodsarr[i]["checked"]=true;
                    }
                }
                for(var j=0;j<that.registerarr.length;j++){
                    if(that.registerarr[j]["isLogin"]){
                        that.registerarr[j]["goods"]=that.goodsarr;
                        localStorage.setItem("register",JSON.stringify(that.registerarr));
                    }
                }
            }else{
                for(var i=0;i<that.goodsarr.length;i++){
                    if(this.parentNode.parentNode.id==that.goodsarr[i].id){
                       that.goodsarr[i]["checked"]=false;
                    }
                }
                for(var j=0;j<that.registerarr.length;j++){
                    if(that.registerarr[j]["isLogin"]){
                        that.registerarr[j]["goods"]=that.goodsarr;
                        localStorage.setItem("register",JSON.stringify(that.registerarr));
                    }
                }
            }
            // 只要有一个没被选中则thead中的全选框就不能被打钩
            $(this).each(function(i){
                if(!this.checked){
                    $("#quanxuan")[0].checked="";
                }
            })
        })
        // 给所有数值表添加监听，当它值发生改变时，更新数据库，同时更改这条商品的总价，再重新加载一遍tfoot
        $("tbody").on("input",".number",function(){
            $(this).parent().siblings(".lie6").children("b").html(this.value*$(this).parent().siblings(".lie4").children("b").html());
            for(var i=0;i<that.goodsarr.length;i++){
                if(this.parentNode.parentNode.id==that.goodsarr[i].id){
                   that.goodsarr[i]["num"]=this.value;
                }
            }
            for(var j=0;j<that.registerarr.length;j++){
                if(that.registerarr[j]["isLogin"]){
                    that.registerarr[j]["goods"]=that.goodsarr;
                    localStorage.setItem("register",JSON.stringify(that.registerarr));
                }
            }
            that.heji();
        })
        // 给全选框添加点击监听，根据全选框的状态来改变tbody中所有复选框的状态，然后改变数据库中商品checked的状态，再加载一遍tfoot；
        $("#quanxuan").on("click",function(){
            if(this.checked){
                $(".checkbox").each(function(i){
                    this.checked="checked";
                    that.heji();
                })
                for(var i=0;i<that.goodsarr.length;i++){
                       that.goodsarr[i]["checked"]=true;
                }
                for(var j=0;j<that.registerarr.length;j++){
                    if(that.registerarr[j]["isLogin"]){
                        that.registerarr[j]["goods"]=that.goodsarr;
                        localStorage.setItem("register",JSON.stringify(that.registerarr));
                    }
                }
            }else{
                $(".checkbox").each(function(i){
                    this.checked="";
                    that.heji();
                })
                for(var i=0;i<that.goodsarr.length;i++){
                       that.goodsarr[i]["checked"]=false;
                }
                for(var j=0;j<that.registerarr.length;j++){
                    if(that.registerarr[j]["isLogin"]){
                        that.registerarr[j]["goods"]=that.goodsarr;
                        localStorage.setItem("register",JSON.stringify(that.registerarr));
                    }
                }
            }
        })
    }
})();