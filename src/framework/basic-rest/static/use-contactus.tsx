import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';

export async function contactus(input: any) {
  return await http.post(`${API_ENDPOINTS.CONTACTUS}`, input);
}
export const useContactUsMutation = () => {
  return useMutation((input: any) => contactus(input), {
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
      toast(data.response.data.message || 'Failure for contact', {
        progressClassName: 'danger-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });
};
