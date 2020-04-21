"use strict";
module.exports=function(){
    return{
        SetRouting:function(router){
            router.get("/",this.homePage);
        },
        homePage:function(req,res){
            return res.render("home",{title:"I am at home page"});
        }
    }
}