import { get, post, del, patch, post2 } from "../helpers/api_helper";
import ApiService from "./ApiService2";
export const getLocations = () => {
  return new Promise((resolve, reject) => {
    get(`/locations`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getLocation = (id) => {
  return new Promise((resolve, reject) => {
    get(`/locations/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchLocations = (query) => {
  return new Promise((resolve, reject) => {
    get(`locations/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeLocation = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/locations/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/locations/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/locations`, formData)
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

export const deleteLocation = (id) => {
  return new Promise((resolve, reject) => {
    del(`/locations/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewLocations(params) {
  return ApiService.fetchData({
    url: "/locations",
    method: "get",
    params,
  });
}

// export async function deleteLocations(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/locations/deleteLocations",
//     method: "post",
//     body,
//   });
// }

export const deleteLocations = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/locations/deleteLocations`, formData)
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
