import { RekeningType } from '../../../models/pengaturan/rekening';
import * as pengaturanService from '../../../services/pengaturan';
import * as referenceService from '../../../services/reference';
import { persistedStore } from '../../../utils/store';

const initialState: RekeningStore = {
  RekeningTable:[],
  BankOptions:[],
  ResponseRekening:[]
};

export type RekeningStore = {
  RekeningTable?:RekeningType[];
  BankOptions?:any[];
  ResponseRekening?:any[]
  getBank?:()=>Promise<any>;
  addRekening?:(tmp: any)=>Promise<any>;
  getRekening?: (limit: any, offset: any, tahun: any) => Promise<RekeningType[]>;
};
export const useRekening = persistedStore('rekening', initialState, (state, setState): RekeningStore => {

  const getRekening = async (limit:number,offset:number,tahun:string) => {
    const data: RekeningType[] = await pengaturanService.getRekening(limit,offset,tahun)
    console.log('rekening', data)
    setState({
      RekeningTable:data,
    });
    return data;
  };

  const getBank = async ()=>{
    const response: any[] = await  referenceService.getBank()
    console.log('bank',response)
    setState({
      BankOptions: response
    });
    return response;
  }

  const addRekening = async(params: any)=>{
    const response:any[]= await pengaturanService.addRekening(params)
    const data = {
      kode_bank:params.kodeBank,
      nama_kode_bank:params.namaBank,
      cabang_bank:params.cabangBank,
      no_rekening:params.noRekening,
      no_rekening_nama:params.noRekeningNama,
      keterangan:params.keterangan
    }
    setState({
      RekeningTable:[...(state.RekeningTable || []), data],
      ResponseRekening: response,
    });
    return response;
  }

  return {
    ...state,
    getRekening,
    getBank,
    addRekening
  };
});

export default useRekening


