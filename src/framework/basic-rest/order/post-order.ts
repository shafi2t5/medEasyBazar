import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { getToken } from '@framework/utils/get-token';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { ROUTES } from '@utils/routes';
import Router from 'next/router';
// export interface LoginInputType {
//   phone: string;
//   otp: string;
// }

async function orderApi(input: any) {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return await http.post(`${API_ENDPOINTS.ORDERS}`, input, {
    headers,
  });
}
export const useOrderMutation = () => {
  return useMutation((input: any) => orderApi(input), {
    onSuccess: (data: any) => {
      Router.push(`${ROUTES.ORDER}?orderId=${data?.data?.order_id}`);
      toast(data?.data.message, {
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
