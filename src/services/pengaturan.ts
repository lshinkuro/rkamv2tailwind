import api from "../utils/api";
import qs from "query-string";

//get staff madrasah
export const getStaffMadrasah = async (queryParam: string): Promise<any> => {
  const params = {
    queryParam: JSON.stringify(queryParam),
  };
  const response = await api.get<any>("/pengaturan/staf-madrasah", { params });
  return response.data.return;
};

export const editStaffMadrasah = async (queryParam: object): Promise<any> => {
  const params = {
    queryParam: JSON.stringify(queryParam),
  };
  const response = await api.post<any>("/pengaturan/staf-madrasah", { params });
  return response.data.return;
};

export const addStaffMadrasah = async (queryParam: object): Promise<any> => {
  const response = await api.post<any>(
    "/pengaturan/add-staf-madrasah",
    qs.stringify(queryParam),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.return;
};

//get staff madrasah
export const getRekening = async (
  limit: number,
  offset: number,
  tahun: string
): Promise<any> => {
  const response = await api.get<any>("/pengaturan/rekening-bank", {
    params: { limit: limit, offset: offset, queryParam: { tahun: tahun } },
  });
  return response.data.return;
};

export const addRekening = async (tmp0: any) => {
  console.log("input", tmp0);
  const result = await api.post(
    "/pengaturan/save-rekening-bank",
    qs.stringify(tmp0),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return result.data.return;
};

export const getPenerima = async (
  limit: number,
  offset: number
): Promise<any> => {
  const response = await api.get<any>("/pengaturan/penerima", {
    params: { limit: limit, offset: offset, queryParam: {} },
  });
  return response.data.return;
};

export const addPenerima = async (tmp: any) => {
  const params = {
    queryParam: JSON.stringify(tmp),
  };
  const result = await api.post("/pengaturan/peneriman", params);
  const data = result.data;
  return data;
};
