import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getVehicles = () => {
  return new Promise((resolve, reject) => {
    get(`/vehicles`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getVehicle = (id) => {
  return new Promise((resolve, reject) => {
    get(`/vehicles/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchVehicles = (query) => {
  return new Promise((resolve, reject) => {
    get(`vehicles/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeVehicle = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/vehicles/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/vehicles/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/vehicles`, formData)
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

export const deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    del(`/vehicles/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewVehicles(params) {
  return ApiService.fetchData({
    url: "/vehicles",
    method: "get",
    params,
  });
}

// export async function deleteVehicles(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/vehicles/deleteVehicles",
//     method: "post",
//     body,
//   });
// }

export const deleteVehicles = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/vehicles/deleteVehicles`, formData)
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
