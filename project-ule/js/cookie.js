// cookie的增 删 获取
function setcookie(key,value,options){
    options=options ||{};
    var expires="";
    var d=new Date();
    d.setDate(d.getDate()+options.expires);
    expires=";expires="+d;
    var path=options.path ? ";path="+options.path : "";
    document.cookie=`${key}=${value}${expires}${path};`
}
function deletecookie(key,options){
    options=options||{};
    options.expires=-1;
    //将key的value值直接修改为1，然后设置它的时间为-1直接删除
    setcookie(key,1,options); 
}
function getcookie(key){
    var arr=document.cookie.split(";")
    for(var i=0;i<arr.length;i++){
        if(key==arr[i].split("=")[0]){
            return arr[i].split("=")[1];
        }
    }
    return ' ';
}





























