import { useUI } from '@contexts/ui.context';
import { useModalAction } from '@components/common/modal/modal.context';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface LoginInputType {
  phone: string;
  otp: string;
}

export async function login(input: any) {
  return await axios.post(
    'https://daktarbondhu.com:5001/api/patient/login/',
    input
  );
}
export const useLoginMutation = () => {
  const { authorize } = useUI();
  const { closeModal } = useModalAction();
  return useMutation((input: any) => login(input), {
    onSuccess: (data: any) => {
      Cookies.set(
        'auth_token',
        data?.token || process.env.NEXT_PUBLIC_BASE_URL_TOKEN
      );
      authorize();
      closeModal();
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
      // need to delete this
      // Cookies.set(
      //   'auth_token',
      //   data?.token || process.env.NEXT_PUBLIC_BASE_URL_TOKEN
      // );
      // authorize();
      // closeModal();
      //this
      toast(data.response.data.message, {
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
