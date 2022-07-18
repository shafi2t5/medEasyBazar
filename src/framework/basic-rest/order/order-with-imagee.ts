import { useModalAction } from '@components/common/modal/modal.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export interface orderType {
  file: string;
}
async function createOrder(input: any) {
  const formData = new FormData();
  formData.append('prescription_image', input.file[0]);
  formData.append('coupon_id', input?.coupon_id);
  formData.append('address_id', input.selectedAddress?.id);
  formData.append('delivery_fee', input.deliveryFee);
  formData.append('payment_method', 'cash');

  const headers = {
    Authorization: `Bearer ${getToken()}`,
    'content-type': 'multipart/form-data',
  };
  return await http.post(API_ENDPOINTS.ORDERIMAGE, formData, {
    headers,
  });
}
export const useOderWithImageMutation = () => {
  const { closeModal } = useModalAction();
  return useMutation((input: any) => createOrder(input), {
    onSuccess: (data: any) => {
      toast(data?.data?.message, {
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeModal();
    },
    onError: (data: any) => {
      toast(data?.data?.response.data.message, {
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
