$(document).ready(function(){
    var product_Id=new Array();
    $(".add-card").on("click",function(e){
        e.preventDefault();
        var Id=$(this).siblings(".Product-id").val();
        product_Id.push(Id);
        if(product_Id.length==2){
            var Id=product_Id[0]+"+"+product_Id[1];
            product_Id=[];
            location.href="/product-compare/"+Id;
        }
    });
})