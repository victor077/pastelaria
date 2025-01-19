import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/header";
import { ProductCard } from "./components/product-card";
// import { products } from "./data/products";
import { Cart } from "./components/cart";
import { OrderList } from "./components/order-list";
import { useViewClient } from "./hooks/useViewClient";
import { History } from "./components/history";
import { OrderPost, OrderResponseDto } from "./services/models/order";
import { useRequestData } from "./hooks/useRequestData";
import { CartItem, ResponseMenuDTO } from "./services/models/menu";
import { useMutation } from "@tanstack/react-query";
import { postOrder } from "./services/order";

function App() {
  const view = useViewClient((state) => state.view);
  const { dataOrders, dataMenu } = useRequestData();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderResponseDto[]>(dataOrders);
  const [menu, setMenu] = useState<ResponseMenuDTO>(dataMenu)

  const { mutate } = useMutation({
    mutationFn: (data: OrderPost) => postOrder(data),
    onSuccess:() => console.log('boaaa')
  })

  useEffect(() => {
    if (dataMenu !== null) {
      setMenu(dataMenu);
    }
  }, [dataMenu]);

  useEffect(() => {
    if (dataOrders.length > 0) {
      setOrders(dataOrders);
    }
  }, [dataOrders]);

  const handleFormOrder = useCallback(() => {
    const items = cartItems.map(({ flavor, quantity }) => ({
      flavor,
      quantity,
    }));
    console.log({items});
    
    mutate({
      name: 'Victor',
      paymentMethod: 'CASH',
      friedPastries: items
    })

    setCartItems([])

  }, [mutate, cartItems])



  const addToCart = (product: CartItem) => {
    const existingItem = cartItems.find(
      (item) => item.flavor === product.flavor
    );
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.flavor === product.flavor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
    else {
      setCartItems((prevItems) => [...prevItems, product])
    }
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((x, i) => i !== index));
  };


  return (
    <>
      <Header />
      <main className="px-8 w-full mt-20">
        {view === "customer" && (
          <div className="flex items-start gap-10">
            <div className="flex flex-col gap-6 w-[68%]">
              <p className="text-2xl font-bold text-gray-800">Cardápio</p>
              <div className="space-y-4 mb-10">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Pastéis
                </h3>

                {menu?.availableMenu?.map((pastrie, index) => {
                  const newProduct = {
                    flavor: pastrie.flavor,
                    unitPrice: pastrie.unitPrice,
                    description: pastrie.description,
                    quantity: 1
                  }
                  return (
                    <ProductCard
                      key={index}
                      onAdd={addToCart}
                      product={newProduct}
                    />
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col gap-8 flex-1 ">
              <Cart
                items={cartItems}
                onRemove={removeFromCart}
                onSubmit={handleFormOrder}
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
        )}
        {view === "kitchen" && (
          <>
            <OrderList
              orders={orders}
              isKitchen={true}
            />
          </>
        )}
        {view === "history" && <History orders={orders} />}
      </main>
    </>
  );
}

export default App;
