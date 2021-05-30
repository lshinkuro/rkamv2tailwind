import * as userService from '../../../services/profile';
import {ProfileType,RoleType} from '../../../models/profile/profile';
import { persistedStore } from '../../../utils/store';

const initialState: UserStore = {
  users: {},
  userProfile: {},
};

export type UserStore = {
  users?: RoleType;
  userProfile?: ProfileType;
  getAllUsers?: () => Promise<any>;
};

export const useUser =persistedStore('user', initialState, (state, setState): UserStore => {
  


  const getAllUsers = async () => {
    const data: any =await userService.getAllUsers();
    const res = await data[0]
    setState({
         users:res
      })
    return res
  };


  return {
    ...state,
    getAllUsers,
  };
})

export default useUser;


