import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import { toast } from 'react-toastify';

export const AddApiAddress = async (address: any, closeModal: any) => {
  try {
    const headers = { Authorization: `Bearer ${getToken()}` };
    const { data } = await http.post(API_ENDPOINTS.ADDRESS, address, {
      headers,
    });
    toast(data?.message, {
      progressClassName: 'fancy-progress-bar',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    closeModal();
  } catch (error) {
    toast('Cant add address', {
      progressClassName: 'fancy-progress-bar',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

export const updateApiAddress = async (
  id: any,
  address: any,
  closeModal: any
) => {
  try {
    const headers = { Authorization: `Bearer ${getToken()}` };
    const { data } = await http.put(`${API_ENDPOINTS.ADDRESS}${id}/`, address, {
      headers,
    });
    toast(data?.message, {
      progressClassName: 'fancy-progress-bar',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    closeModal();
  } catch (error: any) {
    console.log(error.response.data.message);
    toast(error.response.data.message, {
      progressClassName: 'fancy-progress-bar',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};
