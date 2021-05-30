import api from "../../../utils/api";
import qs from "query-string";

export const getSumberDana = async (): Promise<any> => {
    const response = await api.get<any>(
      `/v2/reference-services/sumber-dana?activated=1`
    );
    return response.data.return;
  };