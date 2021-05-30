import { StafMadrasahType } from '../../../models/pengaturan/stafmadrasah/staffmadrasah';
import * as pengaturanService from '../../../services/pengaturan';
import { persistedStore } from '../../../utils/store';

const initialState: StafMadrasahStore = {
  stafMadrasahTable:[],
  responseInputStaffMadrasah: {},
};

export type StafMadrasahStore = {
  stafMadrasahTable?: StafMadrasahType[];
  responseInputStaffMadrasah?:Object;
  inputStafMadrasah?:Object;
  getStafMadrasah?: (queryParam:string) => void;
  addStafMadrasah?: (data:Object) => Promise<any>;
};
export const Pengaturan = persistedStore('stafmadrasah', initialState, (state, setState): StafMadrasahStore => {

  const getStafMadrasah = async (queryParam:string) => {
    const data: StafMadrasahType[] = await pengaturanService.getStaffMadrasah(queryParam);
    setState({
      stafMadrasahTable: data,
      inputStafMadrasah:""
      })
  };

  const addStafMadrasah = async (queryParam:Object): Promise<any> =>{
    try {
      const response :any = await pengaturanService.addStaffMadrasah(queryParam);
      console.log(response.data.return)
      setState({
        stafMadrasahTable: state.stafMadrasahTable,
        inputStafMadrasah: queryParam,
        responseInputStaffMadrasah: response.data.return,
      });
      return response.data.return
    } catch (error) {
      console.log(error)
    }

  }


  return {
    ...state,
    getStafMadrasah,
    addStafMadrasah
  };
});

export default Pengaturan;


