import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getAssignments = () => {
  return new Promise((resolve, reject) => {
    get(`/assignments`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getAssignment = (id) => {
  return new Promise((resolve, reject) => {
    get(`/assignments/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchAssignments = (query) => {
  return new Promise((resolve, reject) => {
    get(`assignments/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeAssignment = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/assignments/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/assignments/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/assignments`, formData)
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

export const deleteAssignment = (id) => {
  return new Promise((resolve, reject) => {
    del(`/assignments/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewAssignments(params) {
  return ApiService.fetchData({
    url: "/assignments",
    method: "get",
    params,
  });
}

// export async function deleteAssignments(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/assignments/deleteAssignments",
//     method: "post",
//     body,
//   });
// }

export const deleteAssignments = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/assignments/deleteAssignments`, formData)
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
