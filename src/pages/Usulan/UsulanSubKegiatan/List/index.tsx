import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
} from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BreadCrumb from "../../../../components/BreadCrumb";
import { EyeIcon } from "../../../../icons";
import { UsulanKegiatanBody } from "../../../../services/v2/planningservice/usulanservice";
import { usulanKegiatanStatus } from "../../../../utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExportToExcel } from "../../../../components/Export/ExportToExcel";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as uService from "../../../../services/v2/planningservice/usulanservice";
const UsulanList = () => {
  const item = ["Home", "Usulan Sub Kegiatan", "List"];
  const localItems = "usulanSubKegiatan";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});
  // const [tabRefresh, setTabRefresh] = useState<number>(0);
  const [dataTable, setDataTable] = useState<any>([]);
  const [status, setStatus] = useState<any>("");
  const [userRole, setUserRole] = useState<any>("");
  const [response, setRespon] = useState<any>("");
  const refStatus: any[] = [
    {
      nama: "Disetujui, sedang di kerjakan",
      kode: "Disetujui, sedang di kerjakan",
    },
    {
      nama: "Tolak",
      kode: "Tolak",
    },
    {
      nama: "Selesai",
      kode: "Selesai",
    },
  ];

  const history = useHistory();

  function showDetails(data: any) {
    setIsModalOpen(true);
    setModalData(data);
  }

  const generateTableData = () => {
    if (localStorage.getItem(localItems)) {
      setDataTable(JSON.parse(localStorage.getItem(localItems)!));
    }
  };

  useEffect(() => {
    const tmp0 = JSON.parse(localStorage.getItem("auth")!);
    setUserRole(tmp0.kode_role);
    // setDataTable(JSON.parse(localStorage.getItem(localItems)!));

    generateTableData();
  }, [localStorage.getItem(localItems)!]);

  const hideDetails = () => {
    setIsModalOpen(false);
  };
  const simpanData = async (id: any) => {
    let tmp0: any = {
      status_usulan: status.length === 0 ? refStatus[0].kode : status,
      response: response,
    };
    try {
      await uService.setApproveOrReject(tmp0, id.id, localItems);
      
      hideDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const columnsSubKegiatan = [
    {
      name: "Nama Penggunaan BOs",
      selector: "nama_penggunaan_bos",
      sortable: true,
    },
    {
      name: "Sub Kegiatan",
      selector: "sub_kegiatan",
      sortable: true,
    },
  ];
  const columns = [
    {
      name: "Kode",
      selector: "no_tiket_format",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {row.usulan.no_tiket}
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
      name: "Sub Usulan",
      selector: "usulan.nama_sub_kegiatan",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {row.usulan.nama_sub_kegiatan}
          </p>
        </div>
      ),
    },

    {
      name: "Status",
      selector: "status_usulan",
      sortable: true,cell: (row) => (
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {row.status_usulan || "Menunggu"}
          </p>
        </div>
      ),
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
        Pengusul: el0.usulan.pengusul || "",
        KodeUsulan: el0.kode_usulan,
        Usulan: el0.usulan.nama_sub_kegiatan,
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
      <BreadCrumb data={item} title="Usulan Sub Kegiatan Madrasah" />
      <div className="m-5 p-5 bg-white shadow-md rounde">
        <div className="flex flex-row justify-between my-3">
          <div
            className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
            onClick={() => {
              exportToXlsx(dataTable, "usulan-sub-kegiatan-list");
            }}
          >
            <FontAwesomeIcon icon={faFileExport} size="sm" />
          </div>
          {userRole !== "admin_pusat" ? (
            <div
              className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={() => history.push("request")}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </div>
          ) : (
            ""
          )}
        </div>
        <DataTableExtensions
          name={"usulan-kegiatan"}
          columns={columns}
          data={dataTable}
          exportHeaders={true}
          filterPlaceholder={"pencarian..."}
          export={false}
        >
          <DataTable
            columns={columns}
            data={dataTable}
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
        <ModalHeader>Detail Approval</ModalHeader>
        <ModalBody>
          <div className="flex flex-col p-2 border-t-2">
            <div className="flex flex-row">
              <div className="w-40">Pengusul</div>
              <div className="flex flex-row">
                : {modalData.usulan?.pengusul || ""}
              </div>
            </div>
          </div>
          <div className="flex flex-col p-2 border-t-2">
            <div className="flex flex-row">
              <div className="w-40">No Tiket</div>
              <div className="flex flex-row">
                : {modalData.no_tiket_format || ""}
              </div>
            </div>
          </div>
          <div className="flex flex-col p-2 border-t-2">
            <div className="flex flex-row">
              <div className="w-40">Standar Pendidikan</div>
              <div className="flex flex-row">
                : {modalData.usulan?.nama_snp || ""}
              </div>
            </div>
          </div>

          <div className="flex flex-col p-2 border-t-2">
            <div className="flex flex-row">
              <div className="w-40">Kegiatan</div>
              <div className="flex flex-row">
                : {modalData.usulan?.usulan_nama_kegiatan || ""}
              </div>
            </div>
          </div>
          <br />
          <DataTable
            columns={columnsSubKegiatan}
            data={modalData.usulan?.sub_kegiatan}
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            highlightOnHover
            customStyles={customStyles}
          />

          {userRole === "admin_pusat" ? (
            <div>
              <Label className="mt-4">
                <span>Status</span>
                <Select
                  className="mt-1"
                  onChange={(e: any) => {
                    setStatus(e.currentTarget.value);
                  }}
                  // valid={
                  //   status.length !== 0
                  //     ? true
                  //     : logErr !== "standar pendidikan tidak boleh kosong"
                  //     ? true
                  //     : false
                  // }
                >
                  {refStatus
                    ? refStatus.map((data: any, key: any) => (
                        <option
                          key={data.nama}
                          id={data.nama}
                          value={data.kode}
                        >
                          {data.nama}
                        </option>
                      ))
                    : "Silahkan Sinkrokan Data"}
                </Select>
              </Label>
              <Label className="mt-4">
                <span>Respon </span>
                <Input
                  type="text"
                  className="mt-1"
                  onChange={(e) => setRespon(e.currentTarget.value)}
                  id="Respon"
                  placeholder="Respon"
                  // valid={usulan.length !== 0 ? true : logErr ? false : true}
                />
              </Label>
            </div>
          ) : (
            ""
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
          {userRole === "admin_pusat" ? (
            <Button
              layout="outline"
              onClick={(e) => {
                simpanData(modalData);
              }}
            >
              Simpann
            </Button>
          ) : (
            ""
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UsulanList;
