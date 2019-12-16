document.onload =CartTotal();
function CartTotal() {
    let total = 0;
    const price = document.getElementsByClassName("shop-item-price");
    const quantity = document.getElementsByClassName("cart-quantity");
    // total += (price * quantity);
    // total = Math.round(total * 100) / 100;
   
    for (let i = 0; i < price.length; i++) {
        total +=(parseFloat(price[i].innerText)*parseFloat(quantity[i].innerText));
    }

    document.getElementById("cart-total-price").innerText = total+(total*0.07) + "฿";
    document.getElementById("tax").innerText = (total * 0.07) + "฿";
    document.getElementById("point").innerText = Math.trunc((total)/1000) ;
    
};

// document.onload =Point();
// function Point(){
//     let earnPoint = 0;
//     const totalPrice = document.getElementsByClassName("cart-total-price");
//     const point 

// };




