"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product, CartItem } from "@/types/product";
import {
  BUNDLE_DISCOUNT_PERCENT,
  BUNDLE_MIN_ITEMS,
  MAX_QUANTITY_PER_ITEM,
} from "@/lib/constants";

const STORAGE_KEY = "kits-crafts-cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  bundleDiscount: number;
  total: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isOrderConfirmed: boolean;
  orderNumber: string | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  confirmOrder: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadStoredItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id
            ? {
                ...i,
                quantity: Math.min(
                  i.quantity + quantity,
                  MAX_QUANTITY_PER_ITEM
                ),
              }
            : i
        );
      }
      return [
        ...prev,
        { productId: product.id, quantity, product },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.min(quantity, MAX_QUANTITY_PER_ITEM) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  const bundleDiscount = useMemo(() => {
    if (itemCount >= BUNDLE_MIN_ITEMS) {
      return Math.round(subtotal * (BUNDLE_DISCOUNT_PERCENT / 100));
    }
    return 0;
  }, [itemCount, subtotal]);

  const total = subtotal - bundleDiscount;

  const confirmOrder = useCallback(() => {
    setOrderNumber(`KC-${Math.floor(10000 + Math.random() * 90000)}`);
    setIsOrderConfirmed(true);
  }, []);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    bundleDiscount,
    total,
    isCartOpen,
    isCheckoutOpen,
    isOrderConfirmed,
    orderNumber,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    openCheckout: () => {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    },
    closeCheckout: () => {
      setIsCheckoutOpen(false);
      setIsOrderConfirmed(false);
      setOrderNumber(null);
    },
    confirmOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
