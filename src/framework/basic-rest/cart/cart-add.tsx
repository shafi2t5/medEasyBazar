import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { useCart } from '@contexts/cart/cart.context';
import { calculateTotalItems } from '@contexts/cart/cart.utils';

export const AddApiCart = async (cart: any) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  const data = await http.post(API_ENDPOINTS.CART_API, cart, {
    headers,
  });
  return {
    ...data,
    cart: cart,
  };
};

export const useCartMutation = () => {
  const { setIncrementDecrementForCart, setTotalItemForCart } = useCart();

  return useMutation((input: any) => AddApiCart(input), {
    onSuccess: async (data: any) => {
      const cartItem: any = localStorage.getItem('medQuantity');
      const response = JSON.parse(cartItem);

      const existingItemIndex = response.findIndex(
        (existingItem: any) => existingItem.id === data?.cart?.id
      );

      if (existingItemIndex > -1) {
        const newItems = [...response];
        newItems[existingItemIndex].quantity! = data?.cart?.quantity;
        const total = calculateTotalItems(newItems);
        setTotalItemForCart(total);
        localStorage.setItem('medQuantity', JSON.stringify(newItems));
      } else {
        let updatedData = [
          ...response,
          {
            id: data?.cart?.id,
            quantity: data?.cart?.quantity,
          },
        ];
        const total = calculateTotalItems(updatedData);
        setTotalItemForCart(total);
        localStorage.setItem('medQuantity', JSON.stringify(updatedData));
      }

      if (data?.cart?.isIncDrc) {
        setIncrementDecrementForCart(data?.cart);
      } else {
        toast(data?.data?.message, {
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    onError: (data: any) => {
      toast(data?.data?.response?.data?.message, {
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
