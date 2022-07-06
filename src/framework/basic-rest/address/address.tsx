import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import { getToken } from '@framework/utils/get-token';

const fetchAddress = async () => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  const { data } = await http.get(API_ENDPOINTS.ADDRESS, {
    headers,
  });
  return {
    data: data,
  };
};

const useAddressQuery = () => {
  return useQuery([API_ENDPOINTS.ADDRESS], fetchAddress);
};

export { useAddressQuery, fetchAddress };
