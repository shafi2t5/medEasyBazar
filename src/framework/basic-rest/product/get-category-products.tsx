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
    const { data } = await http.get(
      `${
        API_ENDPOINTS.CATEGORY_PRODUCTS
      }?category_name=${category}&from=${categoryLimit}&to=${
        categoryLimit + 10
      }`
    );
    setCategoryLimit(categoryLimit + 10);

    setIsLoading(false);
    return {
      data: data as Product[],
    };
  } catch (error) {
    setIsLoading(false);
  }
};