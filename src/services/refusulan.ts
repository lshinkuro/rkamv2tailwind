import api from "../utils/api";
import qs from "query-string";

let headers = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
};

export const getUsulanSubKegiatan = async (
  queryParam: object,
  limit?: number,
  offset?: number
): Promise<any> => {
  const params = {
    limit: limit !== undefined ? limit.toString() : null,
    offset: offset !== undefined ? offset.toString() : null,
    queryParam: JSON.stringify(queryParam),
  };
  const response = await api.get<any>("/ref/usulan-sub-kegiatan", { params });
  return response.data.return;
};

export const getStandarPendidikan = async () => {
  const result = await api.get("/ref/snp?queryParam=%7B%22tahun%22:2021%7D");
  return result.data.return;
};

export const getKegiatanSnp = async (e: any) => {
  const result = await api.get(`/ref/kegiatan-snp`, {
    params: {
      queryParam: e,
    },
  });
  return result.data.return;
};

export const getSubUsulanPenggunaBos = async (e: any) => {
  const result = await api.get(
    `/ref/penggunaan-bos?queryParam=%7B%22tahun%22:2021%7D  `
  );
  return result.data.return;
};

export const getUsulanBos = async () => {
  const result = await api.get(
    "/ref/penggunaan-bos?queryParam=%7B%22tahun%22:2021%7D"
  );
  return result.data.return;
};

export const getUsulanKomponen = async (
  queryParam: object,
  limit?: number,
  offset?: number
): Promise<any> => {
  const params = {
    limit: limit !== undefined ? limit.toString() : null,
    offset: offset !== undefined ? offset.toString() : null,
    queryParam: JSON.stringify(queryParam),
  };
  const response = await api.get<any>("/ref/usulan-komponen-biaya", { params });
  return response.data.return;
};
