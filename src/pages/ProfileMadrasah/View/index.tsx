import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { Button, Select, Label, Input, Card } from "@windmill/react-ui";
import { useHistory } from "react-router-dom";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

const ProfilMadrasah = () => {
  const item = ["Profil"];
  const history = useHistory();
  const [dataTable, setDataTable] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [dataMadrasah, setDataMadrasah] = useState<any>([]);
  const rekbank: string = "pengaturan/rekening-bank";
  const [provinsi, setProvinsi] = useState<any>([])
  const [kabupaten, setKabupaten] = useState<any>([])

  function getData() {
    let data: any = JSON.parse(localStorage.getItem(rekbank)!) || [];
    let data2: any = JSON.parse(localStorage.getItem("madrasah")!) || [];
    let data3: any = JSON.parse(localStorage.getItem("profile-madrasah")!) || [];
    let dataprovinsi: any = JSON.parse(localStorage.getItem("provdropdown")!) || [];
    let datakabupaten: any = JSON.parse(localStorage.getItem("kabkotadropdown")!) || [];
    setProvinsi(dataprovinsi);
    setKabupaten(datakabupaten);
    setDataTable(data);
    setDataUser(data2);
    setDataMadrasah(data3[0]);
    console.log(data3[0])
  }
  useEffect(() => {
    // let tmpRole: any = JSON.parse(localStorage.getItem("auth")!).group_role;
    getData();
  }, [localStorage.getItem(rekbank)!]);

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
  ];

  const columnsUser = [
    {
      name: "Nama",
      selector: "profile.nama",
      sortable: true,
    },
    {
      name: "Nik",
      selector: "profile.nik",
      sortable: true,
    },
    {
      name: "Email",
      selector: "profile.user.email",
      sortable: true,
    },
    {
      name: "Role",
      selector: "role.nama",
      sortable: true,
    },
  ];
  return (
    <>
      <BreadCrumb data={item} title="Profil Madrasah" />
      <div>
        <div className="flex flex-col  m-2 mx-4  mb-20 bg-white rounded-sm shadow-md">
          <div className="flex-1  bg-blue-500  flex-col justify-end mb-3 p-6">
            {/* <Button
              onClick={() => {
                history.push("/profile-madrasah/edit");
              }}
            >
              Edit
            </Button> */}
          </div>
          {/* <hr className="mb-3" /> */}
          <div className="flex-1 flex flex-col md:flex-row p-4   divide-green-500 ">
            <div className="flex-1 gap-y-3">
              <h2 className="my-4 text-xl font-sans font-semibold text-gray-600">
                Data
              </h2>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">NSM</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.nsm : '-'}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">NPSN</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.npsn : '-'}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Nama Lembaga</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">
                    {dataMadrasah ? dataMadrasah.nama : '-'}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Status</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.status === 'n' && 'Negeri' || dataMadrasah.madrasah === 's' && 'Swasta' : '-'}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Jenjang</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.jenjang === 'mi' && 'Madrasah Ibtidaiyah' || dataMadrasah.jenjang === 'mts' && 'Madrasah Tsanawiyah' || dataMadrasah.jenjang === 'mts' && 'Madrasah Aliyah' : '-'}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 gap-y-3">
              <h2 className="my-4 text-lg font-sans font-semibold text-gray-600">
                Alamat
              </h2>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Provinsi</p>
                </div>
                <div className="flex-1">
                  {provinsi
                    ? provinsi.map((idz: any, key: any) =>
                      dataMadrasah.kode_provinsi === idz.kode && (

                        <p key={idz.kode} className=" text-gray-600 text-sm" >
                          {idz.nama}
                        </p>
                      ))
                    : ""}
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Kabkota</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">
                    {kabupaten
                      ? kabupaten.map((idz: any, key: any) =>
                        dataMadrasah.kode_kabkota === idz.kode && (

                          <p key={idz.kode} >
                            {idz.nama}
                          </p>
                        ))
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Kelurahan</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm "></p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Kodepos</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.kode_pos : '-'}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">No Telp</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.telp : '-'}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Rt</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.rt : '-'}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Rw</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.rw : '-'}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Alamat</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.alamat_jalan : '-'}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Email</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">{dataMadrasah ? dataMadrasah.email : '-'}</p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm ">Website</p>
                </div>
                <div className="flex-1">
                  <p className="  text-gray-600 text-sm "> {dataMadrasah ? dataMadrasah.website : '-'}</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-3" />
          <div className="flex-1 bg-white-600 mb-8">
            <div className="flex flex-col p-2 mx-4 border-gray-600  ">
              <div className="w-auto">
                {/* <Label>
                  <span className="text-gray-600 text-sm  ">
                    Kepala Sekolah *
                  </span>
                  <Select className="mt-1">
                    <option>Untung Sp</option>
                    <option>Untung Sp</option>
                  </Select>
                </Label>
                <Label>
                  <span className="text-gray-600 text-sm ">
                    Bendahara Madrasah*
                  </span>
                  <Select className="mt-1">
                    <option>Renato</option>
                    <option>biya Sp</option>
                  </Select>
                </Label> */}
                <Label>
                  <span className="text-gray-600 text-sm ">Ketua Komite*</span>
                  <div className="flex">
                    <div className="flex-1">Nama : </div>
                    <div className="flex-1">Nik :</div>
                    <div className="flex-1"></div>
                  </div>
                </Label>
              </div>
            </div>
          </div>
        </div>





        
        <Card className="flex flex-col bg-white m-2 mx-4 rounded-sm shadow-md mb-20">
          <div className="m-5">
            <DataTableExtensions columns={columns} data={dataTable}>
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
          <div className="m-5">
            <DataTableExtensions columns={columnsUser} data={dataUser}>
              <DataTable
                columns={columnsUser}
                data={dataUser}
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
                customStyles={customStyles}
              />
            </DataTableExtensions>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProfilMadrasah;
