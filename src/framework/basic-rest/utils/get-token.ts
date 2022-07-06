import Cookies from 'js-cookie';

export const getToken = () => {
  if (typeof window === undefined) {
    return null;
  }
  return Cookies.get('auth_token');
  // return process.env.NEXT_PUBLIC_BASE_URL_TOKEN;
};
