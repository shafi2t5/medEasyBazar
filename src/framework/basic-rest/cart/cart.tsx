import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';

export const fetchCartData = async () => {
  try {
    const headers = { Authorization: `Bearer ${getToken()}` };
    return await http.get(API_ENDPOINTS.CART_API, {
      headers,
    });
  } catch (error) {
    console.log(error);
  }
};
