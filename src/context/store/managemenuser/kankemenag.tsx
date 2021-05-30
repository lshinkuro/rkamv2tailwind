import * as userManagementService from '../../../services/v2/usermanservice/managementservice';
import { persistedStore } from '../../../utils/store';

const initialState: KankemenagStore = {
  kankemenag: {},
  inputKankemenag: {}
}
export type KankemenagStore = {
  kankemenag?: any
  inputKankemenag?: any
  getManagementKankemenag?: (getUserParams?: userManagementService.GetUserParams) => Promise<void>
  addManagementKankemenag?: (addUserDto: userManagementService.AddUserDto) => Promise<void>
};

export const useKankemenag = persistedStore('kankemenag', initialState, (state, setState): KankemenagStore => {
  const getManagementKankemenag = async (getUserParams?: userManagementService.GetUserParams): Promise<void> => {
    getUserParams = { group: "kabkota" }
    const response: any = await userManagementService.getUsers(getUserParams);
    const res = await response.data.return
    setState({
      kankemenag: res,
    })
  };

  const addManagementKankemenag = async (addUserDto: userManagementService.AddUserDto): Promise<void> => {
    const response: any = await userManagementService.addUser(addUserDto)
    if (response.data.success === 0)
      throw Error(response.data.meta.success)
    setState({
      inputKankemenag: addUserDto,
    })
    await getManagementKankemenag()
  }
  return {
    ...state,
    getManagementKankemenag,
    addManagementKankemenag
  };
})

export default useKankemenag;


