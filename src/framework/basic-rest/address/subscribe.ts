import { useModalAction } from '@components/common/modal/modal.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

async function createSubscribe(input: any) {
  return await http.post(API_ENDPOINTS.SUBSCRIBE, input);
}
export const useSubscribeMutation = () => {
  const { closeModal } = useModalAction();
  return useMutation((input: any) => createSubscribe(input), {
    onSuccess: (data: any) => {
      toast(data?.data?.message, {
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeModal();
    },
    onError: (data: any) => {
      toast(data?.data?.response.data.message, {
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
