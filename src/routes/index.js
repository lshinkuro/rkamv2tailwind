import { lazy } from "react";
import {
  Dashboard,
  Pendapatan,
  AnggaranKasBelanja,
  EDM,
  //referensi
  Snp,
  Tahun,
  KegiatanBop,
  KegiatanBos,
  ReferensiKegiatan,
  SubKegiatan,
  AlokasiBop,
  AlokasiBos,
  DataReferensiRekening,
  SumberDanaMadrasah,
  KomponenBiaya,
  RekeningBelanja,
  Jenisbelanja,
  SubJenisbelanja,
  ReferensiMadrasah,
  KodeRegistrasiMadrasah,
  
  //Perencanaan
  ApprovalValidasi,
  LogsApproval,
  RencanaKegiatanDanAnggaran,
  ListRincianKegiatanDanAnggaran,
  AddRincianKegiatanDanAnggaran,
  LogsRincianKegiatanDanAnggaran,
  EditRincianKegiatanDanAnggaran,
  RencanaAnggaran,
  RencanaPendapatan,
  PaguIndikatif,
  
  //Realisasi
  PaguDefinitif,
  PencairanPagu,
  TambahPencairanPagu,
  
  
  
  RealisasiKegiatan,
  LogRealisasiKegiatan,
  PengeluaranMadrasah,
  TambahPengeluaranMadrasah,
  EditPengeluaranMadrasah,
  LogsPengeluaranMadrasah,
  PengeluaranPajak,
  AddPengeluaranPajak,
  EditPengeluaranPajak,
  LogsPengeluaranPajak,
  PengembalianDana,
  AddPengembalianDana,
  EditPengembalianDana,
  LogsPengembalianDana,
  PindahBuku,
  TambahPindahBuku,
  EditPindahBuku,
  LogsPindahBuku,
  OutputKegiatan,
  
  //Laporan
  LaporanErkam,
  BukuKasUmum,
  BukuKasPembantu,
  LaporanRealisasi,
  
  //manajemenuser
  Profile,
  EditProfile,
  EditProfileMadrasah,
  ProfileMadrasah,
  
  //Pengaturan
  TanggalRKAM,
  PPK,
  SetPPK,
  
  //export
  Backup,
  Export,
  StaffMadrasah,
  RekeningBank,
  Penerima,
  Pusat,
  Prov,
  KabKota,
  Madrasah,

  //usulan
  UsulanList,
  UsulanSubKegiatan,
  UsulanKomponen,
  AjukanUsulan,
  AjukanSubUsulan,
  AjukanKomponenUsulan,
  SetKomponenBiayaHarga,
  TahapPencairan,
} from "../pages";
import Forms from "../pages/Example/Forms";
import PDFtest from "../pages/Example/PDFtest";
// import PDFviewer from "../pages/Example/PDFtest";

