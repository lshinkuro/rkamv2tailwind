import api from "../../../utils/api";
import qs from "query-string";

export const getSumberDana = async (): Promise<any> => {
  const response = await api.get<any>(
    `/v2/reference-services/sumber-dana?activated=1`
  );
  return response.data.return;
};

export const postPencairanPagu = async (params: any): Promise<any> => {
  const payload: any = {
    nilai_pencairan_pagu: params.nilai_pencairan_pagu,
    tahap: params.tahap,
    pagu_definitif_id: params.pagu_definitif_id,
  };
  const response = await api.post<any>(
    `/v2/realization-services/realizations/pencairan-pagu-definitif`, payload
  );
  return response.data.return;
};
