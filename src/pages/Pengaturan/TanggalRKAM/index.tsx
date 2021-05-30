import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../../components";
import { Badge } from "@windmill/react-ui";
import InputModal from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faPlus,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import {useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>("");
  const [kodeRole, setKodeRole] = useState<any>("");

  const route = useHistory();

  const [dataTable, setDataTable] = useState<any>([]);
  let patenam: any = "rencana-tanggal";

  useEffect(() => {
    let tmpAuth: any = JSON.parse(localStorage.getItem("auth")!);
    let datas: any = JSON.parse(localStorage.getItem(patenam)!) || [];
    setKodeRole(tmpAuth.kode_role);
    setDataTable(datas);
  }, [localStorage.getItem(patenam)!]);

  function showDetails(data: any) {
    for (const element of [data]) {
      element.isDeleted = "";
    }
    setIsModalOpen(true);
    setModalData(data);
  }
  function showDetail() {
    setIsModalOpen(true);
  }

  function hideDetails() {
    setModalData("");
    setIsModalOpen(false);
  }
  function deleteData(data: any) {
    for (const element of [data]) {
      element.isDeleted = "deleted";
    }
    setIsModalOpen(true);
    setModalData(data);
  }

  const status = (sts: number) => {
    if (sts === 1) {
      return "active";
    } else if (sts === 0) {
      return "Inactive";
    }
  };
  const color = (sts: number) => {
    if (sts === 1) {
      return "success";
    } else if (sts === 0) {
      return "warning";
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const columns = [
    {
      name: "Tahapan",
      selector: "kode_jenis_tahapan",
      sortable: true,
      cell: (row) => (
        <div>
          {capitalizeFirstLetter(row.kode_jenis_tahapan)}
        </div>
      ),
    },
    {
      name: "Tanggal Mulai",
      selector: "start_date",
      sortable: true,
      cell: (row) => (
        <div>
          <div title={row.start_date.slice(11,19)}>{row.start_date.slice(0,10)}</div>
        </div>
      ),
    },
    {
      name: "Tanggal Selesai",
      selector: "end_date",
      sortable: true,

      cell: (row) => (
        <div>
          <div title={row.end_date.slice(11,19)}>{row.end_date.slice(0,10)}</div>
        </div>
      ),
    },
    {
      name: "Keterangan",
      selector: "keterangan",
      sortable: true,
    },
    {
      name: "Status",
      selector: "activated",
      sortable: true,
      cell: (row) => (
        <div>
          <Badge type={color(row.activated)}>
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
            className="bg-yellow-300 hover:bg-yellow-700 mx-0 px-2 py-1 rounded-l-md cursor-pointer"
            aria-label="Edit"
            title="Edit"
            onClick={() => {
              showDetails(row);
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="sm" />
          </div>
          {row.activated === "1" ? (
            <div
              // layout="link"
              className="bg-red-600 hover:bg-red-700 mx-0 px-2 py-1 rounded-r-md cursor-pointer"
              aria-label="details"
              title="non-Aktifkan"
              onClick={() => {
                deleteData(row);
              }}
            >
              <FontAwesomeIcon icon={faPowerOff} size="sm" />
            </div>
          ) : (
            <div
              // layout="link"
              className="bg-green-500 hover:bg-green-600 mx-0 px-2 py-1 rounded-r-md cursor-pointer"
              aria-label="details"
              title="Aktifkan"
              onClick={() => {
                deleteData(row);
              }}
            >
              <FontAwesomeIcon icon={faPowerOff} size="sm" />
            </div>
          )}
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
  const item = ["Home", "Pengaturan", "Tanggal RKAM"];
  return (
    <>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title="Pendapatan" />
      <div className="m-5 p-5 bg-white shadow-md ">
        {kodeRole === "admin_kabkota" ? (
          <div className="flex flex-row justify-end my-3">
            <div
              title="Tambah Pendapatan"
              className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={showDetail}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </div>
          </div>
        ) : (
          ""
        )}
        {dataTable.length > 0 ? (
          <DataTableExtensions
            subHeader={columns}
            columns={columns}
            data={dataTable}
          >
            <DataTable
              key={"asd"}
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
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Index;
