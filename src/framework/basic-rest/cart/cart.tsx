import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';

export const fetchCartData = async () => {
  try {
    const headers = { Authorization: `Bearer ${getToken()}` };
    const data = await http.get(API_ENDPOINTS.CART_API, {
      headers,
    });
    let cartData = data?.data?.medicines.map((med: any) => {
      return {
        id: med?.id,
        quantity: med?.quantity,
      };
    });
    localStorage.setItem('medQuantity', JSON.stringify(cartData));
    return data;
  } catch (error) {
    console.log(error);
  }
};
