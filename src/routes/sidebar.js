/**
 * ⚠ DISINI CUMA ARRAY YANG DIPAKE UNTUK RENDER ISI DARI NAVBAR
 * Disini bisa di masukan path, icon dan nama menu.
 *
 * ROUTING ADA DI,
 * `src/routes/index.js`
 *
 * * SIDEBAR COMPONEN ADA DI,
 * `/src/components/Sidebar`
 *
 */

//////////////////////////MADRASAH/////////////////////////////////////
//KEPALA MADRASAH
export const kepala_madrasah = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    path: "/profile-madrasah", // the url
    icon: "PeopleIcon", // the component being exported from icons/index.js
    name: "Profil Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      // {
      //   path: "/pengaturan/penerima",
      //   name: "Penerima",
      // },
    ],
  },
  {
    icon: "AddIcon",
    name: "Usulan ",
    // path: "/usulan/list",
    routes: [
      // submenu
      {
        path: "/usulan/kegiatan/list",
        name: "Usulan Kegiatan",
      },
      {
        path: "/usulan/subkegiatan/list",
        name: "Usulan Sub Kegiatan ",
      },
      {
        path: "/usulan/komponen/list",
        name: "Usulan Komponen",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      {
        path: "/rencana/pendapatan",
        name: "Pendapatan",
      },
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi RKAM",
      },

      {
        path: "/rencana/rencana-kegiatan",
        name: "Pengajuan RKAM",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      },
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];

//BENDAHARA MADRASAH
export const bendahara_madrasah = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    path: "/profile-madrasah", // the url
    icon: "PeopleIcon", // the component being exported from icons/index.js
    name: "Profil Madrasah", // name that appear in Sidebar
  },
  {
    icon: "AddIcon",
    name: "Usulan",
    routes: [
      // submenu
      {
        path: "/usulan/kegiatan/list",
        name: "Usulan Kegiatan",
      },
      {
        path: "/usulan/subkegiatan/list",
        name: "Usulan Sub Kegiatan ",
      },
      {
        path: "/usulan/komponen/list",
        name: "Usulan Komponen",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      {
        path: "/rencana/pendapatan",
        name: "Pendapatan",
      },
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi RKAM",
      },

      {
        path: "/rencana/rencana-kegiatan",
        name: "Pengajuan RKAM",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      }
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
];

//STAFF MADRASAH
export const staff_madrasah = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    path: "/profile-madrasah", // the url
    icon: "PeopleIcon", // the component being exported from icons/index.js
    name: "Profil Madrasah", // name that appear in Sidebar
  },
  {
    icon: "AddIcon",
    name: "Usulan Kegiatan",
    routes: [
      // submenu
      {
        path: "/usulan/kegiatan/list",
        name: "Usulan Kegiatan",
      },
      {
        path: "/usulan/subkegiatan/list",
        name: "Usulan Sub Kegiatan ",
      },
      {
        path: "/usulan/komponen/list",
        name: "Usulan Komponen",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      {
        path: "/rencana/pendapatan",
        name: "Pendapatan",
      },
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi RKAM",
      },

      {
        path: "/rencana/rencana-kegiatan",
        name: "Pengajuan RKAM",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      }
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
];

/////////////////////////////KAB/KOTA/////////////////////////////////
//ADMIN KAB KOTA
export const admin_kabkota = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },

      {
        path: "/pengaturan/tanggal-rkam", // the url
        name: "Tanggal RKAM", // name that appear in Sidebar
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi RKAM",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      }
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
//PENGARAH KAB KOTA  //PERLU DIREVISI
export const pengarah_kabkota = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "PeopleIcon",
    name: "Manajemen User",
    routes: [
      // submenu
      {
        path: "/manajemenuser/profile",
        name: "My Profile",
      },
      {
        path: "/manajemenuser/task",
        name: "My Task",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
];

//AUDITOR KAB KOTA  //PERLU DIREVISI
export const auditor_kabkota_external = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  // {
  //   icon: "PeopleIcon",
  //   name: "Manajemen User",
  //   routes: [
  //     // submenu
  //     {
  //       path: "/manajemenuser/profile",
  //       name: "My Profile",
  //     },
  //     {
  //       path: "/manajemenuser/task",
  //       name: "My Task",
  //     },
  //   ],
  // },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];

//PENANGGUNG JAWAB UMUM  //PERLU DIREVISI
export const penanggung_jawab_umum_kabkota = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/ppk",
        name: "PPK",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
//PENANGGUNG JAWAB TEKNIS  //PERLU DIREVISI
export const penanggung_jawab_teknis_kabkota = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "PeopleIcon",
    name: "Manajemen User",
    routes: [
      // submenu
      {
        path: "/manajemenuser/profile",
        name: "My Profile",
      },
      {
        path: "/manajemenuser/task",
        name: "My Task",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
];
//PEMBUAT KEBIJAKAN  //PERLU DIREVISI
export const pembuat_kebijakan_kabkota = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "PeopleIcon",
    name: "Manajemen User",
    routes: [
      // submenu
      {
        path: "/manajemenuser/profile",
        name: "My Profile",
      },
      {
        path: "/manajemenuser/task",
        name: "My Task",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
];
//AUDITOR KAB KOTA  //PERLU DIREVISI
export const auditor_kabkota = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "PeopleIcon",
    name: "Manajemen User",
    routes: [
      // submenu
      {
        path: "/manajemenuser/profile",
        name: "My Profile",
      },
      {
        path: "/manajemenuser/task",
        name: "My Task",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
];

//////////////////////////////PROVINSI////////////////////////////////
//ADMIN PROVISI
export const admin_provinsi = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi RKAM",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
export const auditor_provinsi_external = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi RKAM",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];

//PENGARAH PROVINSI  //PERLU DIREVISI
export const pengarah_provinsi = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "PeopleIcon",
    name: "Manajemen User",
    routes: [
      // submenu
      {
        path: "/manajemenuser/profile",
        name: "My Profile",
      },
      {
        path: "/manajemenuser/task",
        name: "My Task",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
];
//PENANGGUNG JAWAB UMUM PROVINSI  //PERLU DIREVISI
export const penanggung_jawab_umum_provinsi = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "PeopleIcon",
    name: "Manajemen User",
    routes: [
      // submenu
      {
        path: "/manajemenuser/profile",
        name: "My Profile",
      },
      {
        path: "/manajemenuser/task",
        name: "My Task",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
];
//PENANGGUNG JAWAB TEKNIS PROVINSI  //PERLU DIREVISI
export const penanggung_jawab_teknis_provinsi = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "PeopleIcon",
    name: "Manajemen User",
    routes: [
      // submenu
      {
        path: "/manajemenuser/profile",
        name: "My Profile",
      },
      {
        path: "/manajemenuser/task",
        name: "My Task",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
];
//PEMBUAT KEBIJAKAN PROVINSI  //PERLU DIREVISI
export const pembuat_kebijakan_provinsi = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/staff-madrasah",
        name: "Madrasah",
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Kankemenag",
      },
    ],
  },
  {
    icon: "PeopleIcon",
    name: "Manajemen User",
    routes: [
      // submenu
      {
        path: "/manajemenuser/profile",
        name: "My Profile",
      },
      {
        path: "/manajemenuser/task",
        name: "My Task",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
//AUDITOR PROVINSI  //PERLU DIREVISI
export const auditor_provinsi = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "PeopleIcon",
    name: "Manajemen User",
    routes: [
      // submenu
      {
        path: "/manajemenuser/profile",
        name: "My Profile",
      },
      {
        path: "/manajemenuser/task",
        name: "My Task",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/kode-registrasi",
        name: "Kode Registrasi",
      },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
    ],
  },
];

///////////////////////////////PUSAT//////////////////////////////////
//SUPER ADMIN PUSAT  //PERLU DI REVISI
export const super_admin_pusat = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/pusat",
            name: "Pusat",
          },
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/sub-kegiatan",
        name: "Sub Kegiatan",
      },
      {
        path: "/referensi/kegiatan-bos",
        name: "Kegiatan BOS",
      },
      // {
      //   path: "/referensi/kegiatan-bop",
      //   name: "Kegiatan BOP",
      // },
      {
        path: "/referensi/sumber-dana-madrasah",
        name: "Sumber Dana Madrasah",
      },
      // {
      //   path: "/referensi/alokasi-bop",
      //   name: "Alokasi BOP",
      // },
      // {
      //   path: "/referensi/alokasi-bos",
      //   name: "Alokasi BOS",
      // },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi RKAM",
      },
      {
        path: "/rencana/pagu-indikatif",
        name: "Pagu Indikatif",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      },
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
//ADMIN PUSAT
export const admin_pusat = [
  {
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
    path: "/dashboard", // the url
    routes: [
      {
        icon: "ChartsIcon",
        name: "Pendapatan dan Kegiatan",
        path: "/dashboard/pendapatan-dan-kegiatan", // the url
      },
      {
        icon: "ChartsIcon",
        name: "Pendapatan",
        path: "/dashboard/pendapatan", // the url
      },
      {
        icon: "ChartsIcon",
        name: "Anggaran Kas Belanja",
        path: "/dashboard/kas-belanja", // the url
      },
    ],
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/pusat",
            name: "Pusat",
          },
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
  {
    icon: "AddIcon",
    name: "Usulan Kegiatan",
    routes: [
      // submenu
      {
        path: "/usulan/kegiatan/list",
        name: "Usulan Kegiatan",
      },
    ],
  },

  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
        acl: "admin_pusat",
        permissions: ["admin", "user"],
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/jenis-belanja",
        name: "Jenis Belanja",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/sub-kegiatan",
        name: "Sub Kegiatan",
      },
      {
        path: "/referensi/kegiatan-bos",
        name: "Kegiatan BOS",
      },
      // {
      //   path: "/referensi/kegiatan-bop",
      //   name: "Kegiatan BOP",
      // },
      {
        path: "/referensi/sumber-dana-madrasah",
        name: "Sumber Dana Madrasah",
      },
      // {
      //   path: "/referensi/alokasi-bop",
      //   name: "Alokasi BOP",
      // },
      // {
      //   path: "/referensi/alokasi-bos",
      //   name: "Alokasi BOS",
      // },
      {
        path: "/referensi/madrasah",
        name: "Madrasah",
      },
      {
        path: "/referensi/tahap-pencairan",
        name: "Tahapan Pencairan",
      },
      // {
      //   path: "/referensi/kode-registrasi-madrasah",
      //   name: "Kode Registrasi Madrasah",
      // },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi RKAM",
      },
      {
        path: "/rencana/pagu-indikatif",
        name: "Pagu Indikatif",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      },
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
//PENGARAH PUSAT  //PERLU DI REVISI
export const pengarah_pusat = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/pusat",
            name: "Pusat",
          },
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/sub-kegiatan",
        name: "Sub Kegiatan",
      },
      {
        path: "/referensi/kegiatan-bos",
        name: "Kegiatan BOS",
      },
      // {
      //   path: "/referensi/kegiatan-bop",
      //   name: "Kegiatan BOP",
      // },
      {
        path: "/referensi/sumber-dana-madrasah",
        name: "Sumber Dana Madrasah",
      },
      // {
      //   path: "/referensi/alokasi-bop",
      //   name: "Alokasi BOP",
      // },
      // {
      //   path: "/referensi/alokasi-bos",
      //   name: "Alokasi BOS",
      // },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/.list",
        name: "Pencairan Pagu",
      },
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
//
export const auditor_pusat_external = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/pusat",
            name: "Pusat",
          },
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/sub-kegiatan",
        name: "Sub Kegiatan",
      },
      {
        path: "/referensi/kegiatan-bos",
        name: "Kegiatan BOS",
      },
      // {
      //   path: "/referensi/kegiatan-bop",
      //   name: "Kegiatan BOP",
      // },
      {
        path: "/referensi/sumber-dana-madrasah",
        name: "Sumber Dana Madrasah",
      },
      // {
      //   path: "/referensi/alokasi-bop",
      //   name: "Alokasi BOP",
      // },
      // {
      //   path: "/referensi/alokasi-bos",
      //   name: "Alokasi BOS",
      // },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      },
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
//PENANGGUNG JAWAB UMUM PUSAT  //PERLU DI REVISI
export const penanggung_jawab_umum_pusat = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/pusat",
            name: "Pusat",
          },
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/sub-kegiatan",
        name: "Sub Kegiatan",
      },
      {
        path: "/referensi/kegiatan-bos",
        name: "Kegiatan BOS",
      },
      // {
      //   path: "/referensi/kegiatan-bop",
      //   name: "Kegiatan BOP",
      // },
      {
        path: "/referensi/sumber-dana-madrasah",
        name: "Sumber Dana Madrasah",
      },
      // {
      //   path: "/referensi/alokasi-bop",
      //   name: "Alokasi BOP",
      // },
      // {
      //   path: "/referensi/alokasi-bos",
      //   name: "Alokasi BOS",
      // },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      },
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
//PENANGGUNG JAWAB TEKNIS PUSAT  //PERLU DI REVISI
export const penanggung_jawab_teknis_pusat = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/pusat",
            name: "Pusat",
          },
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/sub-kegiatan",
        name: "Sub Kegiatan",
      },
      {
        path: "/referensi/kegiatan-bos",
        name: "Kegiatan BOS",
      },
      // {
      //   path: "/referensi/kegiatan-bop",
      //   name: "Kegiatan BOP",
      // },
      {
        path: "/referensi/sumber-dana-madrasah",
        name: "Sumber Dana Madrasah",
      },
      // {
      //   path: "/referensi/alokasi-bop",
      //   name: "Alokasi BOP",
      // },
      // {
      //   path: "/referensi/alokasi-bos",
      //   name: "Alokasi BOS",
      // },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      },
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },

];
//PEMBUAT KEBIJAKAN PUSAT  //PERLU DI REVISI
export const pembuat_kebijakan_pusat = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/pusat",
            name: "Pusat",
          },
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/sub-kegiatan",
        name: "Sub Kegiatan",
      },
      {
        path: "/referensi/kegiatan-bos",
        name: "Kegiatan BOS",
      },
      // {
      //   path: "/referensi/kegiatan-bop",
      //   name: "Kegiatan BOP",
      // },
      {
        path: "/referensi/sumber-dana-madrasah",
        name: "Sumber Dana Madrasah",
      },
      // {
      //   path: "/referensi/alokasi-bop",
      //   name: "Alokasi BOP",
      // },
      // {
      //   path: "/referensi/alokasi-bos",
      //   name: "Alokasi BOS",
      // },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      },
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  
];
//AUDITOR PUSAT  //PERLU DI REVISI
export const auditor_pusat = [
  {
    path: "/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/edm", // the url
    icon: "OutlinePersonIcon", // the component being exported from icons/index.js
    name: "Evaluasi Diri Madrasah", // name that appear in Sidebar
  },
  {
    icon: "EditIcon",
    name: "Pengaturan",
    routes: [
      {
        icon: "PeopleIcon",
        name: "Manajemen User",
        routes: [
          // submenu
          {
            path: "/pengaturan/management-user/pusat",
            name: "Pusat",
          },
          {
            path: "/pengaturan/management-user/prov",
            name: "Kanwil",
          },
          {
            path: "/pengaturan/management-user/kabkota",
            name: "Kankemenag",
          },
          {
            path: "/pengaturan/management-user/madrasah",
            name: "Madrasah",
          },
        ],
      },
      {
        path: "/pengaturan/rekening-bank",
        name: "Rekening Bank",
      },
      {
        path: "/pengaturan/penerima",
        name: "Penerima",
      },
    ],
  },
  {
    icon: "PagesIcon",
    name: "Referensi",
    routes: [
      // submenu
      {
        path: "/referensi/snp",
        name: "SNP",
      },
      {
        path: "/referensi/tahun",
        name: "Tahun",
      },
      {
        path: "/referensi/rekening-belanja",
        name: "Rekening Madrasah",
      },
      {
        path: "/referensi/komponen-biaya",
        name: "Komponen Biaya",
      },
      {
        path: "/referensi/kegiatan",
        name: "Kegiatan",
      },
      {
        path: "/referensi/sub-kegiatan",
        name: "Sub Kegiatan",
      },
      {
        path: "/referensi/kegiatan-bos",
        name: "Kegiatan BOS",
      },
      // {
      //   path: "/referensi/kegiatan-bop",
      //   name: "Kegiatan BOP",
      // },
      {
        path: "/referensi/sumber-dana-madrasah",
        name: "Sumber Dana Madrasah",
      },
      // {
      //   path: "/referensi/alokasi-bop",
      //   name: "Alokasi BOP",
      // },
      // {
      //   path: "/referensi/alokasi-bos",
      //   name: "Alokasi BOS",
      // },
    ],
  },
  {
    icon: "ChartsIcon",
    name: "Rencana",
    routes: [
      // submenu
      {
        path: "/rencana/approval-validasi",
        name: "Approval & Validasi",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Pencairan",
    routes: [
      // submenu
      {
        path: "/pencairan/pagu-definitif",
        name: "Pagu Definitif",
      },
      {
        path: "/pencairan/pencairan-pagu/list",
        name: "Pencairan Pagu",
      },
    ],
  },
  {
    icon: "SunIcon",
    name: "Realisasi",
    routes: [
      // submenu
      {
        path: "/realisasi/realisasi-kegiatan/list",
        name: "Pendapatan",
      },
      {
        path: "/realisasi/pindah-buku/list",
        name: "Pindah Buku",
      },
      {
        path: "/realisasi/pengeluaran-madrasah/list",
        name: "Pengeluaran Kegiatan",
      },
      {
        path: "/realisasi/pengeluaran-pajak/list",
        name: "Pengeluaran Pajak",
      },
      {
        path: "/realisasi/pengembalian-dana/list",
        name: "Pengembalian Dana",
      },
      {
        path: "/realisasi/output-kegiatan",
        name: "Output Kegiatan",
      },
    ],
  },
  {
    icon: "FormsIcon",
    name: "Laporan",
    routes: [
      // submenu
      {
        path: "/laporan/laporan-rkam",
        name: "Laporan RKAM",
      },
      {
        path: "/laporan/buku-kas-umum",
        name: "Buku Kas Umum",
      },
      {
        path: "/laporan/buku-kas-pembantu",
        name: "Buku Kas Pembantu",
      },
      {
        path: "/laporan/laporan-realisasi",
        name: "Laporan Realisasi",
      },
    ],
  },
  {
    icon: "ModalsIcon",
    name: "Export & Backup",
    routes: [
      // submenu
      {
        path: "/export",
        name: "Export Data",
      },
      {
        path: "/backup",
        name: "Backup Data",
      },
    ],
  },
  
];
