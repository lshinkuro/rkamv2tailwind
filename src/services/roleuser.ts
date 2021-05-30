import api from "../utils/api";

//ini api untuk mendapatkan data staff madrasah

export const getroleuser = async (param_role?: object): Promise<any> => {
  const response = await api.get<any>("/v2/user-services/role-user", {params: {
      activated: 1,
      group: param_role
  }
  });
  let tmp0: any = response.data.return;
  localStorage.setItem("roleuser", JSON.stringify(tmp0));
  return response.data.return;
};

