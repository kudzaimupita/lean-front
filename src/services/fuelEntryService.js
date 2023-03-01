import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getFuelEntries = () => {
  return new Promise((resolve, reject) => {
    get(`/fuel-entries`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getFuelEntry = (id) => {
  return new Promise((resolve, reject) => {
    get(`/fuel-entries/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchFuelEntries = (query) => {
  return new Promise((resolve, reject) => {
    get(`fuel-entries/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeFuelEntry = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/fuel-entries/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/fuel-entries/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/fuel-entries`, formData)
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

export const deleteFuelEntry = (id) => {
  return new Promise((resolve, reject) => {
    del(`/fuel-entries/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewFuelEntries(params) {
  return ApiService.fetchData({
    url: "/fuel-entries",
    method: "get",
    params,
  });
}

// export async function deleteFuelEntryTypes(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/fuel-entries/deleteFuelEntryTypes",
//     method: "post",
//     body,
//   });
// }

export const deleteFuelEntries = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/fuel-entries/deleteFuelEntries`, formData)
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
