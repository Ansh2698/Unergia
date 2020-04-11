var express= require("express");
var bodyParser=require("body-parser");
var http=require("http");
var app= express();
var container=require("./container");
container.resolve(function(users){
    var app=SetExpress();
    function SetExpress(){
        var app=express();
        var server=http.createServer(app);
        server.listen(5000,function(){
            console.log("server is running on port 5000");
        })
        Configure(app);
        var router=require("express-promise-router")();
        users.SetRouting(router);
        app.use(router);
    }
    function Configure(app){
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
})