import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getDataEntries = () => {
  return new Promise((resolve, reject) => {
    get(`/data-entries`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getDataEntry = (id) => {
  return new Promise((resolve, reject) => {
    get(`/data-entries/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchDataEntries = (query) => {
  return new Promise((resolve, reject) => {
    get(`data-entries/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeDataEntry = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/data-entries/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/data-entries/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/data-entries`, formData)
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

export const deleteDataEntry = (id) => {
  return new Promise((resolve, reject) => {
    del(`/data-entries/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewDataEntries(params) {
  return ApiService.fetchData({
    url: "/data-entries",
    method: "get",
    params,
  });
}

// export async function deleteDataEntryTypes(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/data-entries/deleteDataEntryTypes",
//     method: "post",
//     body,
//   });
// }

export const deleteDataEntries = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/data-entries/deleteDataEntries`, formData)
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
