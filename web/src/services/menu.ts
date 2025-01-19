import { api } from "./api";
import { ResponseMenuDTO } from "./models/menu";

export async function getMenu(): Promise<ResponseMenuDTO> {
  try {
    const response = await api.get("menu");
    return response.data;
  } catch (error) {
    console.log("Error to call menu", error);

    throw error;
  }
}