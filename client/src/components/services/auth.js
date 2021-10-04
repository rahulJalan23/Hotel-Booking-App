import instance from './axiosInit';

export const registerReq = async (enteredData) => {
  const response = await instance.post('/register', enteredData);
  return response;
};
export const loginReq = async (enteredData) => {
  const response = await instance.post('/login', enteredData);
  return response;
};
