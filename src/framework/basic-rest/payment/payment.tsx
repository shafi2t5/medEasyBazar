import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

export const createPayment = async (input: any) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return await http.post(API_ENDPOINTS.PAYMENTINFO, input, {
    headers,
  });
};

export const usePaymentMutation = () => {
  return useMutation((input: any) => createPayment(input), {
    onSuccess: (data: any) => {
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
      console.log(data?.data?.response.data.message, 'login error response');
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
