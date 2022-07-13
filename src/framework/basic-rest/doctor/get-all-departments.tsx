import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import { getToken } from '@framework/utils/get-token';

export const fetchDepartments = async () => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return await http.get(API_ENDPOINTS.DEPARTMENT, {
    headers,
  });
};
export const useDepartmentsQuery = () => {
  return useQuery<any, Error>('departments', fetchDepartments);
};
