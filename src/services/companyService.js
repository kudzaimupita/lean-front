import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getCompanies = () => {
  return new Promise((resolve, reject) => {
    get(`/companies`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getCompany = (id) => {
  return new Promise((resolve, reject) => {
    get(`/companies/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const checkout = (body) => {
  return new Promise((resolve, reject) => {
    post(`/companies/checkout`, body)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const updateSubscription = (body) => {
  return new Promise((resolve, reject) => {
    post(`/companies/updateSubscription`, body)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchCompanies = (query) => {
  return new Promise((resolve, reject) => {
    get(`companies/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeCompany = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/companies/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/companies/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/companies`, formData)
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

export const deleteCompany = (id) => {
  return new Promise((resolve, reject) => {
    del(`/companies/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewCompanies(params) {
  return ApiService.fetchData({
    url: "/companies",
    method: "get",
    params,
  });
}

// export async function deleteCompanies(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/companies/deleteCompanies",
//     method: "post",
//     body,
//   });
// }

export const deleteCompanies = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/companies/deleteCompanies`, formData)
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
