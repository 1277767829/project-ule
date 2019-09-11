require.config({
    baseUrl:"js",      //基目录的默认起始点，以html文件作为起始点

    //以baseUrl指定的目录作为起始点
    paths:{
        "a":"jquery-1.12.3.min",
        "b":"goods",
        "c":"IndexLogin",
        "d":"CarNunmber"
    }
})


require(["a","b","c","d"],function(_,b,c,d){
    new b.goods();
    new c.indexLogin();
    new d.carNumber();
})