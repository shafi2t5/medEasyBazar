// import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
// import { useQuery } from 'react-query';

export const fetchSearchedProducts = async ({ text, setIsLoading }: any) => {
  setIsLoading(true);
  try {
    const { data } = await http.get(
      `${API_ENDPOINTS.SEARCH}?q=${text}&from=0&to=10`
    );
    setIsLoading(false);
    return data;
  } catch (error) {
    setIsLoading(false);
  }
};
// export const useSearchQuery = (options: QueryOptionsType) => {
//   return useQuery<Product[], Error>(
//     [API_ENDPOINTS.SEARCH, options],
//     fetchSearchedProducts
//   );
// };
