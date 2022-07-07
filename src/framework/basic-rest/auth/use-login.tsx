// import { useUI } from '@contexts/ui.context';
// import { useModalAction } from '@components/common/modal/modal.context';
import axios from 'axios';
import { toast } from 'react-toastify';
// import Cookies from 'js-cookie';
// import { useMutation } from 'react-query';

export interface LoginInputType {
  phone: string;
  otp: string;
}

export async function login(input: any) {
  try {
    const { data } = await axios.post(
      'https://daktarbondhu.com:5001/api/patient/login/',
      input
    );

    // Cookies.set(
    //   'auth_token',
    //   data?.token || process.env.NEXT_PUBLIC_BASE_URL_TOKEN
    // );
    // authorize();
    // closeModal();

    return {
      token: data,
      isRegi: false,
    };
  } catch (error: any) {
    return {
      token: error,
      isRegi: true,
    };
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
// export const useLoginMutation = () => {
//   const { authorize } = useUI();
//   const { closeModal } = useModalAction();
//   return useMutation((input: any) => login(input), {
//     onSuccess: (data) => {
//       // Cookies.set(
//       //   'auth_token',
//       //   data?.token || process.env.NEXT_PUBLIC_BASE_URL_TOKEN
//       // );
//       // authorize();
//       // closeModal();
//     },
//     onError: (data) => {
//       console.log(data, 'login error response');
//     },
//   });
// };
