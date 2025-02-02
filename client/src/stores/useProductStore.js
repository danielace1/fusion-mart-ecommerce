import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prevstate) => ({
        products: [...prevstate.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Failed to create product: " + error.message);
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      toast.error("Failed to fetch products: " + error.message);
      set({ loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: false });
    try {
      const res = await axios.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product: " + error.message);
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
        loading: false,
      }));
      toast.success("Product featured successfully");
    } catch (error) {
      toast.error("Failed to update product: " + error.message);
      set({ loading: false });
    }
  },
}));
