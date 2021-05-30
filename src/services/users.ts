import api from "../utils/api";
import { removeDuplicate } from "../utils/helper";

export const getAllUsers = async (): Promise<any> => {
  // let tmp : any [];
  const result = await api.get("/profile/pengguna");
  const data = [result.data.return];
  return data;
};

export const createUser = async (
  data?: any,
  id?: any,
  status?: any
): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem(id)!);

  if (status === "edit") {
    let tmp1: any = removeDuplicate(tmp0, "id", data.id);
    const response: any = await api.put<any>(
      "/v2/user-services/management-user/edit-user/" + data.id,
      data
    );
    localStorage.setItem(id, JSON.stringify([response.data.return, ...tmp1]));
  } else {
    const response: any = await api.post<any>(
      "/v2/user-services/management-user/create-user",
      data
    );
    localStorage.setItem(id, JSON.stringify([response.data.return, ...tmp0]));
  }
};

export const getRoleS = async (idz: any): Promise<any> => {
  let tmp0 = idz === "prov" ? "provinsi" : idz;
  const response = await api.get<any>(
    "/v2/user-services/role?group=" + tmp0 + "&activated=1"
  );
  let tmp1: any = response.data.return;

  const value = JSON.stringify(tmp1);
  localStorage.setItem(idz + "role", value);
  return response.data.return;
};

export const deletUser = async (): Promise<any> => {
  const response = await api.post<any>("/v2/user-services/auth/logout", {});
  let tmp1: any = response.data.return;
  const value = JSON.stringify(tmp1);
  return response.data.return;
};

export const getUser = async (idz: any): Promise<any> => {
  let tmp0 = idz === "prov" ? "provinsi" : idz;
  const response = await api.get<any>(
    "/v2/user-services/role-user?group=" + tmp0
  );
  let tmp1: any = response.data.return;

  const value = JSON.stringify(tmp1);
  localStorage.setItem(idz, value);
  return response.data.return;
};
export const getKanwil = async (
  limit: number,
  offset: number,
  kodeRole: string
) => {
  const result = await api.get("/management-user/kanwil", {
    params: {
      limit: limit,
      offset: offset,
      queryParam: { kodeRole: kodeRole },
    },
  });
  const data = result.data.return;
  return data;
};

export const getKankemenag = async (
  limit: number,
  offset: number,
  kodeRole: string
) => {
  const result = await api.get("/management-user/kankemenag", {
    params: {
      limit: limit,
      offset: offset,
      queryParam: { kodeRole: kodeRole },
    },
  });
  const data = result.data.return;
  return data;
};

export const postPusat = async (tmp: any) => {
  const params = {
    queryParam: JSON.stringify(tmp),
  };
  const result = await api.post("/management-user/add-pusat", params);
  const data = result.data;
  return data;
};

export const checkNik = async (tmp1: any) => {
  const result = await api.get("/management-user/check-username", {
    params: {
      queryParam: tmp1,
    },
  });
  const data = result.data.return;
  return data;
};

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};
export const checkEmail = async (tmp2: any) => {
  const result = await api.post(
    "/management-user/check-email",
    {
      queryParam: tmp2,
    },
    {
      headers: headers,
    }
  );
  const data = result.data.return;
  return data;
};

export const getRole = async () => {
  const result = await api.get("/management-user/role");
  const data = result.data.return;
  return data;
};

export const getMadrasah = async () => {
  const response = await api.get<any>(
    "/v2/user-services/my-madrasah"
  );
  const data = response.data.return
  localStorage.setItem("profile-madrasah", JSON.stringify(data));
  return data
}

export const bulkEditPpk = async (data: any): Promise<any> => {
  const response = await api.put(
    `/v2/user-services/bulk-edit-ppk`,
    data
  );
  localStorage.setItem(
    "profile-madrasah",
    JSON.stringify(response.data.return)
  );
  return response.data.return;
};