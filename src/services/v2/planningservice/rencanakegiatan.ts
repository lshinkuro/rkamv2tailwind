import api from "../../../utils/api";
import { removeDuplicate, uuidv4 } from "../../../utils/helper";
import { planningService } from "../constant";

const basePath = `${planningService}/rencana`;
const storageName = "rencanakegiatan";

export const getRencanaKegiatan = async () => {
  try {
    const response = await api.get(`${basePath}/kegiatan`);
    localStorage.setItem(storageName, JSON.stringify(response.data.return));
    return response.data.return;
  } catch (error) {
    if (error.response) throw error.response;
    else throw error;
  }
};

export type RencanaKegiatanBody = {
  id?: string;
  tahun?: number;
  madrasah_id?: string;
  kantor_kabkota_id?: string;
  kantor_provinsi_id?: string;
  kantor_pusat_id?: string;
  kode_satker?: number;
  rencana_tanggal_id?: string;
  kode_snp?: string;
  nama_snp?: string;
  kode_kegiatan?: string;
  nama_kegiatan?: string;
  kode_sub_kegiatan?: string;
  nama_sub_kegiatan?: string;
  bulan_pelaksanaan_start?: number;
  bulan_pelaksanaan_end?: number;
  kelompok_sasaran?: string;
  indikator_output?: string;
  indikator_output_target?: number;
  indikator_output_satuan?: string;
  indikator_hasil?: string;
  indikator_hasil_target?: number;
  indikator_hasil_satuan?: string;

  isNew?: boolean;
};

export const setApproveOrReject = async (reqBody: any, id: any, url: any) => {
  let localData = JSON.parse(localStorage.getItem("rencanakegiatan")!);
  const res: any = await api.put<any>(`${basePath + url}/${id}`, reqBody);
  removeDuplicate(localData, "id", reqBody.id);
  localStorage.setItem(
    "rencanakegiatan",
    JSON.stringify([res.data.return, ...localData])
  );
};

export const postRencanaKegiatan = async (
  params: RencanaKegiatanBody,
  status?: "edit"
) => {
  try {
    let localData = JSON.parse(localStorage.getItem(storageName)!) || [];
    let localDataTmp: any = [];
    if (params === null) {
      localDataTmp = localData;
    } else {
      if (!params.id || params.id === null) params.id = uuidv4();
      removeDuplicate(localData, "id", params.id);
      localDataTmp = [params, ...localData];
    }
    if (window.navigator.onLine) {
      localStorage.setItem(storageName, JSON.stringify(localDataTmp));
      for (const el0 of localDataTmp) {
        if (el0.isNew) {
         await api.post<any>(`${basePath}/kegiatan`, el0);
        }
      }
    } else {
      localDataTmp.forEach((el0: any, key: number) => {});
      if (params.id) {
        localStorage.setItem(storageName, JSON.stringify(localDataTmp));
      } else {
        console.log("gak ada data, gak ada sinyal");
      }
    }
  } catch (error) {
    if (error.response) throw error.response;
    else throw error;
  }
};

export const backgroundPostRencanaKegiatan = async () => {
  try {
    let localDataTmp: any = JSON.parse(localStorage.getItem(storageName)!);
    if (window.navigator.onLine) {
      localStorage.setItem(storageName, JSON.stringify(localDataTmp));
      localStorage.getItem(storageName);

      localDataTmp.forEach((el0: any) => {
        api.post<any>(`${basePath}/kegiatan`, el0);
      });
    }
    localStorage.setItem(storageName, JSON.stringify(localDataTmp));
  } catch (error) {
    if (error.response) throw error.response;
    else throw error;
  }
};

export const saveOffline = async (data: any, id: any) => {
  try {
    let localData = JSON.parse(localStorage.getItem(id)!);
    let localDataTmp: any = [];
    if (data === null) {
      localDataTmp = localData;
    } else {
      if (!data.id || data.id === null) data.id = uuidv4();
      removeDuplicate(localData, "id", data.id);
      localDataTmp = [data, ...localData];
    }
    if (window.navigator.onLine) {
      // let tmp0: any = [];
      localStorage.setItem(id, JSON.stringify(localDataTmp));
      localDataTmp.forEach((el0: any) => {
        if ((data !== null && el0?.id === data?.id) || el0.isNew) {
          api.post<any>(`${basePath}`, el0);
        }
      });
    } else {
      localDataTmp.forEach((el0: any, key: number) => {
        localDataTmp[key]["isNew"] = "databaru";
      });
      if (data.id) {
        localStorage.setItem(id, JSON.stringify(localDataTmp));
      } else {
        console.log("no connection");
      }
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};
