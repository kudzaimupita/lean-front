import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";
export const getReminders = () => {
  return new Promise((resolve, reject) => {
    get(`/reminders`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getReminder = (id) => {
  return new Promise((resolve, reject) => {
    get(`/reminders/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const searchReminders = (query) => {
  return new Promise((resolve, reject) => {
    get(`reminders/search?query=${query}`)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const storeReminder = (formData, id) => {
  console.log(formData, id);
  return new Promise((resolve, reject) => {
    if (id) {
      // patch(`/reminders/${id}`, formData)
      //   .then(data => resolve(data))
      //   .catch(error => reject(error))

      return patch(`/reminders/${id}`, formData)
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } else {
      return post2(`/reminders`, formData)
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

export const deleteReminder = (id) => {
  return new Promise((resolve, reject) => {
    del(`/reminders/${id}`)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export async function getNewReminders(params) {
  return ApiService.fetchData({
    url: "/reminders",
    method: "get",
    params,
  });
}

// export async function deleteReminders(body) {
//   console.log(body);
//   return ApiService.fetchData({
//     url: "/reminders/deleteReminders",
//     method: "post",
//     body,
//   });
// }

export const deleteReminders = (formData) => {
  return new Promise((resolve, reject) => {
    return post2(`/reminders/deleteReminders`, formData)
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
