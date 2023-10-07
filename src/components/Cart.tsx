import { useStore } from "@nanostores/solid";
import {
  $cart,
  removeItemFromCart,
  addItemToCart,
  clearCart,
  subtotal,
} from "../stores/cart";
import styles from "./cart.module.css";
import { Show, createSignal } from "solid-js";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const EmptyState = () => {
  return (
    <>
      <p class={styles.icon}>
        <span role="img" aria-label="hot dog">
          🌭
        </span>
      </p>
      <p class={styles.empty}>
        Your cart is empty! Add a sandwich kit or two and give flavor a chance.
      </p>
    </>
  );
};

const CheckoutNotice = () => {
  return <p class={styles.notice}>Checkout is not implemented yet</p>;
};

export const Cart = () => {
  const [showNotice, setShowNotice] = createSignal(false);
  const $subtotal = useStore(subtotal);
  const $cartItems = useStore($cart);
  const isEmpty = $cartItems.length === 0;

  return (
    <aside class={styles.cart}>
      <h2>This is your cart</h2>
      <Show when={!isEmpty} fallback={<EmptyState />}>
        <ul class={styles.item}>
          {Object.values($cartItems()).map((entry: CartItem) => (
            <li class={styles.item}>
              <span class={styles.quantity}>{entry.quantity}</span>
              <span class={styles.name}>{entry.item.title}</span>
              <span class={styles.remove}>
                <button
                  class={styles.remove}
                  onClick={() => removeItemFromCart(entry.item)}
                >
                  Remove
                </button>
              </span>
              <span class={styles.price}>
                {formatCurrency(entry.item.price)}
              </span>
            </li>
          ))}
        </ul>
        <div class={styles.details}>
          <p class={styles.subtotal}>
            <span class={styles.label}>Subtotal:</span>{" "}
            {formatCurrency($subtotal())}
          </p>
          <p class={styles.shipping}>
            <span class={styles.label}>Shipping:</span> <del>$10.00</del>
            <ins>FREE</ins>
          </p>
          <p class={styles.total}>
            <span class={styles.label}>Total:</span>{" "}
            {formatCurrency($subtotal())}
          </p>

          <p class={styles.checkout}>
            <button class="big-link" onClick={() => setShowNotice(true)}>
              Checkout
            </button>
          </p>

          <Show when={showNotice()}>
            <CheckoutNotice />
          </Show>
        </div>
      </Show>
    </aside>
  );
};
