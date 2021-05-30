import React from 'react';
import { useReference, ReferenceStore } from './store/reference/reference';


// store typeimport { useUser, UserStore } from './store/auth/user';
import { useAuth, AuthStore } from './store/auth/auth';
import { useRealisasi, RealisasiStore } from './store/realisasi/realisasi';
import { useUsulan,UsulanStore} from './store/usulan/usulan';
import { Pengaturan,StafMadrasahStore} from './store/pengaturan/stafMadrasah';
import { useRekening,RekeningStore} from './store/pengaturan/rekening';
import {usePenerima,PenerimaStore} from './store/pengaturan/penerima';
import { useProfile,ProfileStore} from './store/profile/profile';
import { usePusat,PusatStore} from './store/managemenuser/pusat';
import { useKanwil,KanwilStore} from './store/managemenuser/kanwil';
import { useKankemenag,KankemenagStore} from './store/managemenuser/kankemenag';
import { useMadrasah,MadrasahStore} from './store/managemenuser/madrasah';
type context = {
  // user?: UserStore;
  // auth?: AuthStore;
  // realisasi?: RealisasiStore;
  reference?: ReferenceStore;
  usulan?: UsulanStore;
  pengaturan?:StafMadrasahStore;
  rekening?:RekeningStore;
  penerima?:PenerimaStore;
  profile?:ProfileStore;
  pusat?:PusatStore;
  kanwil?:KanwilStore;
  kankemenag?:KankemenagStore;
  madrasah?:MadrasahStore;
};

const initialStore: context = {};
export const AppContext = React.createContext(initialStore);

export const StoreProvider: React.FC = ({ children }) => {
  const [store] = React.useState({
    // user: useUser(),
    auth: useAuth(),
    realisasi: useRealisasi(),
    usulan: useUsulan(),
    reference: useReference(),
    pengaturan:Pengaturan(),
    rekening:useRekening(),
    penerima:usePenerima(),
    profile:useProfile(),
    pusat:usePusat(),
    madrasah:useMadrasah(),
    kanwil:useKanwil(),
    kankemenag:useKankemenag(), 
  });

  return (
    <AppContext.Provider value={store}>
      <AppContext.Consumer>
        {(_) => children}
      </AppContext.Consumer>
    </AppContext.Provider>
  );
}
