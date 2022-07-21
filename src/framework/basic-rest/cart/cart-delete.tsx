import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { useCart } from '@contexts/cart/cart.context';

export const deleteCart = async (cart: any) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  let input = {
    destroy_type: cart?.type,
  };
  const { data } = await http.delete(`${API_ENDPOINTS.CART_API}${cart?.id}/`, {
    data: input,
    headers,
  });
  return { ...data, cart };
};

export const deleteCartMutation = () => {
  const { clearItemFromCart, resetCart } = useCart();
  return useMutation((input: any) => deleteCart(input), {
    onSuccess: async (data: any) => {
      if (data?.cart?.type === 'all') {
        resetCart();
        localStorage.removeItem('medQuantity');
      } else {
        clearItemFromCart(data?.cart?.id);
      }
    },
    onError: (data: any) => {
      toast(data.response.data.message, {
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });
};
