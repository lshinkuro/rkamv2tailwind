import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faFileExport,
  faPlus,
  faEdit,
  faAngleRight,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";

import AddModal from "./modal";
import { getBulan } from "../../../utils/helper";

import { ExportToExcel } from "../../../components/Export/ExportToExcel";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import routes from "../../../routes";
import { useHistory } from "react-router-dom";

function RencanaKegiatan() {
  const route = useHistory();
  const item = ["Home", "Rencana Kegiatan Dan Anggaran", "List"];
  const localItems = "rencana/kegiatan";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>("");
  const [kodeRole, setKodeRole] = useState<any>("");

  const [isExpand, setIsExpand] = React.useState<boolean>(false);


  //static percentage
  const percent = 70;


  const datas: any = JSON.parse(localStorage.getItem(localItems)!) || [];
  function showDetails(data?: any) {
    if (data) {
      setModalData(data);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  }

  function hideDetails() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    let tmpAuth: any = JSON.parse(localStorage.getItem("auth")!);
    setKodeRole(tmpAuth.kode_role);
  }, [localStorage.getItem(localItems)!]);

  const exportToXlsx = (apiData: any, fileName: any) => {
    let tmp0: any = [];
    apiData.forEach((el0) => {
      tmp0.push({
        bulan_pelaksanaan_start: el0.bulan_pelaksanaan_start,
        bulan_pelaksanaan_end: el0.bulan_pelaksanaan_end,
        indikator_hasil: el0.indikator_hasil,
        indikator_hasil_target: el0.indikator_hasil_target,
        indikator_output: el0.indikator_output,
        indikator_output_satuan: el0.indikator_output_satuan,
        indikator_hasil_satuan: el0.indikator_hasil_satuan,
        indikator_output_target: el0.indikator_output_target,
        kelompok_sasaran: el0.kelompok_sasaran,
        kode_snp: el0.kode_snp,
        nama_snp: el0.nama_snp,
        kode_kegiatan: el0.kode_kegiatan,
        nama_kegiatan: el0.nama_kegiatan,
        kode_sub_kegiatan: el0.kode_sub_kegiatan,
        nama_sub_kegiatan: el0.nama_sub_kegiatan,
        tahun: el0.tahun,
      });
    });

    ExportToExcel(tmp0, fileName);
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: "#1b6fbb",
        textTransform: "uppercase",
        color: "white",
      },
    },
  };

  const columns: any = [
    {
      name: "Nama Snp",
      selector: "nama_snp",
      sortable: true,
      subHeader: true,
    },
    {
      name: "Kegiatan",
      selector: "nama_kegiatan",
      sortable: true,
    },
    {
      name: "Sub Kegiatan",
      selector: "nama_sub_kegiatan",
      sortable: true,
    },
    {
      name: "Mulai Pelaksanaan",
      selector: "bulan_pelaksanaan_start",
      sortable: true,
      cell: (row) => getBulan(row.bulan_pelaksanaan_start),
    },
    {
      name: "Akhir Pelaksanaan",
      selector: "bulan_pelaksanaan_end",
      sortable: true,
      cell: (row) => getBulan(row.bulan_pelaksanaan_end),
    },
    {
      name: "Kelompok Sasaran",
      selector: "kelompok_sasaran",
      sortable: true,
      cell: (d) => <span>{d ? d?.kelompok_sasaran.join(", ") : ""}</span>,
    },
    {
      name: "Indikator Output",
      selector: "indikator_output",
      sortable: true,
    },

    {
      name: "Indikator Output Target",
      selector: "indikator_output_target",
      sortable: true,
    },

    {
      name: "Indikator Output Satuan",
      selector: "indikator_output_satuan",
      sortable: true,
    },

    {
      name: "Indikator Hasil",
      selector: "indikator_hasil",
      sortable: true,
    },

    {
      name: "Indikator Hasil Target",
      selector: "indikator_hasil_target",
      sortable: true,
    },
    {
      name: "Indikator Hasil Satuan",
      selector: "indikator_hasil_satuan",
      sortable: true,
    },

    {
      name: "Aksi",
      style:(row)=>{

      },
      cell: (row) => (
        <div className="flex items-center text-white sticky">
          <div
            // layout="link"
            className="bg-yellow-300 hover:bg-yellow-700 mx-0 px-2 py-1  cursor-pointer"
            aria-label="Edit"
            title="Edit"
            onClick={() => {
              showDetails(row);
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="sm" />
          </div>
          <div
            // layout="link"
            className="bg-blue-300 hover:bg-blue-600 mx-0 px-2 py-1  cursor-pointer"
            aria-label="Rincian"
            title="Rincian"
            onClick={() => {
              // route.push("rincian/id/list");
              route.push({
                pathname: `rincian/${row.id}/list`,
                state: row,
              });
            }}
          >
            <FontAwesomeIcon icon={faEdit} size="sm" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <BreadCrumb data={item} title="Rencana Kegiatan Dan Anggaran" />

      <div className="bg-white mx-5 shadow-sm rounded-sm my-4 flex flex-col">
        <div
          className="h-48 bg-white shadow-sm w-full rounded-sm cursor-pointer flex hover:bg-gray-100 transform hover:scale-y-105"
          onClick={() => setIsExpand(!isExpand)}
        >
          <div className="w-10 h-full flex items-center justify-center text-gray-500">
            {!isExpand ? (
              <FontAwesomeIcon icon={faAngleRight} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} size="lg" />
            )}
          </div>
          <div className="mt-5 flex-1 flex justify-between">
            <div className="w-2/6">
              <p>Total Pendapatan</p>
              <p>Rp 54.000.000,-</p>
            </div>
            <div className="w-2/6">
              <p>Total Belanja</p>
              <p>Rp 66.000.000,-</p>
            </div>
            <div className="w-2/6">
              <p>Sisa</p>
              <p>Rp 54.000,-</p>
              <div style={{ width: "100%", height: 8, padding: 60, paddingLeft: 0 }}>
                {percent}%
                <div style={{ width: `${percent}%`, height: 8, backgroundColor: "blue", borderRadius: 8 }}></div>
              </div>
            </div>
          </div>
        </div>
        {isExpand ? (
          <div className="mt-4">
            <div className="mt-1 mx-4 h-24 bg-white shadow-md rounded-sm cursor-pointer flex hover:bg-gray-100 transform hover:scale-y-105">
              <div className="mt-5 flex-1 flex justify-start">
                <div className="mr-6" style={{marginRight:400}} >
                  APBN-BOS
                </div>
                <div >
                  <p>Total Pendapatan</p>
                  <p>Rp 54.000,-</p>
                </div>
                <div >
                  <p>Total Belanja</p>
                  <p>Rp 66.000,-</p>
                </div>
                <div >
                  <p>Sisa</p>
                  <p>Rp 54.000,-</p>
                 
                </div>
              </div>
            </div>
            <div className="mt-1 mx-4 h-24 bg-white shadow-md rounded-sm cursor-pointer flex hover:bg-gray-100 transform hover:scale-y-105">
              <div className="mt-5 flex-1 flex justify-start">
                <div className="mr-6" style={{marginRight:400}}  >
                  APBN-NONBOS
                </div>
                <div >
                  <p>Total Pendapatan</p>
                  <p>Rp 54.000,-</p>
                </div>
                <div >
                  <p>Total Belanja</p>
                  <p>Rp 66.000,-</p>
                </div>
                <div >
                  <p>Sisa</p>
                  <p>Rp 54.000,-</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>


      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-row justify-between my-3 ">
          <div
            className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
            onClick={() => exportToXlsx(datas, "rencana-kegiatan")}
          >
            <FontAwesomeIcon icon={faFileExport} size="sm" />
          </div>
          {kodeRole === "kepala_madrasah" ? (
            <div
              className="bg-blue-500 p-3 rounded-md mr-2 text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={() => {
                showDetails({});
              }}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </div>
          ) : (
            ""
          )}
        </div>




        <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md w-full">
          {datas.length === 0 ? (
            "Silahkan Sinkronkan data"
          ) : (
            <DataTableExtensions
              subHeader={columns}
              columns={columns}
              data={datas}
              export={false}
            >
              <DataTable
                className="w-full  max-w-full overflow-x-scroll "
                subHeader={false}
                columns={columns}
                data={datas}
                noHeader
                responsive={true}
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
                customStyles={customStyles}
                overflowYOffset="hidden"
              />
            </DataTableExtensions>
          )}
        </div>
      </div>
      <AddModal
        data={modalData}
        hideDetails={hideDetails}
        isModalOpen={isModalOpen}
        onClose={hideDetails}
      ></AddModal>
    </>
  );
}

export default RencanaKegiatan;
