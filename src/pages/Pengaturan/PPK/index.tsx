import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router";
import { BreadCrumb } from "../../../components";
import * as pV2Service from "../../../services/v2/pengaturan/levelPPK";

const PPK = () => {
  const item = ["Home", "Pengaturan", "PPK"];
  const [dataTable, setDataTable]: any = React.useState([]);
  //   const [tableRefresh, setTableRefresh] = React.useState<any>(0);

  let route = useHistory();

  React.useEffect(() => {
    const tmp0 = JSON.parse(localStorage.getItem("auth")!);
    // console.log(tmp0.kantor_kabkota?.kode_kabkota)
    // setUserRole(tmp0.kode_role);
    generateTableData(tmp0.kantor_kabkota?.kode_kabkota);
  }, []);

  const generateTableData = (p) => {
    pV2Service.getMadrasah(p)?.then((res) => {
      setDataTable(res);
      console.log(res)
    });
  };

  const columns: any = [
    {
      name: "NSM",
      selector: "nsm",
      sortable: true,
      subHeader: true,
    },
    {
      name: "NPSN",
      selector: "npsn",
      sortable: true,
    },
    {
      name: "Nama Madrasah",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Jenjang",
      selector: "jenjang",
      sortable: true,
    },
    {
      name: "Alamat",
      selector: "alamat_jalan",
      sortable: true,
    },
    {
      name: "RT",
      selector: "rt",
      sortable: true,
    },
    {
      name: "RW",
      selector: "rw",
      sortable: true,
    },
    {
      name: "Level PPK",
      //   selector: "kode_level_ppk",
      sortable: true,
      cell: (row) => {
        if (row.kode_level_ppk === "kankemenag") {
          return "Kankemenag";
        } else if (row.kode_level_ppk === "madrasah") {
          return "Madrasah";
        } else if (row.kode_level_ppk === "kanwil") {
            return "Kanwil"
        } else {
            return "kosong"
        }
      },
    },
    {
      name: "Action",
      selector: "action",
      width: "80px",
      cell: (row) => (
        <div className="flex items-center text-white">
          <div
            // layout="link"
            className="bg-yellow-300 hover:bg-yellow-700 mx-0 px-2 py-1 rounded-md cursor-pointer"
            aria-label="Edit"
            title="Edit"
            onClick={() => {
              route.push(`/pengaturan/ppk/set-ppk/${row.id}`);
            }}
          >
            <FontAwesomeIcon icon={faUserCog} size="sm" />
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

  return (
    <>
      <BreadCrumb data={item} title="Pejabat Pembuat Komitmen" />
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        {/* <DataTableExtensions
          subHeader={columns}
          columns={columns}
          data={dataTable}
        > */}
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
        {/* </DataTableExtensions> */}
      </div>
    </>
  );
};

export default PPK;
