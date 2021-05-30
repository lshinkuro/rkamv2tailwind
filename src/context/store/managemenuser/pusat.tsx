import * as userManagementService from '../../../services/v2/usermanservice/managementservice';
import { persistedStore } from '../../../utils/store';

const initialState: PusatStore = {
  pusat: {},
  inputPusat: {}
}
export type PusatStore = {
  pusat?: any
  inputPusat?: any
  getManagementPusat?: (getUserParams?: userManagementService.GetUserParams) => Promise<void>
  addManagementPusat?: (addUserDto: userManagementService.AddUserDto) => Promise<void>
};

export const usePusat = persistedStore('pusat', initialState, (state, setState): PusatStore => {
  const getManagementPusat = async (getUserParams?: userManagementService.GetUserParams): Promise<void> => {
    getUserParams = { group: "pusat" }
    const response: any = await userManagementService.getUsers(getUserParams);
    const res = await response.data.return
    setState({
      pusat: res
    });
  };

  const addManagementPusat = async (addUserDto: userManagementService.AddUserDto): Promise<void> => {
    const response: any = await userManagementService.addUser(addUserDto)
    if (response.data.success === 0)
      throw Error(response.data.meta.success)
    setState({
      inputPusat: addUserDto
    });
    await getManagementPusat();
  }
  return {
    ...state,
    getManagementPusat,
    addManagementPusat
  };
})

export default usePusat;


