import * as userService from '../../../services/profile';
import { persistedStore } from '../../../utils/store';

const initialState:ProfileStore = {
  userProfile:[]
}
export type ProfileStore = {
  userProfile?:any[];
  getProfilePengguna?: () => Promise<any>;
};

export const useProfile =persistedStore('profile', initialState, (state, setState): ProfileStore => {
  


  const getProfilePengguna= async () => {
    const data: any =await userService.getProfilePengguna();
    console.log("profile",data[0])
    let response = await data[0]
    setState({
         userProfile:data[0]
      })
    return response
  };


  return {
    ...state,
    getProfilePengguna,
  };
})

export default useProfile;


