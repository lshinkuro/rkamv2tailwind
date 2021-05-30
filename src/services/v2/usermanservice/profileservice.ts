import api from "../../../utils/api";
import { usermanService } from "../constant";
import qs from "query-string";

const basePath = `${usermanService}/profile`;
const formUrlEncodedHeader = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export type profileDataType = {
  nama?: string;
  kode_provinsi?: string;
  kode_kabkota?: string;
  kode_kecamatan?: string;
  kode_kelurahan?: string;
  rt?: string;
  rw?: string;
  alamat_jalan?: string;
};

export const getMyProfile = async () => {
  try {
    if (window.navigator.onLine) {
      const response = await api.get(`${basePath}/my-profile`);
      localStorage.setItem("profile", JSON.stringify(response));
      return response;
    } else {
      const res = await JSON.parse(localStorage.getItem("profile")!);
      return res;
    }
  } catch (error) {
    if (error.response) throw error.response;
    else throw error;
  }
};

export const editMyProfile = async (params: profileDataType) => {
  const response = await api.put(`${basePath}/edit-profile`, params, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export type nikType = {
  nik: string;
};

export const editNIK = async (params: nikType) => {
  const response = await api.put(`${basePath}/edit-nik`, params, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export type passType = {
  password_lama: string;
  password_baru: string;
};

export const editPass = async (params: passType) => {
  const response = await api.put(`${basePath}/ganti-password`, params, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};
