import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { useModalAction } from '@components/common/modal/modal.context';

export const AddApiAddress = async (address: any) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return await http.post(API_ENDPOINTS.ADDRESS, address, {
    headers,
  });
};

export const updateApiAddress = async (address: any) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return await http.put(`${API_ENDPOINTS.ADDRESS}${address.id}/`, address, {
    headers,
  });
};

const deleteAddress = async (id: number) => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return await http.delete(`${API_ENDPOINTS.ADDRESS}${id}/`, {
    headers,
  });
};

export const useAddressMutation = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();
  return useMutation((input: any) => AddApiAddress(input), {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries('address');
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

export const useAddressUpdateMutation = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();
  return useMutation((input: any) => updateApiAddress(input), {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries('address');
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

export const useAddressDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((input: any) => deleteAddress(input), {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries('address');
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
