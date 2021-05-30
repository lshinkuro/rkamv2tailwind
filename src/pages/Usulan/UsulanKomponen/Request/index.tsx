import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Select,
} from "@windmill/react-ui";
import {
  getKatKomBiaya,
  getKatJenisBelanja,
} from "../../../../services/v2/referenceservice/komponenbiaya";
import { TreeSelect } from "../../../../components/TreeSelect";
import * as rService from "../../../../services/reference";
import { useHistory } from "react-router";
import * as uServices from "../../../../services/v2/planningservice/usulanservice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BreadCrumb } from "../../../../components";
import SectionTitle from "../../../../components/Typography/SectionTitle";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};
const tm0: any = [];

const InputModal: any = ({ isOpen, onClose, data }) => {
  const [DataKatKom, setDataKatKom] = useState([]);
  const [DataJenisBel, setDataJenisBel] = useState([]);
  const [KomponenBiaya, setKomponenBiaya] = useState({ show: "", value: "" });
  const [ShowKategoriJenisBiaya, setShowKategoriJenisBiaya] = useState("");
  const [Nama, setNama] = useState("");
  const [Spesifikasi, setSpesifikasi] = useState("");
  const [kodeKomponenBiaya, setKodeKomponenBiaya] = useState("");
  const [satuan, setSatuan] = useState("");
  const [Deskripsi, setDeskripsi] = useState("");
  const [Activated, setActivated] = useState(0);
  const [kabKota, setKabKota] = useState<any>([]);
  const [satuanOption, setSatuanOption] = useState<any>([]);
  const [logErr, setLogErr] = useState<any>("");
  const [checkVal, setcheckVal] = useState<any>("");
  const route = useHistory();
  const [UsulanKomponen, setUsulanKomponen] = useState([
    { usulan_komponen: "" },
  ]);
  const getDataService = async () => {
    try {
      setDataJenisBel(JSON.parse(localStorage.getItem("komponenbiaya/jenis")!) || []);
      setDataKatKom(JSON.parse(localStorage.getItem("komponenbiaya/kategori")!) || []);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    setSatuanOption(JSON.parse(localStorage.getItem("satuan")!));
    getDataService();
    // setProv(provDOption[0].kode)
  }, []);

  const handleKomponenBiaya = (val: any) => {
    setKomponenBiaya(val);
  };

  const handleJenisBelanja = (val: any) => {
    let gas: boolean = true;
    tm0.map((e, i) => {
      if (e.value === val.value) {
        tm0.splice(i, 1);
        gas = false;
      }
    });
    if (gas) {
      tm0.push(val);
    }
    setShowKategoriJenisBiaya(tm0.map((e) => e.show));
    setcheckVal(tm0.map((e) => e.value));
  };
  const handlePost = async () => {
    let jenis_belanja: any = [];
    tm0.map((e, i) => {
      jenis_belanja[i] = e.value;
    });
    let uKomponen: any = [];
    UsulanKomponen.map((e, i) => {
      uKomponen[i] = e.usulan_komponen;
    });
    let tmp0: any = {
      tipe_usulan: 3,
      tahun: 2021,
      usulan: {
        nama: Nama,
        usulan_komponen: uKomponen,
        kategori_komponen_biaya: KomponenBiaya.value,
        harga: Spesifikasi,
        satuan: satuan,
        deskripsi: Deskripsi,
        jenis_belanja,
        tahun: 2021,
        kode: kodeKomponenBiaya,
        no_tiket:
          localStorage.getItem("usulanSubKegiatan") !== null
            ? localStorage.getItem("usulanSubKegiatan")!.length.toString()
            : "0",
      },
      aksi: "aksi",

      isNew: true,
    };

    // console.log(tmp0[0]);
    if (satuan.length === 0) {
      setLogErr("Satuan tidak boleh kosong");
    } else if (Deskripsi === "") {
      setLogErr("Deskripsi tidak boleh kosong");
    } else {
      try {
        await uServices.saveOffline(tmp0, "usulanKomponen");
        setNama("");
        setSpesifikasi("");
        setKomponenBiaya({ show: "", value: "" });
        setDataJenisBel([]);
        // setProv([]);
        setKabKota([]);
        route.push("/usulan/komponen/list");
      } catch (error) {
        setLogErr(error.response.data.return);
      }
    }
  };
  // handle input change
  const handleUsulanKomponenChange = (e, index) => {
    const { name, value } = e;
    const list = [...UsulanKomponen];
    list[index][name] = value;
    setUsulanKomponen(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...UsulanKomponen];
    list.splice(index, 1);
    setUsulanKomponen(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setUsulanKomponen([...UsulanKomponen, { usulan_komponen: "" }]);
  };
  const item = ["Home", "Usulan Komponen", "List"];
  return (
    <div className="mx-5">
      <BreadCrumb data={item} title="Usulan Komponen" />
      <SectionTitle>Usulan Komponen Madrasah</SectionTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col p-2 ">
          <span className="text-red-500 align-middle">{logErr}</span>
          <div className="w-auto">
            <Label>
              <span className="text-gray-400">Kategori Komponen Biaya</span>
              <TreeSelect
                data={DataKatKom}
                getValue={handleKomponenBiaya}
                defaultValue={KomponenBiaya.show}
                placeholder="komponen biaya"
              />
            </Label>
            <Label>
              <span className="text-gray-400">
                Jenis belanja <span className="text-red-500">*</span>
              </span>
              <TreeSelect
                data={DataJenisBel}
                getValue={handleJenisBelanja}
                defaultValue={ShowKategoriJenisBiaya}
                placeholder="kategori komponen biaya"
                radioVal={checkVal}
              />
            </Label>
            {UsulanKomponen.map((x, i) => {
              return (
                <Label className="mt-4">
                  <span>
                    {i + 1} - Usulan Komponen
                    {UsulanKomponen.length !== 1 && (
                      <i
                        className="bg-red-500 text-white p-1 px-2 ml-2 rounded-sm hover:bg-red-700 cursor-pointer"
                        onClick={() => handleRemoveClick(i)}
                      >
                        <FontAwesomeIcon icon={faMinus} size="sm" />
                      </i>
                    )}
                    {UsulanKomponen.length - 1 === i && (
                      <i
                        onClick={handleAddClick}
                        className="bg-blue-500 text-white p-1 px-2 ml-2 rounded-sm hover:bg-blue-700 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </i>
                    )}
                  </span>
                  <Input
                    className="mt-1"
                    placeholder=""
                    defaultValue={x.usulan_komponen}
                    onChange={(e: any) => {
                      let payload = {
                        name: "usulan_komponen",
                        value: e.target.value,
                      };
                      handleUsulanKomponenChange(payload, i);
                    }}
                  />
                </Label>
              );
            })}

            <table>
              <tbody>
                <tr>
                  <td>
                    <Label className="ml-1">
                      <span className="text-gray-400 ">
                        Usulan Harga <span className="text-red-500">*</span>
                      </span>
                      <Input
                      type="number"
                        className="mt-1"
                        placeholder=""
                        onChange={(e: any) => setSpesifikasi(e.target.value)}
                      />
                    </Label>
                  </td>
                  <td>
                    <Label>
                      <span className="text-gray-400">Satuan </span>
                      <span className="text-red-400">*</span>
                      <Select
                        className="mt-1"
                        onChange={(e: any) => {
                          setSatuan(e.target.value);
                        }}
                      >
                        {satuanOption
                          ? satuanOption.map((data: any, key: any) => (
                              <option
                                key={data.kode}
                                id={data.kode}
                                value={data.nama}
                              >
                                {`${data.nama}`}
                              </option>
                            ))
                          : "Silahkan Sinkrokan Data"}
                      </Select>
                    </Label>
                  </td>
                </tr>
              </tbody>
            </table>
            <Label>
              <span className="text-gray-400 ">
                Keterangan <span className="text-red-500">*</span>
              </span>
              <Input
                className="mt-1"
                placeholder=""
                onChange={(e: any) => setDeskripsi(e.target.value)}
              />
            </Label>
          </div>

          <div className="items-end my-4 justify-end">
            <Button>Cancel</Button> &nbsp;
            <Button onClick={() => handlePost()}>Tambah</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
