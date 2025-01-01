import { useState } from "react";
import { Header } from "./components/header";
import { ProductCard } from "./components/product-card";
import { products } from "./data/products";
import { Order, OrderItem, Product } from "./types";
import { Cart } from "./components/cart";
import { OrderList } from "./components/order-list";
import { useViewClient } from "./hooks/useViewClient";

function App() {
  const view = useViewClient((state) => state.view);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      updateQuantity(
        cartItems.indexOf(existingItem),
        existingItem.quantity + 1
      );
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (index: number, quantity: number) => {
    const newItems = [...cartItems];
    newItems[index].quantity = quantity;
    setCartItems(newItems);
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((x, i) => i !== index));
  };

  const submitOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: orders.length + 1,
      items: [...cartItems],
      status: "pending",
      total: cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
      timestamp: new Date(),
    };

    setOrders([...orders, newOrder]);
    setCartItems([]);
  };

  const updateOrderStatus = (
    orderId: number,
    status: "preparing" | "ready"
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <>
      <Header />
      <main className="px-8 w-full mt-20">
        {view === "customer" ? (
          <div className="flex items-start gap-10">
            <div className="flex flex-col gap-6 w-[68%]">
              <p className="text-2xl font-bold text-gray-800">Cardápio</p>
              <div className="space-y-4 mb-10">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Pastéis
                </h3>
                {products
                  .filter((item) => item.category === "pastel")
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      onAdd={addToCart}
                      product={product}
                    />
                  ))}
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Bebidas
                </h3>
                {products
                  .filter((item) => item.category === "drink")
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      onAdd={addToCart}
                      product={product}
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-8 flex-1 ">
              <Cart
                items={cartItems}
                onRemove={removeFromCart}
                onSubmit={submitOrder}
                onUpdateQuantity={updateQuantity}
              />
              {orders.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Seus Pedidos
                  </h2>
                  <OrderList orders={orders} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <OrderList
              orders={orders}
              onUpdateStatus={updateOrderStatus}
              isKitchen={true}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
