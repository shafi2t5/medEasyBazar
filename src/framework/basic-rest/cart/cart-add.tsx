import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { useUI } from '@contexts/ui.context';

export const AddApiCart = async (cart: any) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return await http.post(API_ENDPOINTS.CART, cart, {
    headers,
  });
};

export const useCartMutation = () => {
  const queryClient = useQueryClient();
  const { setCartList } = useUI();
  return useMutation((input: any) => AddApiCart(input), {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries('cart');
      setCartList(data?.data);
      toast(data?.data?.message, {
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
