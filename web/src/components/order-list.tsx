import { Clock1Icon, CheckCircleIcon } from "lucide-react";
import { OrderResponseDto, OrderStatusPut } from "@/services/models/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder, putStatusOrder } from "@/services/order";
import { translateToPortuguese } from "@/lib/utils";
interface OrderListProps {
  orders: OrderResponseDto[];
  // onUpdateStatus?: (data: OrderStatusPut) => void;
  isKitchen?: boolean;
}

export function OrderList({
  orders,
  // onUpdateStatus,
  isKitchen = false,
}: OrderListProps) {
  const filteredOrders = isKitchen
    ? orders.filter((order) => order.status === "IN_PROGRESS")
    : orders;

  const { mutate: statusOrder } = useMutation({
    mutationFn: (data: OrderStatusPut) => putStatusOrder(data),
    onSuccess: () => console.log('ATUALIZADO')
  })
  const queryClient = useQueryClient();
  const {mutate: deleteStatusOrder} = useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
  })

  return (
    <div className="space-y-4">
      {filteredOrders.map((order) => (
        <div
          key={order.correlationId}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Pedido #{order.correlationId}</h3>
            <StatusBadge status={order.status} />
          </div>

          <div className="space-y-2">
            {order.friedPastries.map((item, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-700">
                <span>
                  {item.quantity}x Pastel {translateToPortuguese(item.flavor)} 
                </span>
              </div>
            ))}

          </div>

          <div className="mt-4 flex justify-between items-center">
            {/* COZINHA */}
            {isKitchen && order.status !== "DONE" && (
              <div className="flex gap-2 items-center">
                <button
                  onClick={() =>
                    statusOrder({status: 'DONE', correlationId: order.correlationId, })
                  }
                  className="bg-green-700 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >

                  Pronto
                </button>
                <button
                  onClick={() =>
                    deleteStatusOrder(order.correlationId)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >

                  Cancelar
                </button>
              </div>
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

function StatusBadge({ status }: { status: OrderResponseDto["status"] }) {
  const styles = {
    CANCELED: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    IN_PROGRESS: "bg-blue-100 text-blue-800 border border-blue-200",
    DONE: "bg-green-100 text-green-800 border border-green-200",
  };

  const labels = {
    CANCELED: "Cancelado",
    IN_PROGRESS: "Preparando",
    DONE: "Pronto",
  };

  const icons = {
    CANCELED: <Clock1Icon size={16} className="mr-1" />,
    IN_PROGRESS: <Clock1Icon size={16} className="mr-1" />,
    DONE: <CheckCircleIcon size={16} className="mr-1" />,
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
