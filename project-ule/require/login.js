require.config({
    baseUrl:"js",      //基目录的默认起始点，以html文件作为起始点

    //以baseUrl指定的目录作为起始点
    paths:{
        "a":"Login",
        "b":"TitleLogin"
    }
})
require(["a","b"],function(a,b){
    new a.login();
    new b.titleLogin();
})