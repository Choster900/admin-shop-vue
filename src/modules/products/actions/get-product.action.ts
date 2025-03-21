import { tesloApi } from "@/api/tesloapi";
import type { Producto } from "../interfaces/products.interface";


export const getProductsAction = async (page: number, limit: number) => {
  try {
    const { data } = await tesloApi.get<Producto[]>(`/products?limit=${limit}&offset=${page * limit}`);
    console.log(data);

    return data;

  } catch (error) {
    throw new Error('Error while fetching products');
  }
}
