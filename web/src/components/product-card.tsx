import { PlusIcon } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-shadow duration-200">
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <p className="text-red-600 font-bold mt-2">
          R$ {product.price.toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => onAdd(product)}
        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200"
      >
        <PlusIcon size={20} />
      </button>
    </div>
  );
}
