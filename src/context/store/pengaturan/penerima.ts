import * as pengaturanService from '../../../services/pengaturan';
import { persistedStore } from '../../../utils/store';

const initialState: PenerimaStore = {
    penerimaTable:[],
  };
  
  export type PenerimaStore = {
    penerimaTable?: any[];
    getPenerima?: (limit: any, number: any) => void;
    addPenerima?: (data:Object) => Promise<any>;
  };
  export const usePenerima = persistedStore('penerima', initialState, (state, setState): PenerimaStore => {
  
    const getPenerima = async (limit:number,offset:number) => {
      const data: any[] = await pengaturanService.getPenerima(limit,offset)
      setState({
        penerimaTable: data,
        })
    };
  
    const addPenerima = async (queryParam:Object): Promise<any> =>{
      try {
        const response :any = await pengaturanService.addStaffMadrasah(queryParam);
        console.log(response.data.return)
        setState({

        })
        return response.data.return
      } catch (error) {
        console.log(error)
      }
  
    }
  
  
    return {
      ...state,
      getPenerima,
    
    };
  });
  
  export default usePenerima;
  
  
  