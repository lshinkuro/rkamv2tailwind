import api from "../../../utils/api";
import { realizationService } from "../constant";
import qs from "query-string"
import { group } from "console";

const basePath = `${realizationService}/realizations`;

type Params = {
  id: string,
  tahun: number[],
  activated: string[],
  groupRole: string
}

export const browse = async (params: Params): Promise<any> => {
  const response = await api.get(`${basePath}/pencairan-pagu-definitif`, {
    params,
    paramsSerializer: params => {
      return qs.stringify(params)
    }
  });
  if (params.groupRole === "madrasah")
    localStorage.setItem(
      "pencairan-pagu-definitif",
      JSON.stringify(response.data.return)
    );
  return response.data.return;
};

export const cairkan = async (id: String, kodeLevelPpk: string, kodeRole: string, groupRole: string, files: FileList, status: string): Promise<any> => {
  const formData = new FormData();
  if (kodeRole === 'bendahara_madrasah' && status === "1") {
    formData.append("upload_bendahara", files.item(0)!);
  } else if (groupRole === "kabkota" && kodeLevelPpk === "kabkota") {
    if (status === "2") {
      formData.append("upload_ppk", files.item(0)!);
    } else {
      formData.append("upload_spm", files.item(0)!);
    }
  } else if (groupRole === "madrasah" && kodeLevelPpk === "madrasah") {
    if (status === "3") {
      formData.append("upload_ppk", files.item(0)!);
    } else {
      formData.append("upload_spm", files.item(0)!);
    }
  }
  const response = await api.put(`${basePath}/cairkan-pagu-definitif/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  if (groupRole === "madrasah")
    localStorage.setItem(
      "pencairan-pagu-definitif",
      JSON.stringify(response.data.return)
    );
  return response.data.return;
};
