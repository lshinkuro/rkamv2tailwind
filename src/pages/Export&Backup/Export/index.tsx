import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BreadCrumb from "../../../components/BreadCrumb";
import { EyeIcon } from "../../../icons";
import { UsulanKegiatanBody } from "../../../services/v2/planningservice/usulanservice";
import { usulanKegiatanStatus } from "../../../utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExportToExcel } from "../../../components/Export/ExportToExcel";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getBulan } from "../../../utils/helper";

const UsulanList = () => {
  const item = ["Home", "Export & Backup", "Export"];
  const localItems = "usulankegiatan";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});
  const [dataTable, setDataUsulan] = useState<any>([]);
  const [dataExport, setDataExport] = useState<any>([]);
  const [dataRencana, setDataRencana] = useState<any>([]);

  const history = useHistory();

  function showDetails(data: any) {
    setIsModalOpen(true);
    setModalData(data);
  }

  function hideDetails() {
    setIsModalOpen(false);
  }

  const generateTableData = () => {
    if (localStorage.getItem(localItems)) {
      // setDataUsulan(JSON.parse(localStorage.getItem("usulankegiatan1")!));
      setDataRencana(JSON.parse(localStorage.getItem("rencanakegiatan")!));
    }
    setDataExport([
      {
        nama: "Usulan Kegiatan",
        kode: "usulanKegiatan1",
      },
      {
        nama: "Rencana Kegiatan",
        kode: "rencanaKegiatan",
      },
    ]);
  };

  useEffect(() => {
    generateTableData();
  }, [localStorage.getItem(localItems)!]);

  const columnRencana: any = [
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
      name: "Total Rincian",
      selector: "",
      cell: (row) => <div>0</div>,
    },
    {
      name: "Total Disetujui",
      selector: "",
      cell: (row) => <div>0</div>,
    },
  ];
  const columnsUsulan = [
    {
      name: "Kode",
      selector: "no_tiket_format",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {row.no_tiket_format || row.usulan.no_tiket_format}
          </p>
        </div>
      ),
    },

    {
      name: "Tahun",
      selector: "tahun",
      sortable: true,
    },
    {
      name: "Usulan",
      selector: "usulan.usulan_nama_kegiatan",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {row.usulan.usulan_nama_kegiatan}
          </p>
        </div>
      ),
    },

    {
      name: "Status",
      selector: "status_usulan",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {row.status_usulan || "Menunggu"}
          </p>
        </div>
      ),
    },
  ];
  const columns = [
    {
      name: "Nama",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Aksi",
      selector: "activated",
      sortable: false,
      export: false,
      cell: (row) => (
        <div>
          <div className="flex items-center space-x-4">
            <Button
              layout="link"
              aria-label="details"
              onClick={() => showDetails(row)}
            >
              <EyeIcon className="w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ),
    },
  ];

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

  const exportToXlsx = (apiData: any, fileName: any) => {
    let tmp0: any = [];
    apiData.forEach((el0: any) => {
      tmp0.push({
        NoTIket: el0.no_tiket,
        Tahun: el0.tahun,
        Pengusul: el0.pengusul.nama_madrasah,
        KodeUsulan: el0.kode_usulan,
        Usulan: el0.usulan.usulan_nama_kegiatan,
        Kode_provinsi: el0.kode_provinsi,
        Kode_kabkota: el0.kode_kabkota,
        Status: el0.status_usulan,
        ResponDate: el0.respon_date,
        ResponRole: el0.respon_role,
      });
    });

    ExportToExcel(tmp0, fileName);
  };

  return (
    <div>
      <BreadCrumb data={item} title="Export Data" />
      <div className="m-5 p-5 bg-white shadow-md rounde">
        {/* <div className="flex flex-row justify-between my-3">
          <div
            className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
            onClick={() => {
              exportToXlsx(dataTable, "usulan-kegiatan-list");
            }}
          >
            <FontAwesomeIcon icon={faFileExport} size="sm" />
          </div>

          <div
            className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
            onClick={() => history.push("request")}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </div>
        </div> */}
        <DataTableExtensions
          name={"usulan-kegiatan"}
          columns={columns}
          data={dataExport}
          exportHeaders={true}
          filterPlaceholder={"pencarian..."}
          export={false}
        >
          <DataTable
            columns={columns}
            data={dataExport}
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
        </DataTableExtensions>
      </div>
      {/* Modals View */}
      <Modal isOpen={isModalOpen} onClose={hideDetails}>
        <ModalHeader>{modalData.nama}</ModalHeader>
        <ModalBody>
          {/* <pre>{JSON.stringify(modalData)}</pre> */}
          {modalData.kode === "usulanKegiatan1" ? (
            <div>
              <div className="flex flex-row justify-between my-3">
                <div
                  className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
                  onClick={() => {
                    exportToXlsx(
                      JSON.parse(localStorage.getItem("usulankegiatan1")!),
                      "usulan-kegiatan-list"
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faFileExport} size="sm" /> &nbsp;
                  Export
                </div>
              </div>
              <br />

              <DataTable
                columns={columnsUsulan}
                data={JSON.parse(localStorage.getItem("usulankegiatan1")!)}
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                paginationPerPage={5}
                highlightOnHover
                customStyles={customStyles}
              />
            </div>
          ) : (
            <div>
              <div className="flex flex-row justify-between my-3">
                <div
                  className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
                  onClick={() => {
                    exportToXlsx(
                      JSON.parse(localStorage.getItem("rencanakegiatan")!),
                      "rencana-kegiatan-list"
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faFileExport} size="sm" /> &nbsp;
                  Export
                </div>
              </div>

              <DataTable
                columns={columnRencana}
                data={JSON.parse(localStorage.getItem("rencanakegiatan")!)}
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
                customStyles={customStyles}
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={hideDetails}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={hideDetails}>
              Cancel
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UsulanList;
