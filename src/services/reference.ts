// import { Http2ServerResponse } from "node:http2";
import api from "../utils/api";

export const getKegiatan = async (param?: object): Promise<any> => {
  const response = await api.get<any>("/v2/reference-services/kegiatan", {
    params: param,
  });
  let tmp0: any = response.data.return;
  localStorage.setItem("kegiatan", JSON.stringify(tmp0));
  return response.data.return;
};

export const getSnp = async (): Promise<any> => {
  const response = await api.get<any>("/v2/reference-services/snp?activated=1");
  let tmp0: any = response.data.return;

  const value = JSON.stringify(tmp0);
  localStorage.setItem("snp", value);
  return response.data.return;
};

export const getBank = async (): Promise<any> => {
  const response = await api.get<any>(
    "/v2/reference-services/bank?activated=1"
  );
  let tmp0: any = response.data.return;

  const value = JSON.stringify(tmp0);
  localStorage.setItem("bank", value);
  return response.data.return;
};

export const getRef = async (
  ref: any,
  tahun: any,
  storageName: any
): Promise<any> => {
  let response: any = await api.get<any>(
    `/v2/reference-services/${ref}?tahun=${tahun}&activated=${1}`
  );
  localStorage.setItem(storageName, JSON.stringify(response.data.return));
  return response.data.return;
};

export const getLokasi = async (idz: any): Promise<any> => {
  let tmp0 = idz === "prov" ? "provinsi" : idz;
  const response = await api.get<any>(
    "/v2/reference-services/" + tmp0 + "?activated=1"
  );
  let tmp1: any = response.data.return;

  const value = JSON.stringify(tmp1);
  localStorage.setItem(idz + "dropdown", value);
  return response.data.return;
};

export const saveSnp = async (data?: object, id?: any): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("snp")!);
  let tmp1: any = null;
  var removeDuplicate = function (arr: any, attr: any, value: any) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  removeDuplicate(tmp0, "kode", id);
  if (data === null) {
    tmp1 = tmp0;
  } else {
    tmp1 = [data, ...tmp0];
  }

  if (window.navigator.onLine) {
    localStorage.setItem("snp", JSON.stringify(tmp1));
    localStorage.getItem("snp");
    tmp1.forEach((el0: any) => {
      if (el0.kode === id) {
        api.post<any>("/v2/reference-services/snp", el0);
      } else if (el0.isNew === "databaru") {
        api.post<any>("/v2/reference-services/snp", el0);
      }
    });
  } else {
    tmp1.forEach((el0: any, key: number) => {
      tmp1[key]["isNew"] = "databaru";
    });
    if (id) {
      localStorage.setItem("snp", JSON.stringify(tmp1));
    } else {
      console.log("gak ada data, gak ada sinyal");
    }
  }
};

export const deleteSnp = async (id?: any): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("snp")!);
  let tmp1: any = null;
  tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== id;
  });
  localStorage.setItem("snp", JSON.stringify(tmp1));
  return await api.delete<any>("/v2/reference-services/snp/" + id);
};

// };

export const saveOnline = async (
  data?: any,
  url?: any,
  id?: any,
  localStorageName?: string
): Promise<any> => {
  let tmp0 = JSON.parse(
    localStorage.getItem(!!localStorageName ? localStorageName : id)!
  );
  let tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== data.id;
  });
  const response = await api.post<any>("/v2/" + url + "/" + id, data);
  let tmp2 = [response.data.return, ...tmp1];

  localStorage.setItem(
    !!localStorageName ? localStorageName : id,
    JSON.stringify(tmp2)
  );
};

export const updateOnline = async (
  data?: any,
  url?: any,
  id?: any,
  localStorageName?: string
): Promise<any> => {
  let tmp0 = JSON.parse(
    localStorage.getItem(!!localStorageName ? localStorageName : id)!
  );
  let tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== data.id;
  });
  const response = await api.put<any>("/v2/" + url + "/" + id, data);
  let tmp2 = [response.data.return, ...tmp1];

  localStorage.setItem(
    !!localStorageName ? localStorageName : id,
    JSON.stringify(tmp2)
  );
};

