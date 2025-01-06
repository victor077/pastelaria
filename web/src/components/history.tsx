import { orderHistory } from "@/data/orderHistory";

export const History = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Histórico de Pedidos</h1>
      <div className="space-y-4">
        {orderHistory.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 bg-white shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Pedido #{order.id}</span>
              <span className="text-gray-600">{formatDate(order.date)}</span>
            </div>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <span>
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <span className="font-bold">R$ {order.total.toFixed(2)}</span>
            </div>
            <div className="mt-2">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : order.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status === "completed"
                  ? "Concluído"
                  : order.status === "cancelled"
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
