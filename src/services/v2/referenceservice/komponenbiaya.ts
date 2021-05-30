import api from "../../../utils/api";
import { referenceService } from "../constant";

const basePath = `${referenceService}`;

export const getKatKomBiaya = async (): Promise<any> => {
  const response = await api.get(`${basePath}/kategori-komponen-biaya`);
  localStorage.setItem(
    "komponenbiaya/kategori",
    JSON.stringify(response.data.return)
  );
  return response.data.return;
};

export const getKatJenisBelanja = async (): Promise<any> => {
  const response = await api.get(`${basePath}/kategori-belanja`);
  localStorage.setItem(
    "kategoriKomponenBiaya",
    JSON.stringify(response.data.return)
  );
  return response.data.return;
};

export const getJsonXlsx = async (
  kodeProvinsi: string,
  kodeKabkota: string
): Promise<any> => {
  const response = await api.get(`${basePath}/template-komponen-biaya-json?tahun=2021&kode_provinsi=${kodeProvinsi}&kode_kabkota=${kodeKabkota}`);
  return response.data.return;
};


export const testUpload = async (data: any): Promise<any> => {
  const response = await api.post(
    `${basePath}/upload-template-komponen-biaya`,
    data
  );
  return response.data.return;
};
