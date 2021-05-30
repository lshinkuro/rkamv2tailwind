import api from "../utils/api";

export const getAllUsers = async () => {
  // let tmp: any = [];
  const result = await api.get("/user/apps");
  // tmp.push(result.data.return.user);
  const data = [result.data.return.user];
  return data;
};

export const getProfilePengguna = async () => {
  let tmp: any = [];
  const result = await api.get("/profile/pengguna");
  tmp.push(result.data.return);
  const data = tmp;
  return data;
};

export const editProfilePengguna = async (params: any) => {
  console.log("Edit Profile : ", api.getUri);
  let tmp: any = [];
  const result = await api.put("profile/save-pengguna", params);
  tmp.push(result.data.return);
  const data = tmp;
  return data;
};

export const requestEmailVerifikasi = async (params: any) => {
  console.log("request email verifikasi : ", api.getUri);
  let tmp: any = [];
  const result = await api.put(
    "/profile/request-kode-verifikasi-email",
    params
  );
  tmp.push(result.data.return);
  const data = tmp;
  return data;
};

export const validasiKodeVerifikasiEmail = async (params: any) => {
  console.log("validasi-kode-verifikasi-email : ", api.getUri);
  let tmp: any = [];
  const result = await api.post(
    "/profile/validasi-kode-verifikasi-email",
    params
  );
  tmp.push(result.data.return);
  const data = tmp;
  return data;
};

export const gantiEmail = async (params: any) => {
  console.log("ganti-email : ", api.getUri);
  let tmp: any = [];
  const result = await api.put("/profile/ganti-email", params);
  tmp.push(result.data.return);
  const data = tmp;
  return data;
};

export const gantiNik = async (params: any) => {
  console.log("ganti-nik : ", api.getUri);
  let tmp: any = [];
  const result = await api.post("/profile/ganti-nik", params);
  tmp.push(result.data.return);
  const data = tmp;
  return data;
};
