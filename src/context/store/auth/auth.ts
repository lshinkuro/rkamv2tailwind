import { persistedStore } from '../../../utils/store';
import * as userService from '../../../services/users';
import api from '../../../utils/api';

export type AuthStore = {
  isLogin?: boolean;
  token?: string;
  role?:string;
  login?: (uid: string, password: string) => Promise<any>;
  logout?: () => void;
  getrole?:()=>void;
};

const initialState: AuthStore = {
  isLogin: false,
  token: '',
  role:'',
};

export const useAuth = persistedStore('auth', initialState, (state, setState): AuthStore => {

  const login = async (uid: string, password: string): Promise<any> => {
    try {
      const response = await api.post("/auth/login", {
        username: uid,
        password,
      })
      setState({ isLogin: true, token: response.data.return.token});
      return response.data.return;
    } catch (error) {
      throw error.response;
    }
  };

  const logout = () => {
    setState(initialState);
  };

  const getrole =async ()=>{
    let data = await userService.getAllUsers()
    setState({isLogin: true, token:state.token,role:data[0].role})
  }

  return {
    ...state,
    login,
    logout,
    getrole,
  };
});

export default useAuth;
