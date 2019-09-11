require.config({
    baseUrl:"js",      //基目录的默认起始点，以html文件作为起始点

    //以baseUrl指定的目录作为起始点
    paths:{
        "a":"jquery-1.12.3.min",
        "b":"details-Add",
        "c":"amplification",
        "d":"IndexLogin",
        "e":"CarNunmber"
    }
})


require(["a","b","c","d","e"],function(a,b){
    new Add();
    new Amplification();
    new IndexLogin();
    new CarNumber();
})