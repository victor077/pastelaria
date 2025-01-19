import { api } from "../api";
import { OrderPost, OrderResponseDto, OrderStatusPut } from "../models/order";

export async function getOrders(): Promise<OrderResponseDto[]> {
  try {
    const response = await api.get("orders");
    return response.data;
  } catch (error) {
    console.log("Error to call orders", error);

    throw error;
  }
}

export async function postOrder(params:OrderPost) {
    try{
      const response = await api.post("orders", params)
      return response.data
    } catch(error) {
      console.log("error to post order", error);
      throw error
    }
}

export async function putStatusOrder(params:OrderStatusPut) {
  try{
    const response = await api.patch("orders", params)
    return response.data
  } catch(error) {
    console.log("error to put order", error);
    throw error
  }
}

export async function deleteOrder(params:string) {
  try{
    const response = await api.delete(`orders/${params}`)
    return response.data
  } catch(error) {
    console.log("error to put order", error);
    throw error
  }
}