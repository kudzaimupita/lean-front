import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getFluidResources = () => {
  return new Promise((resolve, reject) => {
    get(`/fluid-resources`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getFluidResource = (id) => {
  return new Promise((resolve, reject) => {
    get(`/fluid-resources/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchFluidResources = (query) => {
  return new Promise((resolve, reject) => {
    get(`fluidResources/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeFluidResource = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/fluid-resources/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/fluid-resources/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/fluid-resources`, formData)
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

export const deleteFluidResource = (id) => {
  return new Promise((resolve, reject) => {
    del(`/fluid-resources/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewFluidResources(params) {
  return ApiService.fetchData({
    url: "/fluid-resources",
    method: "get",
    params,
  });
}

// export async function deleteFluidResources(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/fluid-resources/deleteFluidResources",
//     method: "post",
//     body,
//   });
// }

export const deleteFluidResources = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/fluid-resources/deleteFluidResources`, formData)
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
