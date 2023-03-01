import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getDocuments = () => {
  return new Promise((resolve, reject) => {
    get(`/documents`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getDocument = (id) => {
  return new Promise((resolve, reject) => {
    get(`/documents/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchDocuments = (query) => {
  return new Promise((resolve, reject) => {
    get(`documents/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeDocument = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/documents/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/documents/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/documents`, formData)
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

export const deleteDocument = (id) => {
  return new Promise((resolve, reject) => {
    del(`/documents/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewDocuments(params) {
  return ApiService.fetchData({
    url: "/documents",
    method: "get",
    params,
  });
}

// export async function deleteDocuments(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/documents/deleteDocuments",
//     method: "post",
//     body,
//   });
// }

export const deleteDocuments = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/documents/deleteDocuments`, formData)
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
