import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchProduct = async (query: any) => {
  const { data } = await http.get(
    `${API_ENDPOINTS.PRODUCT}?generic_name=${
      query.generic_name
    }&category_name=${query.category_name}&id=${query.id}&strength=${
      query.strength
    }&lang=${'en'}`
  );
  return data;
};
export const useProductQuery = (query: any) => {
  return useQuery<Product, Error>(
    [API_ENDPOINTS.PRODUCT, query],
    () => fetchProduct(query),
    {
      refetchOnWindowFocus: false,
    }
  );
};
