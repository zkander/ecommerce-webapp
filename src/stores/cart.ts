import { computed, map } from "nanostores";

export const $cart = map<Record<number, CartItem>>({});

export function addItemToCart(item: ShopItem) {
  const cart = $cart.get();
  const cartItem = cart[item.id];
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart[item.id] = { item, quantity: 1 };
  }
  $cart.set(cart);
}

export function removeItemFromCart(item: ShopItem) {
  // @ts-ignore
  const cart = $cart.get();
  const cartItem = cart[item.id];
  if (cartItem) {
    cartItem.quantity -= 1;
    if (cartItem.quantity === 0) {
      delete cart[item.id];
    }
  }
  $cart.set(cart);
}

export function clearCart() {
  $cart.set({});
}

export const subtotal = computed($cart, (cartItems) => {
  let subtotal = 0;
  Object.values(cartItems).forEach((cartItem) => {
    if (!cartItem) return;
    subtotal += cartItem.quantity * cartItem.item.price;
  });
  return subtotal;
});