export const saveKelompokSasaran = async (
  data?: any,
  url?: any,
  id?: any,
  status?: any,
  kKategori?: any
): Promise<any> => {
  let response: any = [];
  if (status === "edit") {
    response = await api.put<any>(`/v2/${url}/${id}/${kKategori}`, data);
  } else {
    response = await api.post<any>("/v2/" + url + "/" + id, data);
  }
  return response.data.return;
};
export const deleteOnline = async (
  data?: any,
  url?: any,
  id?: any,
  localStorageName?: string
): Promise<any> => {
  let tmp0 = JSON.parse(
    localStorage.getItem(!!localStorageName ? localStorageName : id)!
  );
  let tmp1: any = null;
  tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== data;
  });
  const res: any = await api.delete<any>("/v2/" + url + "/" + id + "/" + data);
  let tmp2 = [res.data.return, ...tmp1];
  localStorage.setItem(
    !!localStorageName ? localStorageName : id,
    JSON.stringify(tmp2)
  );
};

export const getPenggunaanBos = async (): Promise<any> => {
  const response = await api.get<any>("/v2/reference-services/penggunaan-bos");
  let tmp0: any = response.data.return;

  const value = JSON.stringify(tmp0);
  localStorage.setItem("pbos", value);
  return response.data.return;
};

export const getKegiatanBop = async (): Promise<any> => {
  const response = await api.get<any>("/v2/reference-services/kegiatan-bop");
  let tmp0: any = response.data.return;

  const value = JSON.stringify(tmp0);
  localStorage.setItem("kegiatan-bop", value);
  return response.data.return;
};

//API untuk master data reference Tahun

export const getTahun = async (): Promise<any> => {
  const response = await api.get<any>("/v2/reference-services/tahun");
  let tmp0: any = response.data.return;
  const value = JSON.stringify(tmp0);
  localStorage.setItem("tahun", value);
  return tmp0;
};

export const saveTahun = async (data?: object, id?: any): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("tahun")!);
  let tmp1: any = null;
  tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== id;
  });

  const response: any = await api.post<any>(
    "/v2/reference-services/tahun",
    data
  );
  if (response) {
    let tmp2 = [response.data.return, ...tmp1];
    localStorage.setItem("tahun", JSON.stringify(tmp2));
  }
  // return await JSON.parse(localStorage.getItem("tahun")!);
  console.log("Res Tahun:", response.data.return);
  return response.data.return;
};

export const deleteTahun = async (id?: any): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("tahun")!);
  let tmp1: any = null;
  tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== id;
  });
  const res: any = await api.delete<any>("/v2/reference-services/tahun/" + id);
  let tmp2 = [res.data.return, ...tmp1];
  localStorage.setItem("tahun", JSON.stringify(tmp2));
  return await JSON.parse(localStorage.getItem("tahun")!);
};

//API untuk master data reference Rekening-belanja

export const getRekeningBelanja = async (): Promise<any> => {
  const response = await api.get<any>(
    "/v2/reference-services/rekening-belanja?activated=1"
  );
  let tmp0: any = response.data.return;
  const value = JSON.stringify(tmp0);
  localStorage.setItem("rekening-belanja", value);
  return response.data.return;
};

export const saveRekeningBelanja = async (
  data?: object,
  id?: any
): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("rekening-belanja")!);
  let tmp1: any = null;

  var removeDuplicate = function (arr: any, attr: any, value: any) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  removeDuplicate(tmp0, "id", id);
  if (data === null) {
    tmp1 = tmp0;
  } else {
    tmp1 = [data, ...tmp0];
  }

  const response = await api.post<any>(
    "/v2/reference-services/rekening-belanja",
    data
  );
  console.log("data pos", response.data.return);
  tmp1 = [response.data.return, ...tmp0];
  localStorage.setItem("rekening-belanja", JSON.stringify(tmp1));
  return response.data.return;
};

export const deleteReferensiRekeningBelanja = async (
  id?: any
): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("rekening-belanja")!);
  let tmp1: any = null;
  tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== id;
  });
  localStorage.setItem("rekening-belanja", JSON.stringify(tmp1));
  return await api.delete<any>("/v2/reference-services/rekening-belanja/" + id);
};

