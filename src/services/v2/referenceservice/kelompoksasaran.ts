import api from "../../../utils/api";
import { referenceService } from "../constant"

const basePath = `${referenceService}`

export const getKelompokSasaran = async (): Promise<any> => {
    try {
        const response = await api.get(
            `${basePath}/kelompok-sasaran`, {
                params: {
                    tahun: 2021,
                    activated: 1
                }
            }
        );
        localStorage.setItem("kelompoksasaran", JSON.stringify(response.data.return));
        return response.data.return;
    } catch (error) {
        if (error.response)
            throw error.response;
        else
            throw error;
    }
};