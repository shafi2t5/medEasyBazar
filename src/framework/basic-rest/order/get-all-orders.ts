import { QueryOptionsType, Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import { getToken } from '../../basic-rest/utils/get-token';

const fetchOrders = async () => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  const { data } = await http.get(API_ENDPOINTS.ORDERS, {
    headers,
  });
  return data;
};

const useOrdersQuery = () => {
  return useQuery('orders', fetchOrders);
};

export { useOrdersQuery, fetchOrders };
