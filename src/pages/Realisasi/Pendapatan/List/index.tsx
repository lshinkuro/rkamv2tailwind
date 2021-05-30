import React, { useEffect } from "react";
import { BreadCrumb } from "../../../../components";
import { Badge } from "@windmill/react-ui";
import { Main, LogButton, HeadTable } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faEdit,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import response from "./response";
import InputModal from "./modal";
import ModalRealisasi from "./tanggalrealisasimodal";

function RealisasiKegiatan() {
  const route = useHistory();
  const item = ["Home", "Referensi", "Realisasi Kegiatan", "List"];
  const [isModalRealisasi, setIsModalRealisasi] =
    React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");
  const [dataTable, setDataTable]: any = React.useState<any>([]);
  const [dataTableExport, setDataTableExport] = React.useState<any>([]);
  const [isExpand, setIsExpand] = React.useState<boolean>(false);
  const [isExpandNest, setIsExpandNest] = React.useState<boolean>(false);

  //static percentage
  const percent = 70;

  React.useEffect(() => {
    setDataTable(response);
    setDataTableExport(response);
  }, []);

  function showDetails(data: any) {
    setIsModalOpen(true);
    setModalData(data);
  }
  function showDetail() {
    setIsModalOpen(true);
  }
  function deleteData() {
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
      name: "No Rekening",
      selector: "no_rekening",
      sortable: true,
    },
    {
      name: "Nama Bank",
      selector: "nama_bank",
      sortable: true,
    },
    {
      name: "Keterangan",
      selector: "keterangan",
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
      name: "No Referensi",
      selector: "no_referensi",
      sortable: true,
    },
    {
      name: "Jumlah",
      selector: "jumlah",
      sortable: true,
    },
    {
      name: "Status",
      selector: "activated",
      sortable: true,
      cell: (row) => (
        <div>
          <Badge>row</Badge>{" "}
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
            onClick={showModalRealisasi}
          >
            <FontAwesomeIcon icon={faEye} size="sm" />
          </div>
          <div
            // layout="link"
            className="bg-yellow-300 hover:bg-yellow-400  mx-0 px-2 py-1  cursor-pointer"
            aria-label="details"
            title="Lihat Detail"
            onClick={() => {
              showDetails(row);
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
              deleteData();
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <ModalRealisasi
        onClose={hideModalRealisasi}
        isOpen={isModalRealisasi}
        data
      />
      <BreadCrumb data={item} title="Realisasi Kegiatan" />
      <div className="bg-white mx-5 mt-5 shadow-sm rounded-sm  flex flex-col">
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
          <div className="mt-5 p-5 flex-1 flex justify-between">
            <div className="w-2/6">
              <p>Total Saldo</p>
              <p>Rp 54.000,-</p>
            </div>
            <div className="w-2/6">
              <p>Total Pengeluaran</p>
              <p>Rp 66.000,-</p>
            </div>
            <div className="w-2/6">
              <p>Sisa</p>
              <p>Rp 54.000,-</p>
              <div className="flex items-center">
                <div style={{ position: "relative" }} className="w-full mr-3">
                  <div
                    style={{ height: "8px" }}
                    className="bg-gray-300 w-full rounded-lg"
                  ></div>
                  <div
                    style={{
                      height: "8px",
                      position: "absolute",
                      width: `${percent}%`,
                      top: 0,
                    }}
                    className="bg-blue-500 rounded-lg"
                  ></div>
                </div>
                <div className="text-gray-500 mr-5">{percent}%</div>
              </div>
            </div>
          </div>
        </div>
        {isExpand ? (
          <div className="my-4">
            <div
              className="mt-1 mx-4 h-24 bg-white shadow-sm rounded-sm cursor-pointer flex hover:bg-gray-100 transform hover:scale-y-105"
              onClick={() => setIsExpandNest(!isExpandNest)}
            >
              <div className="w-10 h-full flex items-center justify-center text-gray-500">
                {!isExpandNest ? (
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} size="lg" />
                )}
              </div>
              <div className="mt-5 flex-1 flex justify-between">
                <div className="w-1/4">
                  <p>Kas</p>
                  <p>Tunai</p>
                </div>
                <div className="w-1/4">
                  <p>Total Saldo</p>
                  <p>Rp 54.000,-</p>
                </div>
                <div className="w-1/4">
                  <p>Total Pengeluaran</p>
                  <p>Rp 66.000,-</p>
                </div>
                <div className="w-1/4">
                  <p>Sisa</p>
                  <p>Rp 54.000,-</p>
                  <div className="flex items-center">
                    <div
                      style={{ position: "relative" }}
                      className="w-full mr-3"
                    >
                      <div
                        style={{ height: "8px" }}
                        className="bg-gray-300 w-full rounded-lg"
                      ></div>
                      <div
                        style={{
                          height: "8px",
                          position: "absolute",
                          width: `${percent}%`,
                          top: 0,
                        }}
                        className="bg-blue-500 rounded-lg"
                      ></div>
                    </div>
                    <div className="text-gray-500">{percent}%</div>
                  </div>
                </div>
              </div>
            </div>
            {isExpandNest ? (
              <div>
                <div className="mt-1 mx-4 h-32 bg-white shadow-sm rounded-sm cursor-pointer flex hover:bg-gray-100 transform hover:scale-y-105">
                  <div className="ml-3"></div>
                  <div className="mt-4 mb-4 flex border-b-0 w-full justify-between">
                    <div style={{ width: "25%" }} className="flex items-center">
                      <p>APBN - BOS</p>
                    </div>
                    <div
                      className="flex flex-col justify-between"
                      style={{ width: "40%" }}
                    >
                      <div className="flex justify-between w-2/3">
                        <div className="">
                          <p>Pendapatan</p>
                          <p>Rp 54.000,-</p>
                        </div>
                        <div className="">
                          <p>Pengeluaran</p>
                          <p>Rp 66.000,-</p>
                        </div>
                        <div className="">
                          <p>Sisa</p>
                          <p>Rp 54.000,-</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div
                          style={{ position: "relative" }}
                          className="w-full mr-3"
                        >
                          <div
                            style={{ height: "8px" }}
                            className="bg-gray-300 w-full rounded-lg"
                          ></div>
                          <div
                            style={{
                              height: "8px",
                              position: "absolute",
                              width: `${percent}%`,
                              top: 0,
                            }}
                            className="bg-blue-500 rounded-lg"
                          ></div>
                        </div>
                        <div className="text-gray-500">{percent}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* <div className="mt-1 mx-4 h-24 bg-white shadow-md rounded-sm cursor-pointer flex hover:bg-gray-100 transform hover:scale-y-105">
              <div className="w-10 h-full flex items-center justify-center text-gray-500">
                <FontAwesomeIcon icon={faAngleRight} size="lg" />
              </div>
              <div className="mt-5 flex-1 flex justify-between">
                <div className="w-1/4">
                  <p>Kas</p>
                  <p>Tunai</p>
                </div>
                <div className="w-1/4">
                  <p>Total Saldo</p>
                  <p>Rp 54.000,-</p>
                </div>
                <div className="w-1/4">
                  <p>Total Pengeluaran</p>
                  <p>Rp 66.000,-</p>
                </div>
                <div className="w-1/4">
                  <p>Sisa</p>
                  <p>Rp 54.000,-</p>
                </div>
              </div>
            </div> */}
          </div>
        ) : null}
      </div>
      <Main>
        <HeadTable>
          <LogButton onClick={showDetail}>Tambah</LogButton>
          <LogButton
            onClick={() => {
              route.push("logs");
            }}
            style={{ backgroundColor: "#e02424" }}
          >
            Logs
          </LogButton>
        </HeadTable>
        <div className="main">
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

export default RealisasiKegiatan;
