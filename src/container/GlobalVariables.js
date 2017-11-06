global.verifies = [];
global.login_user = {};
global.shoppingCarts = [];
global.addressList = [];





export function getCarts() {
    return global.shoppingCarts;
}

export function pushProductToCart(product) {
    global.shoppingCarts.push(product);

}