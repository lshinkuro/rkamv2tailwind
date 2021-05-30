import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../../components";
import { Badge } from "@windmill/react-ui";
import InputModal from "./modal";
import { useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faPlus,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>("");
  const [roleTmp, setRoleTmp] = useState<any>("");
  // setup data for every table
  const [dataTable, setDataTable] = useState<any>([]);
  const [dataTableExport, setDataTableExport] = useState<any>([]);
  const pathName = useLocation().pathname;
  let patenam: any = pathName.split("/").pop();
  useEffect(() => {
    let tmpRole: any = JSON.parse(localStorage.getItem("auth")!).group_role;
    setRoleTmp(tmpRole);
    setDataTableExport(JSON.parse(localStorage.getItem(patenam)!));
    setDataTable(JSON.parse(localStorage.getItem(patenam)!));
  }, [localStorage.getItem(patenam)!]);

  function showDetails(data: any) {
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
    let tmp0: any = [];
    tmp0.push({
      id: data.id,
      nama: data.nama,
      tahun: data.tahun,
      aktif: data.activated,
      isDeleted: "deleted",
    });
    setIsModalOpen(true);
    setModalData(tmp0[0]);
    localStorage.getItem("pagu-indikatif");
  }

  const item = ["Home", "Rencana", "Pagu Indikatif"];

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
      // className: "bg-blue-500 max-w-full",
    },
    // cells: {
    //   style: {
    //     // paddingLeft: "0 8px",
    //   },
    // },
  };

  const columnsExport = [
    {
      name: "Tahun",
      selector: "tahun",
      sortable: true,
    },
    {
      name: "Nama Sekolah",
      selector: "nama_sekolah",
      sortable: true,
    },
    {
      name: "Nilai Pagu",
      selector: "nilai_pagu",
      sortable: true,
    },
  ];
  const columns = [
    {
      name: "Tahun",
      selector: "tahun",
      sortable: true,
    },
    {
      name: "Nama Sekolah",
      selector: "nama_sekolah",
      sortable: true,
    },
    {
      name: "Nilai Pagu",
      selector: "nilai_pagu",
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
              title="non-aktifkan"
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
              title="aktifkan"
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

  const status = (sts: number) => {
    if (sts === 1) {
      return "active";
    } else if (sts === 0) {
      return "inactive";
    }
  };
  const color = (sts: number) => {
    if (sts === 1) {
      return "success";
    } else if (sts === 0) {
      return "warning";
    }
  };
  return (
    <>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title={"Pagu Indikatif"} />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-end my-3">
          {roleTmp !== "madrasah" ? (
            <div
              className="bg-blue-500 p-3 rounded-md mr-2 text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={showDetail}
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

export default Index;
