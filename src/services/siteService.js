import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getSites = () => {
  return new Promise((resolve, reject) => {
    get(`/sites`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getSite = (id) => {
  return new Promise((resolve, reject) => {
    get(`/sites/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchSites = (query) => {
  return new Promise((resolve, reject) => {
    get(`sites/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeSite = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/sites/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/sites/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/sites`, formData)
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

export const deleteSite = (id) => {
  return new Promise((resolve, reject) => {
    del(`/sites/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewSites(params) {
  return ApiService.fetchData({
    url: "/sites",
    method: "get",
    params,
  });
}

// export async function deleteSites(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/sites/deleteSites",
//     method: "post",
//     body,
//   });
// }

export const deleteSites = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/sites/deleteSites`, formData)
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
