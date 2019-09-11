define(
     window.deletecookie=function(key,options){
        options=options||{};
        options.expires=-1;
        //将key的value值直接修改为1，然后设置它的时间为-1直接删除
        setcookie(key,1,options); 
    }
);