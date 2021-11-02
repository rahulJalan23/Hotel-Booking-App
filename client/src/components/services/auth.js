import instance from './axiosInit';

export const registerReq = async (enteredData) => {
  const response = await instance.post('/register', enteredData);
  return response;
};

export const loginReq = async (enteredData) => {
  const response = await instance.post('/login', enteredData);
  return response;
};

export const googleAuth = async (enteredData) => {
  const response = await instance.post('/auth/google', enteredData);
  return response;
};
