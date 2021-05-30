import api from "../../../utils/api";
import { usermanService } from "../constant"
import qs from "query-string";

const basePath = `${usermanService}/management-user`;
const formUrlEncodedHeader = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};

export const role = async () => {
    try {
        const response = await api.get(`${basePath}/role`);
        return response;
    } catch (error) {
        if (error.response)
            throw error.response;
        else
            throw error;
    }
};

export type AddUserDto = {
    kode_role?: string;
    nik?: string;
    email?: string;
    nama?: string;
    require_email?: number;
    password?: string;
    kode_kabkota?: string;
    kode_provinsi?: string;
}

export const addUser = async (addUserDto: AddUserDto) => {
    try {
        const response = await api.post(`${basePath}/add-user`, addUserDto);
        return response;
    } catch (error) {
        if (error.response)
            throw error.response;
        else
            throw error;
    }
};

export type GetUserParams = {
    group?: string
}
export const getUsers = async (getUserParams?: GetUserParams) => {
    try {
        const response = await api.get(`${basePath}/get-users`,
            getUserParams !== null ?
                { params: getUserParams } : {});
        return response;
    } catch (error) {
        if (error.response)
            throw error.response;
        else
            throw error;
    }
};

export const checkUsernameOrEmail = async (uid: String, isEmail: boolean) => {
    try {
        const uri = isEmail ? 'check-email' : 'check-username';
        const reqBody = isEmail ? qs.stringify({ email: uid }) : qs.stringify({ username: uid })
        const response = await api.post(`${basePath}/${uri}`, reqBody, formUrlEncodedHeader);
        if (response.data.success === 0)
            throw Error(response.data.meta.success)
        return response;
    } catch (error) {
        if (error.response)
            throw error.response;
        else
            throw error;
    }
};
