import axios from "axios";
import Constants from "expo-constants";

const getHostIP = () => {
  const host =
    Constants.expoConfig?.hostUri?.split(":")[0] ||
    Constants.manifest2?.extra?.expoClient?.hostUri?.split(":")[0] ||
    Constants.manifest?.debuggerHost?.split(":")[0];

  return host;
};

const IP = getHostIP();

const instance = axios.create({
  baseURL: `http://${IP}:3000`,
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: "Network error" });
  }
);

export default instance;
