;(function(){
    var Car=window.Car=function(){
        this.url="http://localhost/project-ule/json/goods.json";
        var that=this;
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
    Car.prototype.render=function(){
        var str="";
        for(var i=0;i<this.registerarr.length;i++){
            if(this.registerarr[i]["isLogin"]){
                this.goodsarr=this.registerarr[i]["goods"]||[];
                for(var j=0;j<this.json.length;j++){
                    for(var k=0;k<this.goodsarr.length;k++){
                        if(this.json[j]["goodsid"]==this.goodsarr[k]["id"]){
                            this.checkedState=this.goodsarr[k]["checked"]&&`checked="checked"`;
                            str+=`<tr id=${this.goodsarr[k]["id"]}>
                            <td class="lie1"><input class="checkbox" type="checkbox" ${this.checkedState}></td>
                            <td class="lie2"><img src=${this.json[j]["url"]} alt=""></td>
                            <td class="lie3"><span>${this.json[j]["tip"]}</span></td>
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
        window.addEventListener("storage",function(eve){
            that.registerarr=JSON.parse(localStorage.getItem("register"))||[];
            that.render();
            that.heji();
        })
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
        $("tbody").on("click",".checkbox",function(){
            that.heji();
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
            $(this).each(function(i){
                if(!this.checked){
                    $("#quanxuan")[0].checked="";
                }
            })
        })
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