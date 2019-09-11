require.config({
    baseUrl:"js",      //基目录的默认起始点，以html文件作为起始点

    //以baseUrl指定的目录作为起始点
    paths:{
        "a":"jquery-1.12.3.min",
        "b":"Tab",
        "c":"Lou",
        "d":"breath",
        "e":"list",
        "f":"IndexLogin",
        "g":"CarNunmber"
    }
})


require(["a","b","c","d","e","f","g"],function(_,b,c,d,e,f,g){
    new b.tab();
    new c.lou();
    new d.breath();
    new e.list();
    new f.indexLogin();
    new g.carNumber();
})