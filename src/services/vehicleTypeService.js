import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getVehicleTypes = () => {
  return new Promise((resolve, reject) => {
    get(`/vehicle-types`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getVehicleType = (id) => {
  return new Promise((resolve, reject) => {
    get(`/vehicle-types/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchVehicleTypes = (query) => {
  return new Promise((resolve, reject) => {
    get(`vehicle-types/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeVehicleType = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/vehicle-types/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/vehicle-types/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/vehicle-types`, formData)
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

export const deleteVehicleType = (id) => {
  return new Promise((resolve, reject) => {
    del(`/vehicle-types/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewVehicleTypes(params) {
  console.log(params);
  return ApiService.fetchData({
    url: "/vehicle-types",
    method: "get",
    params,
  });
}

// export async function deleteVehicleTypeTypes(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/vehicle-types/deleteVehicleTypeTypes",
//     method: "post",
//     body,
//   });
// }

export const deleteVehicleTypes = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/vehicle-types/deleteVehicleTypes`, formData)
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
