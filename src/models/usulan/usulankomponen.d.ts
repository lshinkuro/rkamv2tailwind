export type UsulanType = {
  id?: string;
  no_tiket?: string;
  tahun?: number;
  no_tiket_formal?: string;
  kode_usulan?: string;
  keterangan?: string;
  respon?: string;
  kode_provinsi?: string;
  kode_kabkota?: string;
  status_usulan?: string;
  respon_date?: string;
  response_role?: string;
  response_user_id?: string;
  nama_provinsi?: string;
  nama_kabkota?: string;
  pengusul?: any;
  usulan?: any;
};
export type UsulanKomponenBiaya = {
id: string;
key?: string;
la?: string;
children?: UsulanKomponenBiaya
}