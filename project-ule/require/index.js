require.config({
    baseUrl:"js",      //基目录的默认起始点，以html文件作为起始点

    //以baseUrl指定的目录作为起始点
    paths:{
        "a":"jquery-1.12.3.min",
        "d":"breath",
        "e":"list",
        "b":"Tab",
        "c":"Lou",
        "f":"IndexLogin",
        "g":"CarNunmber"
    }
})


require(["a","b","c","d","e","f","g"],function(){
    new List();
    new Breath();
    new Tab();
    new Lou();
    new CarNumber();
    new IndexLogin();
})