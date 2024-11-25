import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductCart, Product } from '@/app/interfaces';

type Store = {
  cart: ProductCart[];
  createdAt: Date|null
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  addProductQuantity: (productId: number) => void;
  removeProductQuantity: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      createdAt: null,

      addProduct: (product) => {
        const { cart } = get();

        const productInCart = cart.some((item) => item.id === product.id);

        if (!productInCart) {
          if (cart.length == 0) {
            set({createdAt: new Date()})
          }
          set({ cart: [...cart, { ...product, quantity: 1 }] });

        } else {
          const updatedCartProducts = cart.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          set({ cart: updatedCartProducts });
        }
      },
      removeProduct: (id) => {
        const { cart } = get();
        const updatedCart = cart.filter((prod) => prod.id !== id)

        if (updatedCart.length == 0) {
          set({createdAt:null})
        }
        set({ cart: [...updatedCart ] });
      },
      removeProductQuantity: (productId) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === productId && item.quantity > 1) {
            return { ...item, quantity: item.quantity -1 };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      addProductQuantity: (productId) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity +1 };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      clearCart: () => {
        set({ cart: [] })
      }
    }),
    {
      name: 'products-cart',
    }
  )
);
