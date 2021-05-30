import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  DropdownItem,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Dropdown,
  Input,
  ModalFooter,
} from "@windmill/react-ui";
import { default as NumberFormat } from "react-number-format";
import { TreeSelect } from "../../../,,/../../../components/TreeSelect";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
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
    let dataz: any = JSON.parse(localStorage.getItem("kbiaya/dropdown")!) || [];
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

  const Dropdownz = (fdd?: any) => {
    const [hargaSatuan, setHargaSatuan] = React.useState("");
    const [isOpenDropDown, setIsOpenDropdown] = useState(false);
    function toggleDropdown() {
      setIsOpenDropdown(!isOpenDropDown);
    }
    const [isModalOpenPilihHarga, setIsModalOpenPilihHarga] = useState(false);
    function openModal() {
      setIsModalOpenPilihHarga(true);
    }
    function closeModal() {
      setIsModalOpenPilihHarga(false);
    }

    let handleSelected = async (row) => {
      var regex = new RegExp(",", "g");
      let str: any = hargaSatuan.replace("Rp", "").replace(regex, "");
      data.handleLoop0(
        {
          name: "harga_satuan",
          value: hargaSatuan.length > 0 ? str : row.harga,
        },
        data.index
      );
      data.handleLoop0(
        {
          name: "kode_harga",
          value: row.kode_harga || "harga_1",
        },
        data.index
      );
      data.handleLoop0(
        {
          name: "kategori_komponen_biaya_nama",
          value: fdd.nama_kategori,
        },
        data.index
      );

      data.handleLoop0(
        {
          name: "komponen_biaya_harga_id",
          value: fdd.id,
        },
        data.index
      );

      data.handleLoop0(
        {
          name: "komponen_biaya_nama",
          value: fdd.nama,
        },
        data.index
      );
      data.handleLoop0(
        {
          name: "koef1_satuan",
          value: fdd.satuan,
        },
        data.index
      );

      data.handleLoop0(
        {
          name: "koef1_jumlah",
          value: 1,
        },
        data.index
      );

      data.handleLoop0(
        {
          name: "kode_jenis_belanja",
          value: fdd.list_akun_belanja,
        },
        data.index
      );
      data.handleLoop0(
        {
          name: "kode_kategori",
          value: fdd.list_akun_belanja,
        },
        data.index
      );
      onClose();
      hideDetails();
    };
    return (
      <div>
        <div
          className="text-blue-300 hover:bg-yellow-300 mx-0 px-2 py-1 rounded-l-md cursor-pointer"
          aria-label="Edit"
          title="Edit"
          onClick={toggleDropdown}
        >
          Pilih Harga
        </div>
        <Dropdown
          isOpen={isOpenDropDown}
          // data={fdd}
          align="left"
          style={{ zIndex: 99999999, width: "20px", textAlign: "center" }}
          onClose={() => setIsOpenDropdown(false)}
        >
          <DropdownItem
            onClick={() =>
              handleSelected({
                kode_harga: "harga_1",
                harga: fdd.harga_1,
              })
            }
          >
            {fdd.harga_1 === 0 ? (
              <Button size="small" className="w-full" disabled layout="link">
                {fdd.harga_1}{" "}
              </Button>
            ) : (
              <Button size="small" className="w-full" layout="link">
                {fdd.harga_1}{" "}
              </Button>
            )}
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              handleSelected({
                kode_harga: "harga_2",
                harga: fdd.harga_2,
              })
            }
          >
            {fdd.harga_2 === 0 ? (
              <Button size="small" className="w-full" disabled layout="link">
                {fdd.harga_2}{" "}
              </Button>
            ) : (
              <Button size="small" className="w-full" layout="link">
                {fdd.harga_2}{" "}
              </Button>
            )}
          </DropdownItem>

          <DropdownItem
            aria-disabled={true}
            onClick={() =>
              handleSelected({
                kode_harga: "harga_3",
                harga: fdd.harga_3,
              })
            }
          >
            {fdd.harga_3 === 0 ? (
              <Button size="small" className="w-full" disabled layout="link">
                {fdd.harga_3}{" "}
              </Button>
            ) : (
              <Button size="small" className="w-full" layout="link">
                {fdd.harga_3}{" "}
              </Button>
            )}
          </DropdownItem>
          <DropdownItem onClick={openModal}>
            <span>Tetapkan Harga</span>
          </DropdownItem>
        </Dropdown>
        <Modal isOpen={isModalOpenPilihHarga} onClose={closeModal}>
          <ModalHeader>Set Harga</ModalHeader>
          <ModalBody>
            Kategori : {fdd.nama_kategori} <br />
            Nama : {fdd.nama} <br />
            Spesifikasi : {fdd.deskripsi}
            <Label className="mt-4">
              <span>
                <span className="text-red-500">*</span>
                Harga Satuan
              </span>
              <NumberFormat
                thousandSeparator={true}
                prefix={"Rp"}
                mask="."
                customInput={Input}
                onChange={(e) => setHargaSatuan(e.currentTarget.value)}
              />
            </Label>
          </ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              layout="outline"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button onClick={handleSelected} className="w-full sm:w-auto">
              Accept
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };
  const columns: any = [
    {
      name: "Kode",
      selector: "kode_komponen_biaya",
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
    {
      name: "Spesifikasi",
      selector: "spesifikasi",
      sortable: true,
      // list_akun_belanja
      cell: (row) => (
        <span>
          {row.list_akun_belanja ? row.list_akun_belanja.join(",") : ""}
        </span>
      ),
    },
    {
      name: "Action",
      selector: "action",
      width: "150px",
      cell: (row: any) => <div className="relative">{Dropdownz(row)}</div>,
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
    <div style={{ maxHeight: 650, overflowY: "scroll" }}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="w-full px-6 py-4 mx-2  bg-white  dark:bg-gray-800  sm:m-4 xl:max-w-screen-lg lg:max-w-screen-lg  overflow-y-scroll md:max-w-screen-md"
      >
        {/* <ModalHeader>{data ? "Edit" : "Tambah"} Komponen Biaya </ModalHeader> */}
        {/* {data} */}

        <ModalBody>
          {dataTable.length > 0 ? (
            <div>
              <div className=" bg-white shadow-sm rounded-sm">
                <div className="flex flex-col  md:flex-row gap-2 ">
                  <div className="flex-1">
                    <Label>
                      <span className="text-gray-400">
                        Kategori Komponen Biaya
                      </span>
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
              <div className=" bg-white shadow-sm rounded-sm">
                <div>
                  <DataTableExtensions
                    subHeader={columns}
                    columns={columns}
                    data={tableData.length > 0 ? tableData : dataTable}
                  >
                    <DataTable
                      key={"asd"}
                      paginationPerPage={5}
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
            </div>
          ) : (
            "Silahkan sinkronkan data"
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default InputModal;
