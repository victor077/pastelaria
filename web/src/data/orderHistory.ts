import { OrderHistory } from "../types";

export const orderHistory: OrderHistory[] = [
  {
    id: 1,
    date: "2024-01-15T14:30:00",
    items: [
      {
        product: {
          id: 1,
          name: "Pastel de Carne",
          price: 8.0,
          category: "pastel",
          description: "Pastel recheado com carne moída temperada",
        },
        quantity: 2,
      },
      {
        product: {
          id: 4,
          name: "Coca-Cola",
          price: 5.0,
          category: "drink",
          description: "Refrigerante 350ml",
        },
        quantity: 1,
      },
    ],
    total: 21.0,
    status: "completed",
  },
  {
    id: 2,
    date: "2024-01-15T15:45:00",
    items: [
      {
        product: {
          id: 2,
          name: "Pastel de Queijo",
          price: 7.0,
          category: "pastel",
          description: "Pastel recheado com queijo derretido",
        },
        quantity: 1,
      },
      {
        product: {
          id: 5,
          name: "Guaraná",
          price: 5.0,
          category: "drink",
          description: "Refrigerante 350ml",
        },
        quantity: 2,
      },
    ],
    total: 17.0,
    status: "completed",
  },
  {
    id: 3,
    date: "2024-01-15T16:20:00",
    items: [
      {
        product: {
          id: 3,
          name: "Pastel de Frango",
          price: 8.0,
          category: "pastel",
          description: "Pastel recheado com frango desfiado",
        },
        quantity: 3,
      },
      {
        product: {
          id: 6,
          name: "Suco Natural",
          price: 7.0,
          category: "drink",
          description: "Suco natural de laranja ou limão",
        },
        quantity: 2,
      },
    ],
    total: 38.0,
    status: "completed",
  },
  {
    id: 4,
    date: "2024-01-15T17:10:00",
    items: [
      {
        product: {
          id: 1,
          name: "Pastel de Carne",
          price: 8.0,
          category: "pastel",
          description: "Pastel recheado com carne moída temperada",
        },
        quantity: 3,
      },
      {
        product: {
          id: 5,
          name: "Guaraná",
          price: 5.0,
          category: "drink",
          description: "Refrigerante 350ml",
        },
        quantity: 2,
      },
    ],
    total: 34.0,
    status: "cancelled",
  },
];
