import api from "../../../utils/api";
import qs from "query-string";

//PPK
export const getMadrasah = async (params?: any): Promise<any> => {
  const response = await api.get<any>(
    `/v2/user-services/madrasah?activated=1&kode_kabkota=${params}`
  );
  // let tmp0: any = response.data.return;
  // const value = JSON.stringify(tmp0);
  // localStorage.setItem("referensi-sumberdana", value);
  return response.data.return;
};
//put ppk
export const putMadrasahPPK = async (params?: any): Promise<any> => {
  const id = params.id;
  const kode_level_ppk = params.kode_level_ppk;
  const response = await api.put<any>(`/v2/user-services/madrasah/${id}`, {
    kode_level_ppk,
  });
  // let tmp0: any = response.data.return;
  // const value = JSON.stringify(tmp0);
  // localStorage.setItem("referensi-sumberdana", value);
  return response.data.return;
};

//read madrasah ppk
export const getMadrasahPPK = async (params?: any): Promise<any> => {
  const response = await api.get<any>(`/v2/user-services/madrasah/${params}`);
  // let tmp0: any = response.data.return;
  // const value = JSON.stringify(tmp0);
  // localStorage.setItem("referensi-sumberdana", value);
  return response.data.return;
};
//getLevelPPK
export const getLvPPK = async (params?: any): Promise<any> => {
  const response = await api.get<any>(
    `/v2/reference-services/level-ppk?activated=1&kode_provinsi=${params}`
  );
  // let tmp0: any = response.data.return;
  // const value = JSON.stringify(tmp0);
  // localStorage.setItem("referensi-sumberdana", value);
  return response.data.return;
};
