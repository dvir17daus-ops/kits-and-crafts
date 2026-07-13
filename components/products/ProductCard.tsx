"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Play, Ruler, Clock, Gauge } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/utils/formatPrice";

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    showToast("נוסף לעגלה ✓", { label: "צפה בעגלה", onClick: openCart });
  };

  return (
    <article
      className="card-premium group cursor-pointer overflow-hidden hover:scale-[1.02]"
      onClick={() => onOpenModal(product)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <Badge>{product.ageGroup}</Badge>
          {product.fairRecommended && (
            <Badge variant="gold">מומלץ ליריד</Badge>
          )}
        </div>
        {product.isDeal && product.discountPercent && (
          <div className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">
            -{product.discountPercent}%
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-slate line-clamp-2">{product.title}</h3>
        <p className="mt-1 text-sm text-muted line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-slate">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
        <Button
          className="mt-4 w-full"
          size="sm"
          onClick={handleAddToCart}
        >
          הוסף לעגלה
        </Button>
      </div>
    </article>
  );
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

function VideoPlaceholder() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlay = () => {
    setPlaying(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 100);
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-cream-dark to-sand">
      {!playing ? (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-black/5"
          aria-label="הפעל סרטון הדרכה"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
            <Play className="h-6 w-6 mr-[-2px]" fill="white" />
          </div>
          <span className="text-sm font-medium text-muted">סרטון הדרכה — בקרוב</span>
        </button>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
          <p className="text-sm font-medium text-slate">מציג סרטון הדרכה...</p>
          <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress >= 100 && (
            <p className="text-xs text-muted">סרטון הדרכה מלא יתווסף בקרוב</p>
          )}
        </div>
      )}
    </div>
  );
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product);
    showToast("נוסף לעגלה ✓", { label: "צפה בעגלה", onClick: openCart });
    onClose();
  };

  return (
    <Modal isOpen={!!product} onClose={onClose} title={product.title} size="xl">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl">
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
          </div>
          <p className="text-2xl font-bold text-slate">{formatPrice(product.price)}</p>
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

          <VideoPlaceholder />

          <Button className="w-full" onClick={handleAdd}>
            הוסף לעגלה
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGridClient({ products }: ProductGridProps) {
  const [selected, setSelected] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-muted">לא נמצאו מוצרים בקטגוריה זו.</p>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenModal={setSelected}
          />
        ))}
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}
