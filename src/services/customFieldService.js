import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getCustomFieldss = () => {
  return new Promise((resolve, reject) => {
    get(`/custom-fields`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getCustomFields = (id) => {
  return new Promise((resolve, reject) => {
    get(`/custom-fields/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchCustomFieldss = (query) => {
  return new Promise((resolve, reject) => {
    get(`customFields/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeCustomFields = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/custom-fields/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/custom-fields/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/custom-fields`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }
  });
};

export const deleteCustomFields = (id) => {
  return new Promise((resolve, reject) => {
    del(`/custom-fields/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewCustomFieldss(params) {
  return ApiService.fetchData({
    url: "/custom-fields",
    method: "get",
    params,
  });
}

// export async function deleteCustomFieldss(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/custom-fields/deleteCustomFieldss",
//     method: "post",
//     body,
//   });
// }

export const deleteCustomFieldss = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/custom-fields/deleteCustomFieldss`, formData)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
