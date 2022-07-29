import { Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';

export const fetchCategoryProducts = async ({
  category,
  setIsLoading,
  categoryLimit,
  setCategoryLimit,
}: any) => {
  setIsLoading(true);
  try {
    let response = {};
    if (category === 'Best Selling Products') {
      const { data } = await http.get(`${API_ENDPOINTS.BEST_SELLER_PRODUCTS}`);
      response = {
        status: data.status,
        category_products: data.best_selling_product,
      };
    } else {
      const { data } = await http.get(
        `${
          API_ENDPOINTS.CATEGORY_PRODUCTS
        }?category_name=${category}&from=${categoryLimit}&to=${
          categoryLimit + 10
        }`
      );
      response = data;
    }

    setCategoryLimit(categoryLimit + 10);

    setIsLoading(false);
    return {
      data: response as Product[],
    };
  } catch (error) {
    setIsLoading(false);
  }
};
