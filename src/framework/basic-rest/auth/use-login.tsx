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
  const { closeModal, openModal } = useModalAction();
  return useMutation((input: any) => login(input), {
    onSuccess: (data: any) => {
      Cookies.set('auth_token', data?.data?.token);
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
    onError: (data: any, input) => {
      if (data?.response?.data?.message === 'Patient not registered') {
        openModal('SIGN_UP_VIEW', input);
      } else {
        toast(data.response.data.message, {
          progressClassName: 'danger-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
  });
};
