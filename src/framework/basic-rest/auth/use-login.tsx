import { useUI } from '@contexts/ui.context';
import { useModalAction } from '@components/common/modal/modal.context';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface LoginInputType {
  phone: string;
  otp: string;
}

// const res = await fetch(
//   'https://daktarbondhu.com:5001/api/patient/login/',
//   {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(input),
//   }
// );
// const data = await res.json();

export async function login(input: any) {
  console.log(input);
  try {
    const { data } = await axios.post(
      'https://daktarbondhu.com:5001/api/patient/login/',
      input
    );

    console.log(data, 'lsfak');
    return {
      token: data,
    };
  } catch (error) {
    console.log(error);
  }
}
export const useLoginMutation = () => {
  const { authorize } = useUI();
  const { closeModal } = useModalAction();
  return useMutation((input: any) => login(input), {
    onSuccess: (data) => {
      Cookies.set(
        'auth_token',
        data?.token || process.env.NEXT_PUBLIC_BASE_URL_TOKEN
      );
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
