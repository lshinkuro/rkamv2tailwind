import api from "../utils/api";

export const getProfileMadrasah = async () => {
  // let tmp = [];
  const result: any = await api.get(
    "/management-user/profil-pengguna?queryParam=1&limit=0&offset=0"
  );
  // tmp.push();
  const data = [result.data.return];
  return data;
};

export const getMyMadrasah = async (ref: any): Promise<any> => {
  const response :any = await api.get<any>(
    "/v2/user-services/madrasah?activated=1&kode_kabkota=" + ref
  );
  // let tmp0: any = response.data.return;

  const value = JSON.stringify([response.data.return]);
  localStorage.setItem("madrasahdropdown", value);
  return response.data.return;
};
