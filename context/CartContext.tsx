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
  COUPON_CODES,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
} from "@/lib/constants";

const STORAGE_KEY = "kits-crafts-cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  bundleDiscount: number;
  couponCode: string | null;
  couponDiscount: number;
  shipping: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  total: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isOrderConfirmed: boolean;
  orderNumber: string | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
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
  const [couponCode, setCouponCode] = useState<string | null>(null);
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
    if (!product.inStock) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity }
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
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode(null);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    const coupon = COUPON_CODES[normalized];
    if (!coupon) {
      return { success: false, message: "קוד הקופון לא נמצא או שאינו בתוקף" };
    }
    setCouponCode(normalized);
    return { success: true, message: coupon.label };
  }, []);

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
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

  const amountAfterDiscount = subtotal - bundleDiscount;

  const couponDiscount = useMemo(() => {
    if (!couponCode) return 0;
    const coupon = COUPON_CODES[couponCode];
    if (!coupon) return 0;
    return Math.round(amountAfterDiscount * (coupon.percent / 100));
  }, [couponCode, amountAfterDiscount]);

  const amountAfterCoupon = amountAfterDiscount - couponDiscount;

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return amountAfterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }, [items.length, amountAfterDiscount]);

  const freeShippingRemaining = useMemo(
    () => Math.max(0, FREE_SHIPPING_THRESHOLD - amountAfterDiscount),
    [amountAfterDiscount]
  );

  const freeShippingProgress = useMemo(
    () =>
      Math.min(
        100,
        Math.round((amountAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100)
      ),
    [amountAfterDiscount]
  );

  const total = amountAfterCoupon + shipping;

  const confirmOrder = useCallback(() => {
    setOrderNumber(`HS-${Math.floor(10000 + Math.random() * 90000)}`);
    setIsOrderConfirmed(true);
  }, []);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    bundleDiscount,
    couponCode,
    couponDiscount,
    shipping,
    freeShippingRemaining,
    freeShippingProgress,
    total,
    isCartOpen,
    isCheckoutOpen,
    isOrderConfirmed,
    orderNumber,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
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
