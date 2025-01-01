import { OrderItem } from "@/types";
import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

interface CartProps {
  items: OrderItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
  onSubmit: () => void;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemove,
  onSubmit,
}: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">Seu carrinho está vazio</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Seu Pedido</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={item.quantity}
                onChange={(e) =>
                  onUpdateQuantity(index, Number(e.target.value))
                }
                className="border rounded-md p-1 text-gray-700 focus:ring-red-500 focus:border-red-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <span className="text-gray-700">{item.product.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                R$ {(item.product.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2Icon size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Total:</span>
          <span className="font-bold text-lg text-red-600">
            R$ {total.toFixed(2)}
          </span>
        </div>
        <Button onClick={onSubmit} className="w-full hover:bg-red-700">
          Finalizar Pedido
        </Button>
      </div>
    </div>
  );
}
