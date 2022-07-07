import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface SignUpInputType {
  name: string;
  age: string;
  gender: string;
  address: string;
  phone: string;
  token: string;
}
export async function signUp(input: SignUpInputType) {
  try {
    const { data } = await axios.post(
      'https://daktarbondhu.com:5001/api/patient/register/',
      input
    );
    // Cookies.set(
    //   'auth_token',
    //   data?.token || process.env.NEXT_PUBLIC_BASE_URL_TOKEN
    // );
    toast(data?.message, {
      progressClassName: 'fancy-progress-bar',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return data;
  } catch (error: any) {
    toast(error.response.data.message, {
      progressClassName: 'fancy-progress-bar',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
}
// export const useSignUpMutation = () => {
//   const { authorize } = useUI();
//   const { closeModal } = useModalAction();
//   return useMutation((input: SignUpInputType) => signUp(input), {
//     onSuccess: (data) => {
//       toast(data?.message, {
//         progressClassName: 'fancy-progress-bar',
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       //Cookies.set('auth_token', data.token);
//       authorize();
//       closeModal();
//     },
//     onError: (data) => {
//       console.log(data, 'login error response');
//     },
//   });
// };
