import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getPermissions = () => {
  return new Promise((resolve, reject) => {
    get(`/permissions`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getPermission = (id) => {
  return new Promise((resolve, reject) => {
    get(`/permissions/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchPermissions = (query) => {
  return new Promise((resolve, reject) => {
    get(`permissions/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storePermission = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/permissions/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/permissions/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/permissions`, formData)
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

export const deletePermission = (id) => {
  return new Promise((resolve, reject) => {
    del(`/permissions/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewPermissions(params) {
  return ApiService.fetchData({
    url: "/permissions",
    method: "get",
    params,
  });
}

// export async function deletePermissions(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/permissions/deletePermissions",
//     method: "post",
//     body,
//   });
// }

export const deletePermissions = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/permissions/deletePermissions`, formData)
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
