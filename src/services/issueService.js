import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getIssues = () => {
  return new Promise((resolve, reject) => {
    get(`/issues`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getIssue = (id) => {
  return new Promise((resolve, reject) => {
    get(`/issues/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchIssues = (query) => {
  return new Promise((resolve, reject) => {
    get(`issues/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeIssue = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/issues/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/issues/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/issues`, formData)
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

export const deleteIssue = (id) => {
  return new Promise((resolve, reject) => {
    del(`/issues/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewIssues(params) {
  return ApiService.fetchData({
    url: "/issues",
    method: "get",
    params,
  });
}

// export async function deleteIssues(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/issues/deleteIssues",
//     method: "post",
//     body,
//   });
// }

export const deleteIssues = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/issues/deleteIssues`, formData)
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