//API Untuk Master Data Get Kegiatan

export const getReferensiKegiatan = async (): Promise<any> => {
  const response = await api.get<any>(
    "/v2/reference-services/kegiatan?tahun=2021&activated=1"
  );
  const value = JSON.stringify([response.data.return]);
  localStorage.setItem("referensi-kegiatan", value);
  return response.data.return;
};

export const saveReferensiKegiatan = async (
  data?: object,
  id?: any
): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("referensi-kegiatan")!);
  let tmp1: any = null;

  var removeDuplicate = function (arr: any, attr: any, value: any) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  removeDuplicate(tmp0, "id", id);
  if (data === null) {
    tmp1 = tmp0;
  } else {
    tmp1 = [data, ...tmp0];
  }

  const response = await api.post<any>("/v2/reference-services/kegiatan", data);
  tmp1 = [response.data.return, ...tmp0];
  localStorage.setItem("referensi-kegiatan", JSON.stringify(tmp1));
  return response.data.return;
};

export const deleteReferensiKegiatan = async (id?: any): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("referensi-kegiatan")!);
  let tmp1: any = null;
  tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== id;
  });
  localStorage.setItem("referensi-kegiatan", JSON.stringify(tmp1));
  return await api.delete<any>("/v2/reference-services/kegiatan/" + id);
};

//API untuk Membuat master data reference SUB KEGIATAN

export const getReferensiSubKegiatan = async (): Promise<any> => {
  const response = await api.get<any>(
    "/v2/reference-services/sub-kegiatan?tahun=2021&activated=1"
  );
  let tmp0: any = response.data.return;
  const value = JSON.stringify(tmp0);
  localStorage.setItem("referensi-subkegiatan", value);
  return response.data.return;
};

export const saveReferensiSubKegiatan = async (
  data?: object,
  id?: any
): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("referensi-subkegiatan")!);
  let tmp1: any = null;

  var removeDuplicate = function (arr: any, attr: any, value: any) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  removeDuplicate(tmp0, "id", id);
  if (data === null) {
    tmp1 = tmp0;
  } else {
    tmp1 = [data, ...tmp0];
  }

  const response = await api.post<any>(
    "/v2/reference-services/sub-kegiatan",
    data
  );
  tmp1 = [response.data.return, ...tmp0];
  localStorage.setItem("referensi-subkegiatan", JSON.stringify(tmp1));
  return response.data.return;
};

export const deleteReferensiSubKegiatan = async (id?: any): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("referensi-subkegiatan")!);
  let tmp1: any = null;
  tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== id;
  });
  const res: any = await api.delete<any>(
    "/v2/reference-services/sub-kegiatan/" + id
  );
  let tmp2 = [res.data.return, ...tmp1];
  localStorage.setItem("referensi-subkegiatan", JSON.stringify(tmp2));
};

//API Untuk master data sumber dana-madrasah;

export const getReferensiSumberDana = async (): Promise<any> => {
  const response = await api.get<any>(
    "/v2/reference-services/sumber-dana?activated=1"
  );
  let tmp0: any = response.data.return;
  const value = JSON.stringify(tmp0);
  localStorage.setItem("referensi-sumberdana", value);
  return response.data.return;
};

export const saveReferensiSumberDana = async (
  data?: object,
  id?: any
): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("referensi-sumberdana")!);
  let tmp1: any = null;

  var removeDuplicate = function (arr: any, attr: any, value: any) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  removeDuplicate(tmp0, "id", id);
  if (data === null) {
    tmp1 = tmp0;
  } else {
    tmp1 = [data, ...tmp0];
  }

  const response = await api.post<any>(
    "/v2/reference-services/sumber-dana",
    data
  );
  tmp1 = [response.data.return, ...tmp0];
  localStorage.setItem("referensi-sumberdana", JSON.stringify(tmp1));
  return response.data.return;
};

export const deleteReferensiSumberDana = async (id?: any): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("referensi-sumberdana")!);
  let tmp1: any = null;
  tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== id;
  });
  localStorage.setItem("referensi-sumberdana", JSON.stringify(tmp1));
  return await api.delete<any>("/v2/reference-services/sumber-dana/" + id);
};

