import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getVehicleTypes = () => {
  return new Promise((resolve, reject) => {
    get(`/vehicle-type-category`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getVehicleTypeCategory = (id) => {
  return new Promise((resolve, reject) => {
    get(`/vehicle-type-category/${id}`)
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

export const storeVehicleTypeCategory = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/vehicle-type-category/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/vehicle-type-category/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/vehicle-type-category`, formData)
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

export const deleteVehicleTypeCategory = (id) => {
  return new Promise((resolve, reject) => {
    del(`/vehicle-type-category/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewVehicleTypeCategories(params) {
  console.log(params);
  return ApiService.fetchData({
    url: "/vehicle-type-category",
    method: "get",
    params,
  });
}

// export async function deleteVehicleTypeTypes(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/vehicle-type-category/deleteVehicleTypeTypes",
//     method: "post",
//     body,
//   });
// }

export const deleteVehicleTypeCategories = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/vehicle-type-category/deleteVehicleTypeCategories`, formData)
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
