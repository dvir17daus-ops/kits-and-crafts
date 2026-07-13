import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CartEmptyStateProps {
  onContinueShopping: () => void;
}

export function CartEmptyState({ onContinueShopping }: CartEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <ShoppingBag className="h-16 w-16 text-sand" aria-hidden="true" />
      <p className="text-lg font-medium text-slate">העגלה ריקה</p>
      <p className="text-sm text-muted">הוסיפו ערכות יצירה ויצאו לדרך</p>
      <Button onClick={onContinueShopping} variant="outline">
        לקניות
      </Button>
    </div>
  );
}
