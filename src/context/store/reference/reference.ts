import { persistedStore } from "../../../utils/store";
import * as referenceService from "../../../services/reference";

export type ReferenceStore = {
  provinsiOptions?: [];
  kabkotaOptions?: [];
  snpOptions?: [];
  pbosOptions?: [];
  kegiatanTable?: any[];
  getProvinsi?: () => Promise<void>;
  getKabkota?: () => Promise<void>;
  getSnp?: () => Promise<void>;
  getPBos?: () => Promise<void>;
};

const initialState: ReferenceStore = {
  kegiatanTable: [],
  provinsiOptions: [],
  kabkotaOptions: [],
  snpOptions: [],
  pbosOptions: [],
};

export const useReference = persistedStore(
  "reference",
  initialState,
  (state, setState): ReferenceStore => {
    
    const getProvinsi = async (): Promise<void> => {
      try {
        const response = await referenceService.getProvinsi();
        setState({
          provinsiOptions: response.data.return,
        });
      } catch (error) {
        throw error.response;
      }
    };

    const getKabkota = async (): Promise<void> => {
      try {
        const response = await referenceService.getKabkota();
        setState({
          kabkotaOptions: response.data.return,
        });
      } catch (error) {
        throw error.response;
      }
    };

    const getSnp = async (): Promise<void> => {
      try {
        const response: any = await referenceService.getSnp();
        setState({
          snpOptions: response.data.return.map((x: any) => {
            x.kode = x.kode + "," + x.nama;
            return x;
          }),
        });
      } catch (error) {
        throw error.response;
      }
    };

    const getPBos = async (): Promise<void> => {
      try {
        const response: any = await referenceService.getPenggunaanBos();
        setState({
          pbosOptions: response.data.return.map((x: any) => {
            x.kode = x.kode + "," + x.nama;
            return x;
          }),
        });
      } catch (error) {
        throw error.response;
      }
    };

    return {
      ...state,
      getProvinsi,
      getPBos,
      getSnp,
      getKabkota,
    };
  }
);

export default useReference;
