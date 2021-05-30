import React from "react";
import { BreadCrumb } from "../../../components";
import { Badge, Label, Select } from "@windmill/react-ui";
import InputModal from "./inputmodal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TreeSelect } from "../../../components/TreeSelect";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css"
import { useHistory } from "react-router-dom";

function Snp() {
  const item = ["Home", "Referensi", "Komponen Biaya"];
  const refProvinsi: { kode: string; nama: string }[] = JSON.parse(
    localStorage.getItem("provdropdown")!
  );
  const refKabkota: {
    kode: string;
    nama: string;
    kode_provinsi: string;
  }[] = JSON.parse(localStorage.getItem("kabkotadropdown")!);
  const [selectedProvinsi, setSelectedProvinsi] = React.useState(
    refProvinsi[0].kode || []
  );
  const [selectedKabkota, setSelectedKabkota] = React.useState("");
  const [DataKatKom, setDataKatKom] = React.useState([]);
  const [DataJenisBel, setDataJenisBel] = React.useState([]);
  const [dataTable, setDataTable]: any = React.useState([]);
  const [tableData, setTableData]: any = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");
  const [tableRefresh, setTableRefresh] = React.useState<any>(0);
  const [userRole, setUserRole] = React.useState<any>(null);
  const [KomponenBiaya, setKomponenBiaya] = React.useState({
    show: "",
    value: "",
  });
  const [ShowKategoriJenisBiaya, setShowKategoriJenisBiaya] = React.useState({
    show: "",
    value: "",
  });
  const route = useHistory();

  // setup data for every table
  const getDataService = async () => {
    try {
      const jenis =
        (await JSON.parse(localStorage.getItem("komponenbiaya/jenis")!)) || [];
      setDataJenisBel(
        jenis.map((el: any) => {
          el.child = el.list_jenis_belanja;
          delete el.list_jenis_belanja;
          return el;
        })
      );
      setDataKatKom(
        JSON.parse(localStorage.getItem("komponenbiaya/kategori")!) || []
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  const generateTableData = async () => {
    let dataz: any = JSON.parse(localStorage.getItem("komponen-biaya")!) || [];
    setDataTable(dataz);
  };

  React.useEffect(() => {
    const tmp0 = JSON.parse(localStorage.getItem("auth")!);
    setUserRole(tmp0.kode_role);
    generateTableData();
    getDataService();
  }, [tableRefresh]);

  function showDetail() {
    setIsModalOpen(true);
  }

  function editKomponen(params: any) {
    setIsModalOpen(true);
    setModalData(params);
  }

  function hideDetails() {
    setTableRefresh(tableRefresh + 1);
    setModalData("");
    setIsModalOpen(false);
  }

  const handleKomponenBiaya = (val: any) => {
    setKomponenBiaya(val);
    let tmp1 = dataTable.filter((obj: any) => {
      return obj.kode_kategori === val.value;
    });
    setTableData(tmp1);
  };

  const handleJenisBelanja = (val: any) => {
    const tm0: any = [];
    setShowKategoriJenisBiaya(val);

    let tmp1 = dataTable.filter((obj: any) => {
      return JSON.stringify(obj.jenis_belanja).includes(val.value);
    });
    setTableData(tmp1);
    console.log(val);
  };

  const columns: any = [
    {
      name: "Kode",
      selector: "kode",
      sortable: true,
      subHeader: true,
    },
    {
      name: "Kategori",
      selector: "nama_kategori",
      sortable: true,
    },
    {
      name: "Nama",
      selector: "nama",
      sortable: true,
    },
    // {
    //   name: "Spesifikasi",
    //   selector: "spesifikasi",
    //   sortable: true,
    // },

    {
      name: "Jenis belanja",
      selector: "jenis_belanja",
      sortable: true,
      cell: (row) => (
        <span>
          {row.jenis_belanja.map((e) => {
            return (
              <Badge key={e} type="primary" className="mr-1">
                {e}
              </Badge>
            );
          })}
        </span>
      ),
    },
    {
      name: "Action",
      selector: "action",
      width: "150px",
      cell: (row) => (
        <div className="flex items-center text-white">
          <div
            // layout="link"
            className="bg-yellow-300 hover:bg-yellow-700 mx-0 px-2 py-1  cursor-pointer"
            aria-label="Edit"
            title="Edit"
            onClick={() => {
              editKomponen(row);
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="sm" />
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
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title="Komponen Biaya" />
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-col  md:flex-row gap-2 ">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Provinsi</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Provinsi"
                defaultValue={refProvinsi[0].kode}
                onChange={(e: any) => {
                  setSelectedProvinsi(e.currentTarget.value);
                }}
              >
                {refProvinsi.map((el) => {
                  return (
                    <option key={el.kode} value={el.kode}>
                      {el.nama}
                    </option>
                  );
                })}
              </Select>
            </Label>
          </div>
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Kab/Kota</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Kab/Kota"
              >
                {refKabkota.map((el) => {
                  if (el.kode_provinsi === selectedProvinsi)
                    return (
                      <option key={el.kode} value={el.kode}>
                        {el.nama}
                      </option>
                    );
                })}
              </Select>
            </Label>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row gap-2 ">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Kategori Komponen Biaya</span>
              <TreeSelect
                data={DataKatKom}
                getValue={handleKomponenBiaya}
                defaultValue={KomponenBiaya.show}
                placeholder="Kategori Komponen Biaya"
              />
            </Label>
          </div>
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">
                Jenis belanja <span className="text-red-500">*</span>
              </span>
              <TreeSelect
                data={DataJenisBel}
                getValue={handleJenisBelanja}
                defaultValue={ShowKategoriJenisBiaya.show}
                placeholder="Kategori Komponen Biaya"
              />
            </Label>
          </div>
        </div>
      </div>
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-row justify-end my-3 space-x-2">
          <div
            onClick={showDetail}
            className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-3 "
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div
            onClick={() => {
              route.push({
                pathname: "/referensi/komponen-biaya/set-harga",
              });
            }}
            className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-3 "
          >
            Set harga
            <FontAwesomeIcon className="ml-2" icon={faPencilAlt} />
          </div>
        </div>
        <div>
          <DataTableExtensions
            subHeader={columns}
            columns={columns}
            data={tableData.length > 0 ? tableData : dataTable}
          >
            <DataTable
              key={"asd"}
              subHeader={false}
              columns={columns}
              data={tableData.length > 0 ? tableData : dataTable}
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

export default Snp;
