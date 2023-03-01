import { get, post, del, patch, post2 } from "../../src/helpers/api_helper";
import ApiService from "./ApiService2";

export async function getNewActivityLogs(params) {
  return ApiService.fetchData({
    url: "/activity-logs",
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
