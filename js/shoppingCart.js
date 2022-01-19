
var cart = [];
loadCart();
addToCheckOut();

    addToCheckOut();
    $(".addToCart").on('click',function () {
        var name = $(this).attr('data-name');
        var price = $(this).attr('data-price');
            console.log(name);
        var obj = {
            name: name,
            price: price,
               quantity: 1
        };
//            check sp co trong gio hang hay chua
        var flag = false;
        for( var i=0 ; i<cart.length ; i++){
            if(cart[i].name == obj.name){
                flag = true;
                break;
            }
        }
//            sp chua co trong gio hang
        if(flag === false){
            obj.quantity = 1;
            cart.push(obj);
        }else{ /*san pham co trong gio hang*/
            cart[i].quantity += 1;
        }
        addToCheckOut();
        saveCart();

        /*Báo sản phẩm đã đc thêm vào giỏ hàng*/
        var k = document.getElementById("snackbar");
        k.className = "show";
        setTimeout(function(){
            k.className = k.className.replace("show", "");
        }, 1500);
    });


function saveCart() {
    localStorage.ShoppingCart = JSON.stringify(cart);
}
function loadCart() {
    cart = JSON.parse(localStorage.ShoppingCart);
}


function addToCheckOut() {
    $("#body-payment").empty();
    $("#total").empty();
    $("#counter").empty();
    var bodyPayment = document.getElementById("body-payment");
    var counter = document.getElementById("counter");
    var total = document.getElementById("total");
    var totalPrice = 0;
    var totalCount = 0;
    if(cart.length == 0){
        bodyPayment.innerHTML += '<div class="col-md-12">'
            + '<p><span class="glyphicon glyphicon-paperclip" style="color: #1BBC9B"></span>'
            + ' Bạn chưa có sản phẩm nào trong giỏ hàng!</p>'
            + '</div>'
        ;
        totalCount = 0;
    }
    else{
        for(var i = 0; i<cart.length ; i++){
            bodyPayment.innerHTML += '<div class="col-md-12">'
                + '<div class="col-md-5 col-sm-5 col-xs-5">' + cart[i].name + '</div>'
                + '<div class="col-md-3 col-sm-3 col-xs-3"><input type="number" onchange="changeQuantity(this,' + i + ')" value="' + cart[i].quantity + '" min="0" step="1"></div>'
                + '<div class="col-md-3 col-sm-3 col-xs-3">' + (((cart[i].price)*(cart[i].quantity))/1000).toFixed(3) + ' .000 VNĐ</div>'
                + '<div class="col-md-1 col-sm-1 col-xs-1"><span class="glyphicon glyphicon-trash trash" onclick="removeProduct(' + i + ')"></span></div>'
                + '</div>';
            totalPrice += (cart[i].price)*(cart[i].quantity);
            totalCount +=parseInt(cart[i].quantity);
        }
    }
    total.innerHTML = ((totalPrice)/1000).toFixed(3) + ' .000 VNĐ';
    counter.innerHTML = totalCount;
    saveCart();
    loadCart();
}

/*Xóa 1 phần tử trong cart[]*/
function removeProduct(i) {
//        check sp thứ n trong cart[] co n = tham số truyền vào thi xoa phan tu do
    for( var n = 0 ; n<cart.length ; n++){
        if(i == n){
            cart.splice(n,1);
            break;
        }
    }
    addToCheckOut();
}

/* Xóa tất cả phẩn tử trong cart[]*/
function clearAll() {
    for( var i = 0 ; i<cart.length ; i++){
        cart.splice(i,cart.length);
    }
    addToCheckOut();
    saveCart();
}

/*function thay đổi input quantity*/
function changeQuantity(e,j) {
    var qttValue = e.value;
    if(qttValue > 0 ){
        for( var i = 0 ; i<cart.length ; i++){
            if(j == i){
                cart[i].quantity = qttValue;
                break;
            }
        }
        addToCheckOut();
    }
    else{
        removeProduct(j);
    }
}


window.onload = function () {
    loadCart();
};

// /*Page Thanh toán*/
// $(document).ready(function () {
//     $("#ct-1").show(function () {
//         $("#ct-2, #ct-3").hide();
//     });
//     $("#title-1").click(function () {
//         $("#ct-1").toggle(300);
//         $("#ct-2").hide(300);
//         $("#ct-3").hide(300);
//     });
//     $("#title-2").click(function () {
//         $("#ct-2").toggle(300);
//         $("#ct-1").hide(300);
//         $("#ct-3").hide(300);
//     });
//     $("#title-3").click(function () {
//         $("#ct-3").toggle(300);
//         $("#ct-1").hide(300);
//         $("#ct-2").hide(300);
//     });
//     $("#continue-1").click(function () {
//         $("#ct-2").show(300);
//         $("#ct-1").hide(300);
//     });
//     $("#continue-2").click(function () {
//         $("#ct-3").show(300);
//         $("#ct-2").hide(300);
//     });
// });