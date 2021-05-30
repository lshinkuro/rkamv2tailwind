import api from "../../../utils/api";
import { isObject, removeDuplicate, uuidv4 } from "../../../utils/helper";
import { planningService } from "../constant";

const basePath = `${planningService}`;

export const getPlanning = async (
  ref: any,
  tahun: any,
  storageName: any
): Promise<any> => {
  let response: any = await api.get<any>(
    `${basePath}/${ref}?tahun=${tahun}&activated=${1}`
  );
  localStorage.setItem(storageName, JSON.stringify(response.data.return));
  return response.data.return;
};

export const saveOffline = async (
  data: any,
  id: any,
  status?: any,
  localStorageName?: any
) => {
  try {
    let localData = JSON.parse(localStorage.getItem(localStorageName || id)!);
    let localDataTmp: any = [];
    if (status === "hapus") {
      data.activated = data.activated === "1" ? "0" : "1";
    }
    if (data === null) {
      localDataTmp = localData;
    } else {
      if (!data.id || data.id === null) {
        data.id = uuidv4();
      }
      removeDuplicate(localData, "id", data.id);
      if (isObject(data)) {
        localDataTmp = [data, ...localData];
      } else {
        localDataTmp = [...data, ...localData];
      }
    }
    if (window.navigator.onLine) {
      if (status !== "tambah") {
        localStorage.setItem(id, JSON.stringify(localDataTmp));
      }
      for (let i = 0; i < localDataTmp.length; i++) {
        const el0 = localDataTmp[i];
        if ((data !== null && el0?.id === data?.id) || el0.isNew) {
          if (status === "hapus") {
            await api.delete<any>(`${basePath}/${id}/${data.id}`);
          } else if (status === "edit") {
            data.activated = data.activated === "1" ? "0" : "1";
            await api.put<any>(`${basePath}/${id}/${data.id}`, el0);
          } else {
            const res: any = await api.post<any>(
              `${basePath}/${id}`,
              localStorageName === "rencana/rincian" ? [el0] : el0
            );
            let tmpRes: any = [...res.data.return, ...localData];

            if (
              id === "rencana-rincian-kegiatan" &&
              (status === "tambah" || status === "offline")
            ) {
              localStorage.setItem(
                localStorageName || id,
                JSON.stringify(tmpRes)
              );
            } else {
              localStorage.setItem(
                localStorageName || id,
                JSON.stringify([res.data?.return, ...localDataTmp])
              );
            }
          }
        }
      }
    } else {
      if (data.id) {
        localStorage.setItem(
          localStorageName || id,
          JSON.stringify(localDataTmp)
        );
      } else {
        console.log("no connection");
      }
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};
export const saveOnline = async (
  data?: any,
  url?: any,
  localStorageName?: any
): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem(localStorageName)!);
  const response = await api.post<any>(`${basePath}/${url}`, data);
  let tmp2 = [response.data.return, ...tmp0];

  localStorage.setItem(localStorageName, JSON.stringify(tmp2));
};

export const updateOnline = async (
  data?: any,
  url?: any,
  status?: any
): Promise<any> => {
  let tmp0 = JSON.parse(localStorage.getItem(url)!) || "";
  let tmp1: any = "";
  if (data.id !== undefined) {
    tmp1 = tmp0.filter((obj: any) => {
      return obj.id !== data.id;
    });
  }
  let response: any = {};
  if (status === "edit") {
    response = await api.put<any>(`${basePath}/${url}/${data.id}`, data);
  } else if (status === "hapus") {
    response = await api.delete<any>(`${basePath}/${url}/${data.id}`);
  }
  let tmp2 = [response.data.return, ...(tmp1 || tmp0)];

  localStorage.setItem(url, JSON.stringify(tmp2));
};
