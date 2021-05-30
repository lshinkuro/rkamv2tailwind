import React from "react";
import { BreadCrumb } from "../../../components";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  Label,
  Select,
  TableHeader,
  TableRow,
  Pagination,
  Button,
} from "@windmill/react-ui";
import InputModal from "./inputmodal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFileExport,
  faPencilAlt,
  faPlus,
  faTrashAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import * as rService from "../../../services/reference";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function IconOK() {
  return <FontAwesomeIcon icon={faFileExport} />;
}

function KodeRegistrasiMadrasah() {
  const item = ["Home", "Referensi", "Kode Registrasi Madrasah"];
  const [dataTable, setDataTable]: any = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true);
  const [modalData, setModalData] = React.useState<any>("");
  const [tableRefresh, setTableRefresh] = React.useState<any>(0);
  const [userRole, setUserRole] = React.useState<any>(null);

  // setup data for every table

  const generateTableData = () => {
    rService.getReferensiKomponenBiaya()?.then((res) => {
      setDataTable(res);
    });
  };

  React.useEffect(() => {
    const tmp0 = JSON.parse(localStorage.getItem("auth")!);
    setUserRole(tmp0.kode_role);
    generateTableData();
  }, [tableRefresh]);

  function deleteData(data: any) {
    let tmp0: any = [];
    tmp0.push({
      id: data.id,
      isDeleted: "deleted",
    });
    setIsModalOpen(true);
    setModalData(tmp0[0]);
  }

  function showDetails(data: any) {
    setIsModalOpen(true);
    setModalData(data);
  }
  function showDetail() {
    setIsModalOpen(true);
  }

  function hideDetails() {
    setTableRefresh(tableRefresh + 1);
    setModalData("");
    setIsModalOpen(false);
  }

  const status = (sts: number) => {
    if (sts === 1) {
      return "active";
    } else if (sts === 0) {
      return "waiting";
    }
  };
  const color = (sts: number) => {
    if (sts === 1) {
      return "success";
    } else if (sts === 0) {
      return "warning";
    }
  };
  const columns: any = [
    {
      name: "Provinsi",
      selector: "provinsi",
      sortable: true,
      subHeader: true,
    },
    {
      name: "Kab / kota",
      selector: "kab_kota",
      sortable: true,
    },
    {
      name: "NSM",
      selector: "nsm",
      sortable: true,
    },
    {
      name: "NPSN",
      selector: "npsn",
      sortable: true,
    },
    {
      name: "Nama Madrasah",
      selector: "madrasah",
      sortable: true,
    },
    {
      name: "Status Madrasah",
      selector: "status",
      sortable: true,
    },
    {
      name: "Jenjang",
      selector: "jenjang",
      sortable: true,
    },
    //

    {
      name: "Kode Registrasi",
      selector: "kode_registrasi",
      sortable: true,
    },
    {
      name: "Email Terakhir Terkirim",
      selector: "email_terakhir_terkirim",
      sortable: true,
    },
    {
      name: "Waktu Terakhir Terkirim",
      selector: "waktu_terakhir_terkirim",
      sortable: true,
    },
    {
      name: "Action",
      selector: "jenis_belanja",
      sortable: true,
      cell: (row) => (
        <div
          onClick={showDetail}
          className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-3 "
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
      ),
    },
  ];
  let datas: any = [];

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

  return (
    <>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title="Kode Registrasi Madrasah" />
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-col  md:flex-row gap-2 ">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Provinsi*</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Provinsi"
              >
                <option>Aceh</option>
                <option>Sumatra Selatan</option>
              </Select>
            </Label>
          </div>
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Kab/Kota*</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Kab/Kota"
              >
                <option>Aceh Selatan</option>
                <option>Aceh Utara</option>
              </Select>
            </Label>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row gap-2 ">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Jenjang*</span>
              <Select className="mt-1 text-gray-500">
                <option>Standar 1</option>
                <option>Standar 2</option>
              </Select>
            </Label>
          </div>
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Status Madrasah*</span>
              <Select className="mt-1 text-gray-500">
                <option>Standar 1</option>
                <option>Standar 2</option>
              </Select>
            </Label>
          </div>
        </div>
      </div>
      <div className="m-5 px-5 bg-white shadow-sm rounded-sm">
        {/* <div className="flex flex-row justify-end my-3 space-x-2">
          <div
            onClick={showDetail}
            className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-3 "
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div className="flex text-white justify-center items-center bg-yellow-300 hover:bg-yellow-400 cursor-pointer p-3 ">
            <FontAwesomeIcon icon={faFileExport} />
          </div>
        </div> */}
        <div>
          <DataTableExtensions
            subHeader={columns}
            columns={columns}
            data={dataTable}
          >
            <DataTable
              subHeader={false}
              columns={columns}
              data={dataTable}
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
        </div>
      </div>
    </>
  );
}

export default KodeRegistrasiMadrasah;
