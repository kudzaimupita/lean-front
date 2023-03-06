import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getEvents = () => {
  return new Promise((resolve, reject) => {
    get(`/events`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

// export const getDataEntries = () => {
//   return new Promise((resolve, reject) => {
//     get(`/events/dataEntry`)
//       .then((data) => resolve(data))
//       .catch((error) => reject(error));
//   });
// };

export async function getDataEntries(params) {
  return ApiService.fetchData({
    url: "/events/dataEntry",
    method: "get",
    params,
  });
}
export const getEvent = (id) => {
  return new Promise((resolve, reject) => {
    get(`/events/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchEvents = (query) => {
  return new Promise((resolve, reject) => {
    get(`events/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeEventDataEntry = (formData, collectionName) => {
  console.log(formData, collectionName);
  return new Promise((resolve, reject) => {
    return post2(`/events/dataEntry`, {
      ...formData,
      collectionName: collectionName,
    })
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

export const deleteEvent = (id) => {
  return new Promise((resolve, reject) => {
    del(`/events/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewEvents(params) {
  return ApiService.fetchData({
    url: "/events",
    method: "get",
    params,
  });
}

// export async function deleteEvents(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/events/deleteEvents",
//     method: "post",
//     body,
//   });
// }

export const deleteEvents = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/events/deleteEvents`, formData)
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
