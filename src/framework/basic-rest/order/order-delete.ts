import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import { toast } from 'react-toastify';

export const deleteOrder = async (id: number) => {
  try {
    const headers = { Authorization: `Bearer ${getToken()}` };
    const { data } = await http.delete(`${API_ENDPOINTS.ORDERS}${id}/`, {
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

    return true;
  } catch (error) {
    console.log(error);
  }
};
