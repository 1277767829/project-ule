define(
     window.getcookie=function(key){
        var arr=document.cookie.split(";")
        for(var i=0;i<arr.length;i++){
            if(key==arr[i].split("=")[0]){
                return arr[i].split("=")[1];
            }
        }
        return '';
    }
    );