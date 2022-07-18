import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface UpdateUserType {
  name: string;
  email: string;
  age: string;
  gender: string;
  address: string;
  avatar: string;
  phone: string;
}
async function createUser(input: UpdateUserType) {
  const formData = new FormData();
  formData.append('name', input.name);
  formData.append('email', input.email);
  formData.append('age', input.age);
  formData.append('gender', input.gender);
  formData.append('address', input.address);
  formData.append('phone', input.phone);
  formData.append('avatar', input.avatar[0]);

  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      'content-type': 'multipart/form-data',
    };
    const { data } = await http.post(API_ENDPOINTS.PROFILE, formData, {
      headers,
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
export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUserType) => createUser(input), {
    onSuccess: (data: any) => {
      toast(data?.message, {
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (data) => {
      console.log(data, 'UpdateUser error response');
    },
  });
};

export const fetchProfile = async () => {
  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      'content-type': 'multipart/form-data',
    };
    const { data } = await http.get(API_ENDPOINTS.PROFILE, {
      headers,
    });
    return {
      ...data?.patients,
      phone: data?.patients?.phone ? data?.patients?.phone : '+88',
    };
  } catch (error: any) {
    console.log(error?.response?.data?.message);
  }
};
