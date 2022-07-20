import { HomeProduct } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchBestSellerProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.HOME_PRODUCTS);
  return data as HomeProduct;
};
export const useHomeProductsQuery = () => {
  return useQuery<HomeProduct, Error>(
    [API_ENDPOINTS.HOME_PRODUCTS],
    fetchBestSellerProducts
  );
};
