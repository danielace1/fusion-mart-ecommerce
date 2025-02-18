import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");

      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      console.log("Error in getCartItem: " + error.message);
      toast.error("Failed to get cart items: " + error.message);
    }
  },

  addToCart: async (product) => {
    try {
      const res = await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart successfully");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error) {
      console.log("Error in addToCart: " + error.message);
      toast.error("Failed to add product to cart: " + error.message);
    }
  },

  removeFromCart: async (productId) => {
    await axios.delete("/cart", { data: { productId } });
    set((prevState) => ({
      cart: prevState.cart.filter((item) => item._id !== productId),
    }));

    get().calculateTotals();
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    await axios.put(`/cart/${productId}`, { quantity });

    set((prevState) => ({
      cart: prevState.cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    }));

    get().calculateTotals();
  },

  getMyCoupon: async (params) => {},

  calculateTotals: () => {
    const { cart, coupon } = get();

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercent / 100);
      total = subtotal - discount;
    }

    set({ total, subtotal });
  },
}));
