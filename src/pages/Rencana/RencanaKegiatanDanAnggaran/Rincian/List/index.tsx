import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../../../../components";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";
import { Main, LogButton, HeadTable } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import response from "./response";
import routes from "../../../../../routes";
import RencanaRincianModal from "./rencanaRincianModal";
import * as pService from "../../../../../services/v2/planningservice/index";
import Headerz from "../header";
function ListRincianKegiatanDanAnggaran() {
  const route = useHistory();
  const item = ["Home", "Rencana Kerja Dan Anggaran", "Rincian", "List"];
  const [isModalRealisasi, setIsModalRealisasi] =
    React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");
  const [dataTable, setDataTable]: any = React.useState<any>([]);
  const location = useLocation();
  let patenam: any = location.pathname.split("rincian/").pop();
  let patanam: any = patenam.split("/list");
  const passing: any = location.state;
  //static percentage
  const percent = 70;

  React.useEffect(() => {
    let kRRincian: any =
      JSON.parse(localStorage.getItem("rencana/rincian")!) || [];
    let tmpData = kRRincian.filter((obj: any) => {
      return obj.rencana_kegiatan_id === passing.id;
    });
    setDataTable(tmpData);
  }, []);

  function showDetails(data: any) {
    setIsModalOpen(true);
    setModalData(data);
  }
  function showDetail() {
    setIsModalOpen(true);
  }
  function openModal() {
    let tmp0: any = [];
    tmp0.push({
      isDeleted: "deleted",
    });
    setIsModalOpen(true);
    setModalData(tmp0[0]);
  }

  function hideDetails() {
    setModalData("");
    setIsModalOpen(false);
  }

  function showModalRealisasi(data: any) {
    data.status = "edit";
    setIsModalRealisasi(true);
    setModalData(data);
  }

  function hideModalRealisasi() {
    setIsModalRealisasi((prev) => !prev);
  }

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
        // paddingLeft: "0 8px",
        color: "white",
      },
    },
  };

  const status = (sts: Number) => {
    if (sts === 1) {
      return "Aktif";
    } else if (sts === 0) {
      return "Tidak Aktif";
    }
  };
  const color = (sts: number) => {
    if (sts === 1) {
      return "success";
    } else if (sts === 0) {
      return "warning";
    }
  };

  const columns = [
    {
      name: "Pendapatan",
      selector: "rencana_pendapatan_nama",
      sortable: true,
    },
    {
      name: "Jenis Belanja",
      selector: "jenis_belanja_nama",
      sortable: true,
    },
    {
      name: "Kategori Komponen Biaya",
      selector: "kategori_komponen_biaya_nama",
      sortable: true,
    },
    {
      name: "Satuan",
      selector: "koef1_satuan",
      sortable: true,
    },
    {
      name: "Harga Satuan",
      selector: "harga_satuan",
      sortable: true,
    },
    {
      name: "Pajak",
      selector: "pajak",
      sortable: true,
    },
    {
      name: "Kuantitas",
      selector: "total_kuantitas",
      sortable: true,
    },
    {
      name: "Total Harga",
      selector: "total_rencana_belanja",
      sortable: true,
    },
    {
      name: "Status",
      selector: "activated",
      sortable: true,
      cell: (row) => (
        <div>
          <Badge type={color(Number(row.activated))}>
            {status(Number(row.activated))}
          </Badge>{" "}
        </div>
      ),
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex items-center text-white">
          <div
            // layout="link"
            className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1 rounded-l-md cursor-pointer"
            aria-label="details"
            title="Lihat Detail"
            onClick={() => showModalRealisasi(row)}
          >
            <FontAwesomeIcon icon={faEye} size="sm" />
          </div>
          <div
            // layout="link"
            className="bg-yellow-300 hover:bg-yellow-400  mx-0 px-2 py-1  cursor-pointer"
            aria-label="edit"
            title="Edit"
            onClick={() => {
              route.push({
                pathname: `add/${row.id}`,
                state: { passing: passing, row: row, status: "edit" },
              });
            }}
          >
            <FontAwesomeIcon icon={faEdit} size="sm" />
          </div>
          <div
            // layout="link"
            className="bg-red-500 hover:bg-red-600 mx-0 px-2 py-1 rounded-r-md cursor-pointer"
            aria-label="details"
            title="hapus"
            onClick={() => {
              openModalDel(row);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
          </div>
        </div>
      ),
    },
  ];

  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const [modalDataDel, setIsModalDataDel] = useState("");
  function openModalDel(data?: any) {
    setIsModalOpenDel(true);
    setIsModalDataDel(data);
  }
  const okDel = async (row?: any) => {
    await pService.saveOffline(
      row,
      "rencana-rincian-kegiatan",
      "hapus",
      "rencana/rincian"
    );
    closeModalDel();
  };
  function closeModalDel() {
    setIsModalOpenDel(false);
  }

  return (
    <>
      <RencanaRincianModal
        onClose={hideModalRealisasi}
        isOpen={isModalRealisasi}
        data={modalData}
      />
      <BreadCrumb data={item} title="Rincian Kegiatan" />
      <Headerz passing={passing} />
      <Main>
        <HeadTable>
          <LogButton
            onClick={() => {
              // route.push("add");
              passing.status = "tambah";
              route.push({
                pathname: "add",
                // state: [passing: passing, statusa: "asd"]
                state: { passing: passing, status: "tambah" },
              });
            }}
          >
            Tambah
          </LogButton>
          <LogButton
            onClick={() => {
              route.push("logs");
            }}
            style={{ backgroundColor: "#e02424" }}
          >
            Logs
          </LogButton>
        </HeadTable>
        <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md w-full">
          <DataTableExtensions
            // exportToXlsx={dataTableExport}
            columns={columns}
            data={dataTable}
            overflowX={true}
          >
            <DataTable
              selectableRows
              columns={columns}
              data={dataTable}
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              paginationPerPage={5}
              highlightOnHover
              customStyles={customStyles}
            />
          </DataTableExtensions>
        </div>
      </Main>
      {/* <div>
        <Button onClick={openModalDel}>Open modal</Button>
      </div> */}
      <Modal
        isOpen={isModalOpenDel}
        // data={modalDataDel}
        onClose={closeModalDel}
      >
        <ModalHeader>Hapus Data</ModalHeader>
        <ModalBody>
          Yakin Hapus Data?
          {/* {JSON.stringify(modalDataDel)} */}
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            layout="outline"
            onClick={closeModalDel}
          >
            Batal
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              okDel(modalDataDel);
            }}
          >
            Simpan
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ListRincianKegiatanDanAnggaran;
