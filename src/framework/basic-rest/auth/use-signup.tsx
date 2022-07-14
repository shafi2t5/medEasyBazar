import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface SignUpInputType {
  name: string;
  age: string | number;
  gender: string;
  address: string;
  phone: string;
  token: string;
}
async function signUp(input: SignUpInputType) {
  return await axios.post(
    'https://daktarbondhu.com:5001/api/patient/register/',
    input
  );
}
export const useSignUpMutation = () => {
  const { authorize } = useUI();
  const { closeModal } = useModalAction();
  return useMutation((input: SignUpInputType) => signUp(input), {
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
    onError: (data: any) => {
      console.log(data?.data?.response.data.message, 'login error response');
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
