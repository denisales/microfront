import { create } from "zustand";

export interface Product {
  name: string;
  id: number;
  price: number
}
interface ProductCart extends Product {
  date: number;
}

interface CartState {
  products: ProductCart[];
  addCart: (product: Product) => void;
}

export const useCartStore = create<CartState>()((set) => ({
  products: [],
  addCart: (product) => {
    const newProduct = { ...product, date: new Date().getTime() };
    return set((state) => ({ products: [...state.products, newProduct] }));
  },
}));

export const useCartStoreTotalPrice = () => {
    const total = useCartStore(s => s.products.reduce((total, current) => total + current.price, 0));
    return total;
}
