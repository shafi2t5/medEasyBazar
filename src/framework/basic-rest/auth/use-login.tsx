import { useUI } from '@contexts/ui.context';
import { useModalAction } from '@components/common/modal/modal.context';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

export interface LoginInputType {
  phone: string;
  otp: string;
}

export async function login(input: any) {
  return await http.post(`${API_ENDPOINTS.LOGIN}`, input);
}
export const useLoginMutation = () => {
  const { authorize } = useUI();
  const { closeModal, openModal } = useModalAction();
  const router: any = useRouter();
  return useMutation((input: any) => login(input), {
    onSuccess: (data: any) => {
      Cookies.set('auth_token', data?.data?.token);
      authorize();
      if (router?.query?.page) {
        openModal(router?.query?.page);
      } else {
        closeModal();
      }
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
