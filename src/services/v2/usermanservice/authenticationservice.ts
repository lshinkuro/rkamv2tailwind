import api from "../../../utils/api";
import { usermanService } from "../constant"

const basePath = `${usermanService}/auth`

export const login = async (uid: string, password: string) => {
    try {
        const response = await api.post(
            `${basePath}/login`,
            {
                username: uid,
                password,
            }
        );
        return response;
    } catch (error) {
        if (error.response)
            throw error.response;
        else
            throw error;
    }
};