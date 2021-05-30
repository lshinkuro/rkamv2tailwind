import api from "../../../utils/api";
import { usermanService } from "../constant";
import qs from "query-string";

const basePath = `${usermanService}`;
const formUrlEncodedHeader = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const getPusat = async () => {
    try {
      if (window.navigator.onLine) {
        const response = await api.get(`${basePath}/kantor-pusat?activated=1`);
        localStorage.setItem("oPusat", JSON.stringify(response));
        return response;
      } else {
        const res = await JSON.parse(localStorage.getItem("oPusat")!);
        return res;
      }
    } catch (error) {
      if (error.response) throw error.response;
      else throw error;
    }
};
export const getProv = async () => {
    try {
      if (window.navigator.onLine) {
        const response = await api.get(`${basePath}/kantor-provinsi?activated=1`);
        localStorage.setItem("oProv", JSON.stringify(response));
        return response;
      } else {
        const res = await JSON.parse(localStorage.getItem("oProv")!);
        return res;
      }
    } catch (error) {
      if (error.response) throw error.response;
      else throw error;
    }
};
export const getKab = async () => {
    try {
      if (window.navigator.onLine) {
        const response = await api.get(`${basePath}/kantor-kabkota?activated=1`);
        localStorage.setItem("oKab", JSON.stringify(response));
        return response;
      } else {
        const res = await JSON.parse(localStorage.getItem("oKab")!);
        return res;
      }
    } catch (error) {
      if (error.response) throw error.response;
      else throw error;
    }
};
export const getMad = async (params : string) => {
    try {
      if (window.navigator.onLine) {
        const response = await api.get(`${basePath}/madrasah?activated=1&kode_kabkota=${params}`);
        localStorage.setItem("oMadrasah", JSON.stringify(response));
        return response;
      } else {
        const res = await JSON.parse(localStorage.getItem("oMadrasah")!);
        return res;
      }
    } catch (error) {
      if (error.response) throw error.response;
      else throw error;
    }
};

export const drillDownProv = async (params : string) => {
    try {
        if (window.navigator.onLine) {
          const response = await api.get(`${basePath}/kantor-provinsi/kantor-pusat/${params}`);
          localStorage.setItem("dProv", JSON.stringify(response));
          return response;
        } else {
          const res = await JSON.parse(localStorage.getItem("dProv")!);
          return res;
        }
      } catch (error) {
        if (error.response) throw error.response;
        else throw error;
      }
}
export const drillDownKab = async (params : any) => {
    try {
        if (window.navigator.onLine) {
          const response = await api.get(`${basePath}/kantor-kabkota/kantor-pusat/${params.pusat}/kantor-provinsi/${params.prov}`);
          localStorage.setItem("dKab", JSON.stringify(response));
          return response;
        } else {
          const res = await JSON.parse(localStorage.getItem("dKab")!);
          return res;
        }
      } catch (error) {
        if (error.response) throw error.response;
        else throw error;
      }
}

export const drillDownMad = async (params : any) => {
    try {
        if (window.navigator.onLine) {
          const response = await api.get(`${basePath}/madrasah/kantor-pusat/${params.pusat}/kantor-provinsi/${params.prov}/kantor-kabkota/${params.kab}`);
          localStorage.setItem("dMadrasah", JSON.stringify(response));
          return response;
        } else {
          const res = await JSON.parse(localStorage.getItem("dMadrasah")!);
          return res;
        }
      } catch (error) {
        if (error.response) throw error.response;
        else throw error;
      }
}