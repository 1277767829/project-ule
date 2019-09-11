require.config({
    baseUrl:"js",      //基目录的默认起始点，以html文件作为起始点

    //以baseUrl指定的目录作为起始点
    paths:{
        "a":"cookie1",
        "b":"Login",
        "c":"TitleLogin",
        "d":"cookie2",
        "e":"cookie3"
    }
})


require(["a","b","c","d","e"],function(a,b){
    new IndexLogin();
    new Login();
})