const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "dashboard/", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "dashboard/pendapatan-dan-kegiatan", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "dashboard/pendapatan", // the url
    component: Pendapatan, // view rendered
  },
  {
    path: "dashboard/kas-belanja", // the url
    component: AnggaranKasBelanja, // view rendered
  },
  {
    path: "edm", // the url
    component: EDM, // view rendered
  },
  {
    path: "rencana/approval-validasi", // the url
    component: ApprovalValidasi, // view rendered
  },
  {
    path: "rencana/approval-validasi/logs/:kode", // the url
    component: LogsApproval, // view rendered
  },
  {
    path: "profil/akun", // the url
    component: Profile, // view rendered
  },
  {
    path: "profil/edit", // the url
    component: EditProfile, // view rendered
  },

  //rencana Kegiatan
  {
    path: "rencana/rencana-kegiatan", // the url
    component: RencanaKegiatanDanAnggaran, // view rendered
  },
  {
    path: "rencana/rincian/:id/list", // the url
    component: ListRincianKegiatanDanAnggaran, // view rendered
  },
  {
    path: "rencana/rincian/:id/add", // the url
    component: AddRincianKegiatanDanAnggaran, // view rendered
  },

  {
    path: "rencana/rincian/:id/add/:id", // the url
    component: AddRincianKegiatanDanAnggaran, // view rendered
  },
  {
    path: "rencana/rincian/:id/edit/:id", // the url
    component: EditRincianKegiatanDanAnggaran, // view rendered
  },
  {
    path: "rencana/rincian/:id/logs", // the url
    component: LogsRincianKegiatanDanAnggaran, // view rendered
  },
  {
    path: "rencana/rencana-anggaran", // the url
    component: RencanaAnggaran, // view rendered
  },
  {
    path: "rencana/pagu-indikatif", // the url
    component: PaguIndikatif, // view rendered
  },

  {
    path: "rencana/pendapatan", // the url
    component: RencanaPendapatan, // view rendered
  },

  //Pencairan
  {
    path: "pencairan/pagu-definitif",
    component: PaguDefinitif,
  },
  {
    path: "pencairan/pencairan-pagu/list",
    component: PencairanPagu,
  },
  {
    path: "pencairan/pencairan-pagu/add",
    component: TambahPencairanPagu,
  },
  //Realisasi
  {
    path: "realisasi/realisasi-kegiatan/list",
    component: RealisasiKegiatan,
  },
  {
    path: "realisasi/realisasi-kegiatan/logs",
    component: LogRealisasiKegiatan,
  },
  {
    path: "realisasi/pengeluaran-madrasah/list",
    component: PengeluaranMadrasah,
  },
  {
    path: "realisasi/pengeluaran-madrasah/add",
    component: TambahPengeluaranMadrasah,
  },
  {
    path: "realisasi/pengeluaran-madrasah/edit/:id",
    component: EditPengeluaranMadrasah,
  },
  {
    path: "realisasi/pengeluaran-madrasah/logs",
    component: LogsPengeluaranMadrasah,
  },
  {
    path: "realisasi/pengeluaran-pajak/list",
    component: PengeluaranPajak,
  },
  {
    path: "realisasi/pengeluaran-pajak/add",
    component: AddPengeluaranPajak,
  },
  {
    path: "realisasi/pengeluaran-pajak/edit/:id",
    component: EditPengeluaranPajak,
  },
  {
    path: "realisasi/pengeluaran-pajak/logs",
    component: LogsPengeluaranPajak,
  },
  {
    path: "realisasi/pengembalian-dana/list",
    component: PengembalianDana,
  },
  {
    path: "realisasi/pengembalian-dana/add",
    component: AddPengembalianDana,
  },
  {
    path: "realisasi/pengembalian-dana/edit/:id",
    component: EditPengembalianDana,
  },
  {
    path: "realisasi/pengembalian-dana/logs",
    component: LogsPengembalianDana,
  },
  {
    path: "realisasi/pindah-buku/list",
    component: PindahBuku,
  },
  {
    path: "realisasi/pindah-buku/add",
    component: TambahPindahBuku,
  },
  {
    path: "realisasi/pindah-buku/edit/:id",
    component: EditPindahBuku,
  },
  {
    path: "realisasi/pindah-buku/logs",
    component: LogsPindahBuku,
  },

  //laporan
  {
    path: "laporan/laporan-rkam",
    component: LaporanErkam,
  },
  {
    path: "laporan/buku-kas-umum",
    component: BukuKasUmum,
  },
  {
    path: "laporan/buku-kas-pembantu",
    component: BukuKasPembantu,
  },
  {
    path: "laporan/laporan-realisasi",
    component: LaporanRealisasi,
  },
  {
    path: "realisasi/output-kegiatan",
    component: OutputKegiatan,
  },

  //Usulan
  {
    path: "usulan/kegiatan/list",
    component: UsulanList,
  },
  {
    path: "usulan/subkegiatan/list",
    component: UsulanSubKegiatan,
  },
  {
    path: "usulan/komponen/list",
    component: UsulanKomponen,
  },
  {
    path: "usulan/kegiatan/request",
    component: AjukanUsulan,
  },
  {
    path: "usulan/subkegiatan/request",
    component: AjukanSubUsulan,
  },
  {
    path: "usulan/komponen/request",
    component: AjukanKomponenUsulan,
  },

  //referensi
  {
    path: "referensi/kegiatan",
    component: ReferensiKegiatan,
  },

  {
    path: "referensi/kegiatan/:id",
    component: ReferensiKegiatan,
  },
  {
    path: "referensi/sub-kegiatan",
    component: SubKegiatan,
  },
  {
    path: "referensi/sub-kegiatan/:id",
    component: SubKegiatan,
  },
  {
    path: "referensi/Snp",
    component: Snp,
  },
  {
    path: "referensi/tahun",
    component: Tahun,
  },
  {
    path: "referensi/kegiatan-bop",
    component: KegiatanBop,
  },
  {
    path: "referensi/kegiatan-bos",
    component: KegiatanBos,
  },
  {
    path: "referensi/alokasi-bos",
    component: AlokasiBos,
  },
  {
    path: "referensi/alokasi-bop",
    component: AlokasiBop,
  },
  {
    path: "referensi/data-referensi-rekening-belanja",
    component: DataReferensiRekening,
  },
  {
    path: "referensi/sumber-dana-madrasah",
    component: SumberDanaMadrasah,
  },
  {
    path: "referensi/komponen-biaya",
    component: KomponenBiaya,
  },
  {
    path: "referensi/komponen-biaya/set-harga",
    component: SetKomponenBiayaHarga,
  },
  {
    path: "referensi/rekening-belanja",
    component: RekeningBelanja,
  },
  {
    path: "referensi/jenis-belanja",
    component: Jenisbelanja,
  },
  {
    path: "referensi/jenis-belanja/:id",
    component: SubJenisbelanja,
  },
  {
    path: "referensi/madrasah",
    component: ReferensiMadrasah,
  },
  {
    path: "referensi/kode-registrasi-madrasah",
    component: KodeRegistrasiMadrasah,
  },
  {
    path: "referensi/tahap-pencairan",
    component: TahapPencairan,
  },

  //managemen user
  {
    path: "profile-madrasah",
    component: ProfileMadrasah,
  },
  {
    path: "profile-madrasah/edit",
    component: EditProfileMadrasah,
  },
  {
    path: "backup",
    component: Backup,
  },
  {
    path: "export",
    component: Export,
  },

  //pengaturan
  {
    path: "pengaturan/staff-madrasah",
    component: StaffMadrasah,
  },
  {
    path: "pengaturan/rekening-bank",
    component: RekeningBank,
  },
  {
    path: "pengaturan/penerima",
    component: Penerima,
  },
  {
    path: "pengaturan/management-user/pusat",
    component: Pusat,
  },
  {
    path: "pengaturan/management-user/prov",
    component: Prov,
  },
  {
    path: "pengaturan/management-user/kabkota",
    component: KabKota,
  },
  {
    path: "pengaturan/management-user/madrasah",
    component: Madrasah,
  },
  {
    path: "pengaturan/tanggal-rkam",
    component: TanggalRKAM,
  },
  {
    path: "pengaturan/ppk",
    component: PPK,
  },
  {
    path: "pengaturan/ppk/set-ppk/:id",
    component: SetPPK,
  },
  {
    path: "404",
    component: Page404,
  },
  {
    path: "blank",
    component: Blank,
  },
  {
    path: "form",
    component: Forms,
  },
  {
    path: "pdf",
    component: PDFtest,
  },
];

export default routes;
