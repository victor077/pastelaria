import { Clock1Icon, CheckCircleIcon } from "lucide-react";
import { Order } from "../types";

interface OrderListProps {
  orders: Order[];
  onUpdateStatus?: (orderId: number, status: "preparing" | "ready") => void;
  isKitchen?: boolean;
}

export function OrderList({
  orders,
  onUpdateStatus,
  isKitchen = false,
}: OrderListProps) {
  const filteredOrders = isKitchen
    ? orders.filter((order) => order.status !== "ready")
    : orders;

  return (
    <div className="space-y-4">
      {filteredOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Pedido #{order.id}</h3>
            <StatusBadge status={order.status} />
          </div>

          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>
                  {item.quantity}x {item.product.name}
                </span>
                <span>
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold text-red-600">
              Total: R$ {order.total.toFixed(2)}
            </span>
            {isKitchen && order.status !== "ready" && (
              <button
                onClick={() =>
                  onUpdateStatus?.(
                    order.id,
                    order.status === "pending" ? "preparing" : "ready"
                  )
                }
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {order.status === "pending"
                  ? "Iniciar Preparo"
                  : "Marcar Pronto"}
              </button>
            )}
          </div>
        </div>
      ))}
      {filteredOrders.length <= 0 && (
        <p className="font-bold text-xl text-gray-800">
          Nenhum pedido no momento...
        </p>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    preparing: "bg-blue-100 text-blue-800 border border-blue-200",
    ready: "bg-green-100 text-green-800 border border-green-200",
  };

  const labels = {
    pending: "Pendente",
    preparing: "Preparando",
    ready: "Pronto",
  };

  const icons = {
    pending: <Clock1Icon size={16} className="mr-1" />,
    preparing: <Clock1Icon size={16} className="mr-1" />,
    ready: <CheckCircleIcon size={16} className="mr-1" />,
  };

  return (
    <span
      className={`${styles[status]} px-3 py-1 rounded-full text-sm flex items-center shadow-sm`}
    >
      {icons[status]}
      {labels[status]}
    </span>
  );
}
