import * as userManagementService from '../../../services/v2/usermanservice/managementservice';
import { persistedStore } from '../../../utils/store';

const initialState: MadrasahStore = {
  madrasah: {},
  inputMadrasah: {}
}
export type MadrasahStore = {
  madrasah?: any
  inputMadrasah?: any
  getManagementMadrasah?: (getUserParams?: userManagementService.GetUserParams) => Promise<void>
  addManagementMadrasah?: (addUserDto: userManagementService.AddUserDto) => Promise<void>
};

export const useMadrasah = persistedStore('madrasah', initialState, (state, setState): MadrasahStore => {
  const getManagementMadrasah = async (getUserParams?: userManagementService.GetUserParams): Promise<void> => {
    getUserParams = { group: "madrasah" }
    const response: any = await userManagementService.getUsers(getUserParams);
    const res = await response.data.return
    setState({
      madrasah: res
    });
  };

  const addManagementMadrasah = async (addUserDto: userManagementService.AddUserDto): Promise<void> => {
    const response: any = await userManagementService.addUser(addUserDto)
    if (response.data.success === 0)
      throw Error(response.data.meta.success)
    setState({
        inputMadrasah: addUserDto,
    });
    await getManagementMadrasah()
  }
  return {
    ...state,
    getManagementMadrasah,
    addManagementMadrasah
  };
})

export default useMadrasah;


