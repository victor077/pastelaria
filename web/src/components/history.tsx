import { translateToPortuguese } from "@/lib/utils";
import { OrderResponseDto } from "@/services/models/order";

interface HistoryProps {
  orders: OrderResponseDto[]
}

export const History = ({orders}: HistoryProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Histórico de Pedidos</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.correlationId} className="border rounded-lg p-4 bg-white shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Pedido #{order.correlationId}</span>
              <span className="text-gray-600">{formatDate(order.createdAt)}</span>
            </div>
            <div className="space-y-2">
              {order.friedPastries.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>
                   {translateToPortuguese(item.flavor)} x{item.quantity}
                  </span>
                  {/* <span>
                    R$ {(order.totalAmount).toFixed(2)}
                  </span> */}
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <span className="font-bold">R$ {order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="mt-2">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  order.status === "DONE"
                    ? "bg-green-100 text-green-800"
                    : order.status === "CANCELED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status === "DONE"
                  ? "Concluído"
                  : order.status === "CANCELED"
                  ? "Cancelado"
                  : "Pendente"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
