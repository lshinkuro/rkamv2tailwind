import { UsulanType } from '../../../models/usulan/usulankomponen';
import * as usulanService from '../../../services/refusulan';
import { persistedStore } from '../../../utils/store';

const initialState: UsulanStore = {
  usulanKomponenTable: [],
  usulanKegiatanTable: [],
  usulanSubKegiatanTable: [],
  usulanKegiatanTableSave: [],
};

export type UsulanStore = {
  usulanKomponenTable?: UsulanType[];
  getUsulanKomponen?: (
    queryParam: object,
    limit: number,
    offset: number
  ) => void;
  resetUsulanKomponen?: () => void;

  usulanSubKegiatanTable?: UsulanType[];
  getUsulanSubKegiatan?: (
    queryParam: object,
    limit: number,
    offset: number
  ) => void;
  resetUsulanSubKegiatan?: () => void;

  usulanKegiatanTable?: any[];
  usulanKegiatanTableSave?: any[];
  saveUsulanKegiatanTable?: (data: any) => void;
  resetUsulanKegiatan?: () => void;
};
export const useUsulan = persistedStore(
  "usulan",
  initialState,
  (state, setState): UsulanStore => {
    const getUsulanKomponen = async (
      queryParam: object,
      limit: number,
      offset: number
    ) => {
      const data: any = await usulanService.getUsulanKomponen(
        queryParam,
        limit,
        offset
      );
      setState({
        usulanKomponenTable: data,
      });
    };
    const getUsulanSubKegiatan = async (
      queryParam: object,
      limit: number,
      offset: number
    ) => {
      const data: any = await usulanService.getUsulanSubKegiatan(
        queryParam,
        limit,
        offset
      );
      setState({
        usulanSubKegiatanTable: data,
      });
    };

    const resetUsulanKomponen = async () => {
      setState(initialState);
    };
    const resetUsulanSubKegiatan = async () => {
      setState(initialState);
    };

    const resetUsulanKegiatan = async () => {
      setState(initialState);
    };

    return {
      ...state,
      getUsulanKomponen,
      resetUsulanKomponen,

      getUsulanSubKegiatan,
      resetUsulanSubKegiatan,

      resetUsulanKegiatan
    };
  }
);

export default useUsulan;
