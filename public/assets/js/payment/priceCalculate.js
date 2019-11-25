function CartTotal() {
    const total = 0;
    const price = parseFloat(document.getElementsByClassName("shop-item-price"));
    const quantity = parseFloat(document.getElementsByClassName("cart-quantity"));
    total += (price * quantity);
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price").innerText = total + "฿";
    
};