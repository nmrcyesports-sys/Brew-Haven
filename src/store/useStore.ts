import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isBestseller?: boolean;
  isVegetarian?: boolean;
  ingredients?: string[];
  sizes?: { name: string; price: number }[];
  addOns?: { name: string; price: number }[];
}

export interface CartItem {
  cartItemId: string; // Unique ID for the cart item entry
  product: Product;
  quantity: number;
  size?: string;
  addOns?: string[];
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  points: number;
  role: 'customer' | 'admin' | 'staff';
}

interface AppState {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // UI
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  
  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),

      cart: [],
      addToCart: (item) => {
        set((state) => ({
          cart: [...state.cart, { ...item, cartItemId: Math.random().toString(36).substring(2, 9) }],
          isCartOpen: true, // Open cart when adding item
        }));
      },
      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        }));
      },
      updateQuantity: (cartItemId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      isCartOpen: false,
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      products: [],
      setProducts: (products) => set({ products }),
    }),
    {
      name: 'cafe-storage',
      partialize: (state) => ({ cart: state.cart, user: state.user }),
    }
  )
);
