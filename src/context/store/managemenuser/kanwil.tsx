import * as userManagementService from '../../../services/v2/usermanservice/managementservice';
import { persistedStore } from '../../../utils/store';

const initialState: KanwilStore = {
  kanwil: {},
  inputKanwil: {}
}
export type KanwilStore = {
  kanwil?: any
  inputKanwil?: any
  getManagementKanwil?: (getUserParams?: userManagementService.GetUserParams) => Promise<void>
  addManagementKanwil?: (addUserDto: userManagementService.AddUserDto) => Promise<void>
};

export const useKanwil = persistedStore('kanwil', initialState, (state, setState): KanwilStore => {
  const getManagementKanwil = async (getUserParams?: userManagementService.GetUserParams): Promise<void> => {
    getUserParams = { group: "provinsi" }
    const response: any = await userManagementService.getUsers(getUserParams);
    const res = await response.data.return
    setState({
        kanwil: res
    });
  };

  const addManagementKanwil = async (addUserDto: userManagementService.AddUserDto): Promise<void> => {
    const response: any = await userManagementService.addUser(addUserDto)
    if (response.data.success === 0)
      throw Error(response.data.meta.success)
    setState({
      inputKanwil: addUserDto
    });
    await getManagementKanwil()
  }
  return {
    ...state,
    getManagementKanwil,
    addManagementKanwil
  };
})

export default useKanwil;


