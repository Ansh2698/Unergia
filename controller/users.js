"use strict";
module.exports=function(Product,local,fs,async){
    return{
        SetRouting:function(router){
            router.get("/",this.homePage);
            router.get("/submit",this.GetSubmitpage);
            router.get("/product-compare/:name",this.getCompare);
        },
        homePage:function(req,res){
            async.parallel([
                function(callback){
                    Product.find({},function(err,result){
                        callback(err,result);
                    })
                },
                function(callback){
                    Product.find({}).sort({$natural:-1}).limit(2).exec(function(err,result){
                        callback(err,result);
                    })
                }
            ],function(err,results){
                var res1=results[0];
                var res2=results[1];
                res.render("home",{data:res1,data1:res2});
            })
        },
        GetSubmitpage:function(req,res){
            return res.render("submit");
        },
        getCompare:function(req,res){
            var name=req.params.name;
            var Id=name.split("+");
            async.parallel([
                function(callback){
                    Product.findOne({"_id":Id[0]},function(err,result){
                        callback(err,result);
                    });
                },
                function(callback){
                    Product.findOne({"_id":Id[1]},function(err,result){
                        callback(err,result);
                    });
                }
            ],function(err,results){
                var res1=results[0];
                var res2=results[1];
                res.render("Compare-product",{data1:res1,data2:res2});
            });
        }
    }
}