//API untuk master data Komponen Biaya
export const getReferensiKomponenBiaya = async (): Promise<any> => {
  const response = await api.get<any>(
    "/v2/reference-services/komponen-biaya?activated=1"
  );
  localStorage.setItem("komponen-biaya", JSON.stringify(response.data.return))
  return response.data.return;
};

export const saveReferensiKomponenBiaya = async (
  data?: object,
  id?: any
): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("referensi-komponenbiaya")!);
  let tmp1: any = null;

  var removeDuplicate = function (arr: any, attr: any, value: any) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  removeDuplicate(tmp0, "id", id);
  if (data === null) {
    tmp1 = tmp0;
  } else {
    tmp1 = [data, ...tmp0];
  }

  const response = await api.post<any>(
    "/v2/reference-services/komponen-biaya",
    data
  );
  tmp1 = [response.data.return, ...tmp0];
  localStorage.setItem("referensi-komponenbiaya", JSON.stringify(tmp1));
  return response.data.return;
};

export const deleteReferensiKomponenBiaya = async (id?: any): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem("referensi-komponenbiaya")!);
  let tmp1: any = null;
  tmp1 = tmp0.filter((obj: any) => {
    return obj.id !== id;
  });
  localStorage.setItem("referensi-komponenbiaya", JSON.stringify(tmp1));
  return await api.delete<any>("/v2/reference-services/komponen-biaya/" + id);
};

//API untuk alokasi cost bos
export const getReferensiAlokasiCostBost = async (): Promise<any> => {
  const response = await api.get<any>(
    "/v2/reference-services/unit-cost-bos?activated=1"
  );
  let tmp0: any = response.data.return;

  const value = JSON.stringify(tmp0);
  localStorage.setItem("alokasi-bos", value);
  return response.data.return;
};

export const getTahunAnggaran = async () => {
  return await api.get<any>("/ref/tahun-anggaran");
};

export const getRole = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/role", { params });
};

export const getJenisTahapan = async (): Promise<any> => {
  return await api.get<any>("/ref/jenis-tahapan");
};

export const getJenisBelanja = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/jenis-belanja", { params });
};

export const getAkunBelanja = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/akun-belanja", { params });
};

export const getStatusUsulan = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/status-usulan", { params });
};

export const getKategoriKomponenBiaya = async (
  param?: object
): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/kategori-komponen-biaya", { params });
};

export const getKomponenBiaya = async (
  queryParam: object,
  limit?: number,
  offset?: number
): Promise<any> => {
  const params = {
    limit: limit === undefined ? null : limit.toString(),
    offset: offset === undefined ? null : offset.toString(),
    queryParam: JSON.stringify(queryParam),
  };
  return await api.get<any>("/ref/komponen-biaya", { params });
};

export const getSumberDana = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/sumber-dana", { params });
};

export const getUnitCostBos = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/unit-cost-bos", { params });
};

export const saveUnitCostBos = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/save-unit-cost-bos", params);
};

export const editUnitCostBosTahap = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/edit-unit-cost-bos-tahap", params);
};

export const deleteUnitCostBos = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/delete-unit-cost-bos", params);
};

export const getUnitCostBosTahap = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/unit-cost-bos-tahap", { params });
};

export const getKegiatanSnp = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  const response = await api.get<any>("/v2/reference-services/kegiatan", {
    params,
  });

  return (
    response.data.return,
    localStorage.setItem("kegiatan", JSON.stringify(response.data.return))
  );
};

export const getSubKegiatan = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/sub-kegiatan", { params });
};

export const getKelompokSasaran = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/kelompok-sasaran", { params });
};

export const getSatuan = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/satuan", { params });
};

export const getPajak = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/pajak", { params });
};

export const getTipeKas = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/tipe-kas", { params });
};

export const getlevelPpk = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/level-ppk", { params });
};

export const getProvinsi = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/provinsi", { params });
};

export const getProvinsiKabkota = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/provinsi-kabkota", { params });
};

export const getKabkota = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/kabkota", { params });
};

export const getKecamatan = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/kecamatan", { params });
};

