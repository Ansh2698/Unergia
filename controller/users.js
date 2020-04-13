"use strict";
module.exports=function(Product,local,fs,async){
    return{
        SetRouting:function(router){
            router.get("/",this.homePage);
            router.get("/submit",this.GetSubmitpage);
            router.get("/product-compare/:name",this.getCompare);
            router.post("/submit",local.Upload.single("productImage"),this.SubmitProduct);
        },
        homePage:function(req,res){
            async.parallel([
                function(callback){
                    Product.find({},function(err,result){
                        callback(err,result);
                    })
                }
            ],function(err,results){
                var res1=results[0];
                res.render("home",{data:res1});
            })
        },
        GetSubmitpage:function(req,res){
            return res.render("submit");
        },
        SubmitProduct:function(req,res){
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var finalImg = {
                contentType: req.file.mimetype,
                image:  Buffer.from(encode_image, 'base64')
            };
            var newProduct=new Product();
            newProduct.Name=req.body.Name;
            newProduct.Description=req.body.Description;
            newProduct.ProductImage.data=finalImg.image;
            newProduct.ProductImage.contentType=finalImg.contentType;
            newProduct.Price=req.body.Price;
            newProduct.save(function(err,msg){
                res.redirect("/");
            })
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