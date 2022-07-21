import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { useUI } from '@contexts/ui.context';

const deleteOrder = async (id: number) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return await http.delete(`${API_ENDPOINTS.ORDERS}${id}/`, {
    headers,
  });
};

export const useDeleteOrderMutation = () => {
  const { closeDrawer } = useUI();
  const queryClient = useQueryClient();
  return useMutation((input: any) => deleteOrder(input), {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries('orders');
      toast(data?.data?.message, {
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // setTimeout(() => location.reload(), 2000);
      closeDrawer();
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