export const getKelurahan = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/kelurahan", { params });
};

export const getMetodePembayaran = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/metode-pembayaran", { params });
};

export const getTipePenerima = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/tipe-penerima", { params });
};

export const getSekolah = async (
  queryParam: object,
  limit?: number,
  offset?: number
): Promise<any> => {
  const params = {
    limit: limit !== undefined ? limit.toString() : null,
    offset: offset !== undefined ? offset.toString() : null,
    queryParam: JSON.stringify(queryParam),
  };
  return await api.get<any>("/ref/sekolah", { params });
};

export const getJenjang = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/jenjang", { params });
};

export const getStatusSekolah = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/status-sekolah", { params });
};

export const getKodeRegistrasiSekolah = async (
  queryParam: object,
  limit?: number,
  offset?: number
): Promise<any> => {
  const params = {
    limit: limit !== undefined ? limit.toString() : null,
    offset: offset !== undefined ? offset.toString() : null,
    queryParam: JSON.stringify(queryParam),
  };
  return await api.get<any>("/ref/kode-registrasi-sekolah", { params });
};

export const kirimKodeRegistrasiSekolah = async (
  param: object
): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/kirim-kode-registrasi-sekolah", params);
};

export const getTemplateKirimKodeRegistrasi = async (
  param?: object
): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/template-kirim-kode-registrasi-sekolah", {
    params,
  });
};

export const getTemplateKomponenBiaya = async (
  param?: object
): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/template-komponen-biaya", { params });
};

export const getTahap = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/tahap", { params });
};

export const getUsulanSubKegiatan = async (
  queryParam?: object,
  limit?: number,
  offset?: number
): Promise<any> => {
  const params = {
    limit: limit !== undefined ? limit.toString() : null,
    offset: offset !== undefined ? offset.toString() : null,
    queryParam: JSON.stringify(queryParam),
  };
  return await api.get<any>("/ref/usulan-sub-kegiatan", { params });
};

export const saveUsulanSubKegiatan = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/save-usulan-sub-kegiatan", params);
};

export const deleteUsulanSubKegiatan = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/delete-usulan-sub-kegiatan", params);
};

export const getUsulanKomponenBiaya = async (
  queryParam?: object,
  limit?: number,
  offset?: number
): Promise<any> => {
  const params = {
    limit: limit !== undefined ? limit.toString() : null,
    offset: offset !== undefined ? offset.toString() : null,
    queryParam: JSON.stringify(queryParam),
  };
  return await api.get<any>("/ref/usulan-komponen-biaya", { params });
};

export const saveUsulanKomponenBiaya = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/save-usulan-komponen-biaya", params);
};

export const deleteUsulanKomponenBiaya = async (
  param: object
): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/delete-usulan-komponen-biaya", params);
};

export const responUsulan = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/respon-usulan", params);
};

export const saveKegiatanSnp = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/save-kegiatan-snp", params);
};

export const saveSubKegiatan = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/save-sub-kegiatan", params);
};

export const deleteKegiatanSnp = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/delete-kegiatan-snp", params);
};

export const deleteSubKegiatan = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/delete-sub-kegiatan", params);
};

export const getAvailableKodeKegiatan = async (
  param?: object
): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/available-kode-kegiatan", { params });
};

export const getAvailableKodeSubKegiatan = async (
  param?: object
): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/available-kode-sub-kegiatan", { params });
};

export const saveKomponenBiaya = async (param: object): Promise<any> => {
  let params: any = {};
  Object.keys(param).forEach((item) => {
    params[`${item}`] = item;
  });
  return await api.post<any>("/ref/save-komponen-biaya", params);
};

export const getAvailableKodeKomponenBiaya = async (
  param?: object
): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/available-kode-komponen-biaya", { params });
};

export const getTahapPenyaluran = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/tahap-penyaluran", { params });
};

export const getStatusPenyaluran = async (param?: object): Promise<any> => {
  let params = {};
  if (param) params = { queryParam: JSON.stringify(param) };
  return await api.get<any>("/ref/status-penyaluran", { params });
};

export const getTipeRekening = async (): Promise<any> => {
  return await api.get<any>("/ref/tipe-rekening");
};
