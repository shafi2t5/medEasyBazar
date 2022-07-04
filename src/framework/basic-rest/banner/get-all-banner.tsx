// import { QueryOptionsType, HomeProduct } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchBannerResponse = async () => {
  const { data } = await http.get(API_ENDPOINTS.BANNER_API);
  return data?.medicine_top_slider;
};
export const useBannerQuery = () => {
  return useQuery<any, Error>([API_ENDPOINTS.BANNER_API], fetchBannerResponse);
};
