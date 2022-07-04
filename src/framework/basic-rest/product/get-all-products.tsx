import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery, useQuery } from 'react-query';
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(
    `${API_ENDPOINTS.CATEGORY_PRODUCTS}?category_name=${_params.category}&from=0&to=10`
  );
  return {
    data: data as Product[],
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.PRODUCTS, options], fetchProducts);
};

export { useProductsQuery, fetchProducts };
