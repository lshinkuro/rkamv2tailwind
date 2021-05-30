import React, { useState, useEffect } from "react";
import { BreadCrumb } from "../../../components";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import InputModal from "./modal";
import { removeDuplicate } from "../../../utils/helper";

function RekeningBank() {
  const localStorageName: string = "pengaturan/rekening-bank";
  const item = ["Pengaturan", "Rekening Bank"];
  const [roleTmp, setRoleTmp] = useState<any>("");
  const [dataTable, setDataTable] = useState<any>([]);
  const [dataTableExport, setDataTableExport] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>("");
  const [isUpdate, setIsUpdate] = useState<any>(false);

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
  }

  const columns = [
    {
      name: "Kode Bank",
      selector: "kode_bank",
      sortable: true,
    },
    {
      name: "Nama Bank",
      selector: "nama_bank",
      sortable: true,
    },
    {
      name: "Cabang",
      selector: "cabang_bank",
      sortable: true,
    },
    {
      name: "No Rekening",
      selector: "no_rekening",
      sortable: true,
    },
    {
      name: "Nama No Rekening",
      selector: "no_rekening_nama",
      sortable: true,
    },
    {
      name: "Keterangan",
      selector: "keterangan",
      sortable: true,
    },
    {
      name: "Tipe Rekening",
      selector: "tipe_rekening",
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex items-center text-white">
          <div
            className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1 rounded-l-md cursor-pointer"
            aria-label="details"
            title="Lihat Detail"
            onClick={() => {
              showDetail(row, true);
            }}
          >
            <FontAwesomeIcon icon={faEye} size="sm" />
          </div>
          <div
            className="bg-red-500 hover:bg-red-600 mx-0 px-2 py-1 rounded-r-md cursor-pointer"
            aria-label="details"
            title="hapus"
            onClick={() => {
              deleteData(row);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
          </div>
        </div>
      ),
    },
  ];

  function showDetail(data: any, isUpdate: boolean) {
    if (isUpdate) {
      setModalData(data);
      setIsUpdate(isUpdate);
    } else {
      setModalData(null);
      setIsUpdate(isUpdate);
    }
    setIsModalOpen(true);
  }
  function hideDetails() {
    setModalData("");
    setIsModalOpen(false);
  }
  function deleteData(data: any) {
    let tmp0 : any =  {
      id: data.id,
      isDeleted: "deleted",
    };
    setIsModalOpen(true);
    setModalData(tmp0);
  }
  function getData() {
    let data: any = JSON.parse(localStorage.getItem(localStorageName)!) || [];
    setDataTableExport(data);
    setDataTable(data);
  }
  useEffect(() => {
    let tmpRole: any = JSON.parse(localStorage.getItem("auth")!).group_role;
    setRoleTmp(tmpRole);
    getData();
  }, [localStorage.getItem(localStorageName)!]);

  return (
    <>
      <InputModal
        onClose={hideDetails}
        isOpen={isModalOpen}
        data={modalData}
        isUpdate={isUpdate}
      />
      <BreadCrumb data={item} title={item[item.length - 1]} />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-end my-3">
          {roleTmp === "madrasah" ? (
            <div
              className="bg-blue-500 p-3 rounded-md mr-2 text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={() => {
                showDetail(null, false);
              }}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="main">
          <DataTableExtensions
            exportToXlsx={dataTableExport}
            columns={columns}
            data={dataTableExport}
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
      </div>
    </>
  );
}

export default RekeningBank;
