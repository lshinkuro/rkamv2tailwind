import api from "../../../utils/api";
import { referenceService } from "../constant"

const basePath = `${referenceService}`

export const getKegiatanSnp = async (): Promise<any> => {
    try {
        const response = await api.get(
            `${basePath}/kegiatan-snp`
        );
        localStorage.setItem("kegiatansnp", JSON.stringify(response.data.return));
        return response.data.return;
    } catch (error) {
        if (error.response)
            throw error.response;
        else
            throw error;
    }
};