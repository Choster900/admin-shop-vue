import { tesloApi } from "@/api/tesloapi";
import type { Producto } from "../interfaces/products.interface";
import { getProductImageAction } from "./get-product-image-action";


export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Producto[]>(`/products?limit=${limit}&offset=${page * limit}`);
    //console.log(data);

    return data.map((product) => {
      const images = product.images.map(img => getProductImageAction(img));

      //console.log('Processed Images:', images);

      return {
        ...product,
        images: images
      };
    });


  } catch (error) {
    throw new Error('Error while fetching products');
  }
}
