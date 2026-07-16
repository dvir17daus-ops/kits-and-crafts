"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Check,
  Flame,
  Minus,
  Plus,
  Ruler,
  Clock,
  Gauge,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useFlyToCart } from "@/context/FlyToCartContext";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/utils/formatPrice";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";
import { cn } from "@/lib/utils";

function LowStockNotice({ stockCount }: { stockCount: number }) {
  return (
    <p className="mt-2 flex items-center gap-1 text-xs font-bold text-error">
      <Flame className="h-3.5 w-3.5" aria-hidden="true" />
      נותרו {stockCount} בלבד במלאי!
    </p>
  );
}

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();
  const { fly } = useFlyToCart();
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hover: false });
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    fly(product.image, imageRef.current);
    showToast(
      quantity > 1 ? `${quantity} יחידות נוספו לעגלה` : "נוסף לעגלה",
      { label: "צפה בעגלה", onClick: openCart }
    );
    setQuantity(1);
  };

  const decreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((q) => Math.max(1, q - 1));
  };

  const increaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((q) => q + 1);
  };

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    setQuantity(digitsOnly === "" ? 0 : parseInt(digitsOnly, 10));
  };

  const handleQuantityInputBlur = () => {
    setQuantity((q) => (q < 1 ? 1 : q));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -7, y: px * 7, hover: true });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0, hover: false });

  return (
    <article
      ref={cardRef}
      className="card-premium group cursor-pointer overflow-hidden will-change-transform"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${
          tilt.hover ? -4 : 0
        }px)`,
        transition: tilt.hover
          ? "transform 0.08s linear"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(product)}
    >
      <div
        ref={imageRef}
        className="relative m-3 aspect-square overflow-hidden rounded-xl bg-cream-dark"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          <Badge>{product.ageGroup}</Badge>
          {product.isFeatured && (
            <Badge variant="bestseller">
              <Sparkles className="mr-1 h-3 w-3" aria-hidden="true" />
              הכי נמכר
            </Badge>
          )}
          {product.fairRecommended && (
            <Badge variant="gold">מומלץ ליריד</Badge>
          )}
        </div>
        {product.isDeal && product.discountPercent && (
          <div className="absolute right-2 top-2 rounded-full bg-gradient-to-br from-pink to-[#e85c82] px-2.5 py-1 text-xs font-bold text-white shadow-[0_4px_10px_-2px_rgba(255,143,171,0.6)]">
            -{product.discountPercent}%
          </div>
        )}
      </div>
      <div className="px-4 pb-4">
        <h3 className="font-bold text-slate line-clamp-2">{product.title}</h3>
        {typeof product.rating === "number" && (
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            className="mt-1.5"
          />
        )}
        <p className="mt-1 text-sm text-muted line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-lg font-extrabold text-green">
            {formatPrice(product.price)}
          </span>
        </div>
        {product.inStock &&
          typeof product.stockCount === "number" &&
          product.stockCount <= LOW_STOCK_THRESHOLD && (
            <LowStockNotice stockCount={product.stockCount} />
          )}
        {product.inStock ? (
          <div className="mt-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center rounded-full border border-sand bg-cream">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="הפחת כמות"
                className="p-2 text-slate transition-colors hover:text-primary disabled:opacity-30"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <input
                type="text"
                inputMode="numeric"
                value={quantity === 0 ? "" : quantity}
                onChange={handleQuantityInputChange}
                onBlur={handleQuantityInputBlur}
                onClick={(e) => e.stopPropagation()}
                aria-label="כמות"
                className="w-10 bg-transparent text-center text-sm font-bold tabular-nums text-slate outline-none"
              />
              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="הוסף כמות"
                className="p-2 text-slate transition-colors hover:text-primary"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <Button className="flex-1" size="sm" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              הוסף לעגלה
            </Button>
          </div>
        ) : (
          <Button
            className="mt-4 w-full"
            size="sm"
            disabled
            onClick={(e) => e.stopPropagation()}
          >
            אין במלאי
          </Button>
        )}
      </div>
    </article>
  );
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  allProducts?: Product[];
  onSelectRelated?: (product: Product) => void;
}

export function ProductModal({
  product,
  onClose,
  allProducts = [],
  onSelectRelated,
}: ProductModalProps) {
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();
  const { fly } = useFlyToCart();
  const modalImageRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id && p.category === product.category && !p.isAddon
    )
    .slice(0, 3);

  const handleAdd = () => {
    addToCart(product, quantity);
    fly(product.image, modalImageRef.current);
    showToast(
      quantity > 1 ? `${quantity} יחידות נוספו לעגלה` : "נוסף לעגלה",
      { label: "צפה בעגלה", onClick: openCart }
    );
    setQuantity(1);
    onClose();
  };

  return (
    <Modal isOpen={!!product} onClose={onClose} title={product.title} size="xl">
      <div className="grid gap-6 md:grid-cols-2">
        <div ref={modalImageRef} className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{product.ageGroup}</Badge>
            {product.fairRecommended && <Badge variant="gold">מומלץ ליריד</Badge>}
            {product.schoolFriendly && <Badge variant="gefen">מתאים לבית ספר</Badge>}
            {!product.inStock && (
              <span className="rounded-full bg-error/10 px-3 py-1 text-xs font-bold text-error">
                אין במלאי
              </span>
            )}
          </div>
          {typeof product.rating === "number" && (
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="md"
            />
          )}
          <p className="text-2xl font-bold text-slate">{formatPrice(product.price)}</p>
          {product.inStock &&
            typeof product.stockCount === "number" &&
            product.stockCount <= LOW_STOCK_THRESHOLD && (
              <LowStockNotice stockCount={product.stockCount} />
            )}
          <p className="text-muted leading-relaxed">{product.description}</p>

          <div className="flex gap-4 text-sm text-muted">
            <span className="flex items-center gap-1">
              <Ruler className="h-4 w-4" /> {product.size}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {product.duration}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="h-4 w-4" /> {product.difficulty}
            </span>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-slate">מה יש בקופסה</h4>
            <ul className="space-y-1.5">
              {product.whatsInTheBox.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted">
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {product.inStock ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border border-sand bg-cream">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="הפחת כמות"
                  className="p-2.5 text-slate transition-colors hover:text-primary disabled:opacity-30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  value={quantity === 0 ? "" : quantity}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
                    setQuantity(digitsOnly === "" ? 0 : parseInt(digitsOnly, 10));
                  }}
                  onBlur={() =>
                    setQuantity((q) => (q < 1 ? 1 : q))
                  }
                  aria-label="כמות"
                  className="w-12 bg-transparent text-center text-base font-bold tabular-nums text-slate outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="הוסף כמות"
                  className="p-2.5 text-slate transition-colors hover:text-primary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button className="flex-1" onClick={handleAdd}>
                הוסף לעגלה
              </Button>
            </div>
          ) : (
            <Button className="w-full" disabled>
              אין במלאי
            </Button>
          )}
          {product.inStock && (
            <p className="text-xs text-muted">
              מזמינים לכיתה שלמה או לקייטנה? אין הגבלה על הכמות — הקלידו את
              המספר הרצוי בתיבת הכמות.
            </p>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-8 border-t border-sand/70 pt-6">
          <h4 className="mb-3 font-semibold text-slate">משלימים את הערכה</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {relatedProducts.map((related) => (
              <button
                key={related.id}
                type="button"
                onClick={() => onSelectRelated?.(related)}
                className="flex items-center gap-3 rounded-xl border border-sand/70 bg-cream p-2.5 text-right transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-dark">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate">
                    {related.title}
                  </p>
                  <p className="text-sm font-bold text-green">
                    {formatPrice(related.price)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}

interface ProductGridProps {
  products: Product[];
  showControls?: boolean;
}

type SortOption = "default" | "price-asc" | "price-desc";

export function ProductGridClient({
  products,
  showControls = false,
}: ProductGridProps) {
  const [selected, setSelected] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [ageFilter, setAgeFilter] = useState<string>("all");

  const ageGroups = Array.from(new Set(products.map((p) => p.ageGroup)));

  const filtered =
    ageFilter === "all"
      ? products
      : products.filter((p) => p.ageGroup === ageFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-muted">לא נמצאו מוצרים בקטגוריה זו.</p>
    );
  }

  return (
    <>
      {showControls && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sand/60 bg-white p-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setAgeFilter("all")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all active:scale-95",
                ageFilter === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-cream-dark text-muted hover:bg-sand"
              )}
            >
              כל הגילאים
            </button>
            {ageGroups.map((age) => (
              <button
                key={age}
                onClick={() => setAgeFilter(age)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all active:scale-95",
                  ageFilter === age
                    ? "bg-primary text-white shadow-sm"
                    : "bg-cream-dark text-muted hover:bg-sand"
                )}
              >
                {age}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            מיון:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-full border border-sand bg-white px-3 py-1.5 text-sm font-medium text-slate outline-none transition-colors focus:border-primary"
            >
              <option value="default">מומלץ</option>
              <option value="price-asc">מחיר: מהזול ליקר</option>
              <option value="price-desc">מחיר: מהיקר לזול</option>
            </select>
          </label>
        </div>
      )}

      {sorted.length === 0 ? (
        <p className="py-12 text-center text-muted">
          לא נמצאו מוצרים בגיל שנבחר.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenModal={setSelected}
            />
          ))}
        </div>
      )}
      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        allProducts={products}
        onSelectRelated={setSelected}
      />
    </>
  );
}
