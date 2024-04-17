export const getHostUrl = () => {
  return process.env.REACT_APP_API_URL || '';
}

export const getAuthenticatedHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: process.env.NODE_ENV === 'production' ? true : false
  };
}