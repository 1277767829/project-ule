define(
// cookie的增 删 获取
 window.setcookie=function(key,value,options){
    options=options ||{};
    var expires="";
    var d=new Date();
    d.setDate(d.getDate()+options.expires);
    expires=";expires="+d;
    var path=options.path ? ";path="+options.path : "";
    document.cookie=`${key}=${value}${expires}${path};`
}
);





























