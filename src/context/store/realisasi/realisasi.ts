import { RealisasiPendapatan } from '../../../models/realisasi/pendapatan';
import * as realisasiService from '../../../services/realisasi';
import { persistedStore } from '../../../utils/store';

const initialState: RealisasiStore = {
  realisasiPendapatanTable: [],
};

export type RealisasiStore = {
  realisasiPendapatanTable?: RealisasiPendapatan[];
  getNotaPendapatan?: (queryParam: object, limit: number, offset: number) => void;
  resetNotaPendapatan?: () => void;
};
export const useRealisasi = persistedStore('realisasi', initialState, (state, setState): RealisasiStore => {

  const getNotaPendapatan = async (queryParam: object, limit: number, offset: number) => {
    const data: any = await realisasiService.getNotaPendapatan(queryParam, limit, offset);
    setState({
      realisasiPendapatanTable: data.map((x: RealisasiPendapatan) => {
        if (x.kepala_madrasah_approved === 'approved') {
          x.status = x.tanggal_realisasi === null ? 'approved_menunggu_tanggal_realisasi' : 'selesai';
        } else if (x.kepala_madrasah_approved === 'tolak') {
          x.status = 'tolak';
        } else {
          x.status = '';
        }
        return x;
      })
    });
  };

  const resetNotaPendapatan = async () => {
    setState(initialState);
  };

  return {
    ...state,
    getNotaPendapatan,
    resetNotaPendapatan
  };
});

export default useRealisasi;


