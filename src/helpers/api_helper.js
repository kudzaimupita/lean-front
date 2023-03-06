import axios from "axios";
// import accessToken from "./jwt-token-access/accessToken";
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from "constants/api.constant";
import { PERSIST_STORE_NAME } from "constants/app.constant";
import deepParseJson from "utils/deepParseJson";
import store from "../store";
import { Card, Avatar, Button, Notification, toast } from "components/ui";
// import store from "../store";
import { onSignOutSuccess } from "../store/auth/sessionSlice";

const API_URL = "http://localhost:5000/v1";

const axiosApi = axios.create({
  baseURL: API_URL,
});

const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
const persistData = deepParseJson(rawPersistData);
const accessToken = persistData.auth.session.token;
const unauthorizedCode = [401];

axiosApi.interceptors.request.use(
  (config) => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
    const persistData = deepParseJson(rawPersistData);
    console.log(persistData);
    const accessToken = persistData.auth.session.token;

    if (accessToken) {
      config.headers.common["authorization"] = `${TOKEN_TYPE}${accessToken}`;
      config.headers.sensitive = true;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(onSignOutSuccess());
      toast.push(
        <Notification title={"Session expired"} type="info">
          Session expired
        </Notification>
      );
    }

    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function post2(url, data, config = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosApi.post(API_URL + url, data);
      return resolve(res);
    } catch (err) {
      const errors = err.response.data.error.message;
      const errorArray = errors.split(",");
      return reject(errorArray);
    }
  });
}

export async function post(url, data, config = {}) {
  console.log(url, data);
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data)
    .catch((error) => error);
}
export async function put(url, data, config = {}) {
  console.log(url, data);
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data)
    .catch((error) => error);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data)
    .catch((error) => error);
}

export async function patch(url, data, config = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosApi.patch(API_URL + url, data);
      return resolve(res);
    } catch (err) {
      console.log(err);
      const errors = err.response.data.error.message;
      const errorArray = errors.split(",");

      return reject(errorArray);
    }
  });
}
