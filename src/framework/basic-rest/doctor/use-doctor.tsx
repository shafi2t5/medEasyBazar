// import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
// import { useQuery } from 'react-query';

export const fetchDoctorList = async ({ text, setIsLoading }: any) => {
  setIsLoading(true);
  try {
    const headers = { Authorization: `Bearer ${getToken()}` };
    const { data } = await http.get(`${API_ENDPOINTS.DOCTOR}${text}/`, {
      headers,
    });
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
