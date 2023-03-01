import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getExpenseTypes = () => {
  return new Promise((resolve, reject) => {
    get(`/expense-types`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getExpenseType = (id) => {
  return new Promise((resolve, reject) => {
    get(`/expense-types/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchExpenseTypes = (query) => {
  return new Promise((resolve, reject) => {
    get(`expense-types/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeExpenseType = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/expense-types/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/expense-types/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/expense-types`, formData)
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

export const deleteExpenseType = (id) => {
  return new Promise((resolve, reject) => {
    del(`/expense-types/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewExpenseTypes(params) {
  return ApiService.fetchData({
    url: "/expense-types",
    method: "get",
    params,
  });
}

// export async function deleteExpenseTypeTypes(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/expense-types/deleteExpenseTypeTypes",
//     method: "post",
//     body,
//   });
// }

export const deleteExpenseTypes = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/expense-types/deleteExpenseTypes`, formData)
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
