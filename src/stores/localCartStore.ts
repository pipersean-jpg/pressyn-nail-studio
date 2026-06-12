import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface LocalCartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  color?: string;
  quantity: number;
}

interface LocalCartStore {
  items: LocalCartItem[];
  addItem: (item: Omit<LocalCartItem, "quantity">) => void;
  updateQuantity: (id: string, color: string | undefined, quantity: number) => void;
  removeItem: (id: string, color: string | undefined) => void;
  clearCart: () => void;
}

const keyOf = (id: string, color?: string) => `${id}__${color ?? ""}`;

export const useLocalCartStore = create<LocalCartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        const k = keyOf(item.id, item.color);
        const existing = items.find((i) => keyOf(i.id, i.color) === k);
        if (existing) {
          set({ items: items.map((i) => (keyOf(i.id, i.color) === k ? { ...i, quantity: i.quantity + 1 } : i)) });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },
      updateQuantity: (id, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, color);
          return;
        }
        set({ items: get().items.map((i) => (keyOf(i.id, i.color) === keyOf(id, color) ? { ...i, quantity } : i)) });
      },
      removeItem: (id, color) => {
        set({ items: get().items.filter((i) => keyOf(i.id, i.color) !== keyOf(id, color)) });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "pressyn-local-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);