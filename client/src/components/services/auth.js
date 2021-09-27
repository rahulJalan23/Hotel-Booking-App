import instance from "./axiosInit";

export const registerReq = async (enteredData) => {
  console.log("in  the registerReq func starting");
  const response = await instance.post("/register", enteredData);
  console.log("in  the registerReq func ending");

  return response;
};
