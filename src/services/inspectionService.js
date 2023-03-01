import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getInspections = () => {
  return new Promise((resolve, reject) => {
    get(`/inspections`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getInspection = (id) => {
  return new Promise((resolve, reject) => {
    get(`/inspections/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchInspections = (query) => {
  return new Promise((resolve, reject) => {
    get(`inspections/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeInspection = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/inspections/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/inspections/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/inspections`, formData)
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

export const deleteInspection = (id) => {
  return new Promise((resolve, reject) => {
    del(`/inspections/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewInspections(params) {
  return ApiService.fetchData({
    url: "/inspections",
    method: "get",
    params,
  });
}

// export async function deleteInspections(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/inspections/deleteInspections",
//     method: "post",
//     body,
//   });
// }

export const deleteInspections = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/inspections/deleteInspections`, formData)
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
