type PaymentMethodEnum = "CASH" | "DEBIT_CARD" | "CREDIT_CARD";

type OrderStatusEnum = "CANCELED" | "IN_PROGRESS" | "DONE";

type FriedPastryFlavorEnum = "CHEESE" | "MEAT" | "CHICKEN";

export interface FriedPastry {
  flavor: FriedPastryFlavorEnum;
  quantity: number;
  correlationId: string;
};

// Tipagem para OrderResponseDto
export interface OrderResponseDto  {
  correlationId: string
  name: string;
  paymentMethod: PaymentMethodEnum;
  status: OrderStatusEnum;
  friedPastries: FriedPastry[];
  totalAmount: number;
  createdAt: string; 
  updatedAt: string | null; 
};

export interface OrderPost {
  name: string,
  paymentMethod: string,
  friedPastries: { flavor: string; quantity: number; }[]
}

export interface OrderStatusPut {
  status: OrderStatusEnum,
  correlationId: string
}