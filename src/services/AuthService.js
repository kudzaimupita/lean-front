import ApiService from "./ApiService2";

export async function apiSignIn(data) {
  return ApiService.fetchData({
    url: "auth/login",
    method: "post",
    data,
  });
}

export async function getCustomer(email) {
  return ApiService.fetchData({
    url: `auth/get-customer/${email}`,
    method: "get",
  });
}

export async function apiSignUp(data) {
  return ApiService.fetchData({
    url: "auth/register",
    method: "post",
    data,
  });
}

export async function apiSignOut(data) {
  return ApiService.fetchData({
    url: "/sign-out",
    method: "post",
    data,
  });
}

export async function apiForgotPassword(data) {
  return ApiService.fetchData({
    url: "/forgot-password",
    method: "post",
    data,
  });
}

export async function apiResetPassword(data) {
  return ApiService.fetchData({
    url: "/reset-password",
    method: "post",
    data,
  });
}
