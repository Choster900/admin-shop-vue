import { tesloApi } from "@/api/tesloapi";
import type { Producto } from "../interfaces/products.interface";
import { getProductImageAction } from "./get-product-image-action";


export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Producto[]>(`/products?limit=${limit}&offset=${page * limit}`);
    console.log(data);

    return data.map((product) => ({
      ...product,
      image: product.images.map(getProductImageAction)
    }));

  } catch (error) {
    throw new Error('Error while fetching products');
  }
}
