import api from "../../../utils/api";
import { realizationService } from "../constant";
import qs from "query-string"

const basePath = `${realizationService}/realizations`;

type Params = {
  tahun: number[],
  activated: string[],
  groupRole: string
}

export const browse = async (params: Params): Promise<any> => {
  const response = await api.get(`${basePath}/pagu-definitif`, {
    params,
    paramsSerializer: params => {
      return qs.stringify(params)
    }
  });
  console.log('boyy', params)
  if (params.groupRole === "madrasah")
    localStorage.setItem(
      "pagu-definitif",
      JSON.stringify(response.data.return)
    );
  return response.data.return;
};

export const editId = async (params,id):Promise<any> =>{
  const response =await api.put(`${basePath}/pagu-definitif/${id}`,params,{
    headers: { "Content-Type": "application/json" },
  })
}

export const bulkSave = async (data: any): Promise<any> => {
  const response = await api.post(
    `${basePath}/pagu-definitif-bulk-save`,
    data
  );
  // localStorage.setItem(
  //   "pagu-definitif",
  //   JSON.stringify(response.data.return)
  // );
  return response.data.return;
};
