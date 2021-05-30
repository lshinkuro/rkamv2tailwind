import api from "../../../utils/api";
import { referenceService } from "../constant"

const basePath = `${referenceService}`

export const getSubKegiatan = async (): Promise<any> => {
    try {
        const response = await api.get(
            `${basePath}/sub-kegiatan`, {
                params: {
                    tahun: 2021,
                    activated: 1
                }
            }
        );
        localStorage.setItem("subkegiatan", JSON.stringify(response.data.return));
        return response.data.return;
    } catch (error) {
        if (error.response)
            throw error.response;
        else
            throw error;
    }
};