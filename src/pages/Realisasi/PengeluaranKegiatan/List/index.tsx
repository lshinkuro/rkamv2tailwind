import React, { useEffect } from "react";
import { BreadCrumb } from "../../../../components";
import { Badge, Select, Modal } from "@windmill/react-ui";
import { Main, LogButton, HeadTable } from './style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css"
import response from './response';
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";
import ModalRealisasi from "./tanggalrealisasimodal";







function PengeluaranMadrasah() {
  const route = useHistory()
  const item = ["Home", "Referensi", "Pengeluaran Madrasah", "List"];
  const [dataTable, setDataTable]: any = React.useState<any>([]);
  const [dataTableExport, setDataTableExport] = React.useState<any>([]);
  const [isModalRealisasi, setIsModalRealisasi] = React.useState<boolean>(
    false
  );
  const [isShown, setIsShown] = React.useState(false)
  const [idRow, setIdRow] = React.useState<any>("");


  React.useEffect(() => {
    setDataTable(response)
    setDataTableExport(response)
  }, [])

  function showModalRealisasi() {
    setIsModalRealisasi(true);
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


  const columns = [
    {
      name: "No Nota",
      selector: "no_nota",
      sortable: true,
    },
    {
      name: "Sumber Dana",
      selector: "sumber_dana",
      sortable: true,
    },
    {
      name: "Tipe Kas",
      selector: "tipe_kas",
      sortable: true,
    },
    {
      name: "Keterangan",
      selector: "keterangan",
      sortable: true,
    },
    {
      name: "Sub Total Pajak",
      selector: "sub_total_pajak",
      sortable: true,
    },
    {
      name: "Pajak Terutang",
      selector: "pajak_terutang",
      sortable: true,
    },
    {
      name: "Total",
      selector: "total",
      sortable: true,
    },
    {
      name: "Tanggal Nota",
      selector: "tanggal_nota",
      sortable: true,
    },
    {
      name: "Tanggal Realisasi",
      selector: "tanggal_realisasi",
      sortable: true,
    },
    {
      name: "Status",
      selector: "activated",
      sortable: true,
      cell: (row) => (
        <div>
          <Badge >
            row
          </Badge>{" "}
        </div>
      ),
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex  flex-col justify-end text-white z-0" onMouseOver={() => { setIsShown(true); setIdRow(row.id) }} onMouseLeave={() => { setIsShown(false) }}>
          <div
            className="bg-blue-500 p-2  flex-1 text-white cursor-pointer hover:bg-blue-700 flex   z-0"
            onClick={() => { setIsShown(true); setIdRow(row.id) }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleDown} />

          </div>
          {
            isShown && row.id === idRow ? (
              <>
                <div className="bg-white shadow-sm z-40 flex-1" style={{ position: 'fixed', zIndex: 1,right:50}}>
                  <LogButton onClick={showModalRealisasi}>Tanggal Realisasi</LogButton>
                  <LogButton onClick={showModalRealisasi}>Lihat</LogButton>
                  <LogButton onClick={()=>{ route.push('edit/id')}}>Edit</LogButton>
                  <LogButton onClick={()=>{}}>Hapus</LogButton>
                </div>
              </>
            ) :
              null
          }

        </div>
      ),
    },
  ];



  return (
    <>
      <ModalRealisasi
        onClose={hideModalRealisasi}
        isOpen={isModalRealisasi}
        data
      />
      <BreadCrumb data={item} title="Pengeluaran Madrasah" />
      <Main>
        <HeadTable>
          <HeadTable>
            <LogButton onClick={() => { route.push('add') }} >
              Tambah
          </LogButton>
            <LogButton onClick={() => { route.push('logs') }} style={{ backgroundColor: "#e02424" }}>
              Logs
          </LogButton>
          </HeadTable>
        </HeadTable>
        <div className="main z-0">
          <DataTableExtensions
            exportToXlsx={dataTableExport}
            columns={columns}
            data={dataTableExport}
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
              highlightOnHover
              customStyles={customStyles}

            />
          </DataTableExtensions>
        </div>
      </Main>
    </>
  );
}

export default PengeluaranMadrasah;


