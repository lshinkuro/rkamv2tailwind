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
} from "../../../services/v2/referenceservice/komponenbiaya";
import { TreeSelect } from "../../../components/TreeSelect";
import * as rService from "../../../services/reference";
import { useHistory } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};
const tm0: any = [];

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
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
  const getDataService = async () => {
    try {
      const komponen = await getKatKomBiaya();
      const jenis = await getKatJenisBelanja();
      setDataJenisBel(jenis);
      setDataKatKom(komponen);
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
    let tmp0: any = [];
    tmp0.push({
      nama: Nama,
      spesifikasi: Spesifikasi,
      deskripsi: Deskripsi,
      kode_kategori: KomponenBiaya.value,
      jenis_belanja,
      tahun: 2021,
      kode: kodeKomponenBiaya,
      satuan: satuan,
    });
    if (satuan.length === 0) {
      setLogErr("Satuan tidak boleh kosong");
    } else if (Deskripsi === "") {
      setLogErr("Deskripsi tidak boleh kosong");
    } else {
      try {
        await rService.saveKelompokSasaran(
          tmp0[0],
          "reference-services",
          "komponen-biaya"
        );
        setNama("");
        setSpesifikasi("");
        setKomponenBiaya({ show: "", value: "" });
        setDataJenisBel([]);
        // setProv([]);
        setKabKota([]);

        onClose();
      } catch (error) {
        setLogErr(error.response.data.return);
      }
    }
  };
  if (data) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Edit Komponen Biaya</ModalHeader>
        <ModalBody>
          <div className="flex flex-col p-2 ">
            <div className="w-auto">
              <Label>
                <span className="text-gray-400 ">Kode Komponen Biaya *</span>
                <Input className="mt-1" defaultValue={data.kode} />
              </Label>
              <Label>
                <span className="text-gray-400">
                  Kode Kategori Komponen Biaya*
                </span>
                <Input className="mt-1" defaultValue={data.kode_kategori} />
              </Label>
              <Label>
                <span className="text-gray-400">Nama *</span>
                <Input
                  className="mt-1"
                  placeholder=""
                  defaultValue={data.nama}
                />
              </Label>
              <Label>
                <span className="text-gray-400 ">Spesifikasi *</span>
                <Input
                  className="mt-1"
                  placeholder=""
                  defaultValue={data.spesifikasi}
                />
              </Label>
              <Label>
                <span className="text-gray-400 ">Deskripsi *</span>
                <Input
                  className="mt-1"
                  placeholder=""
                  defaultValue={data.deskripsi}
                />
              </Label>
              <Label>
                <span className="text-gray-400">Activated *</span>
                <Input
                  className="mt-1"
                  placeholder=""
                  defaultValue={data.activated}
                />
              </Label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block ">
            <Button layout="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => {}}>Edit</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button block size="large" onClick={() => {}}>
              Edit
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalHeader>Kirim Email</ModalHeader>
      <ModalBody>
        <div className="flex flex-col p-2 ">
          <span className="text-red-500 align-middle">{logErr}</span>
          <div className="w-auto">
            <div>
              <span className="text-gray-400">Nama Madrasah</span>
              <div className="my-2">MAN 1 ACEH SELATAN</div>
            </div>
            <div>
              <span className="text-gray-400">NSM</span>
              <div className="my-2">131111010001</div>
            </div>
            <div>
              <span className="text-gray-400">Kode Registrasi</span>
              <div className="my-2">131111010001</div>
            </div>
            <div>
              <span className="text-gray-400 ">
                Email <span className="text-red-500">*</span>
              </span>
              <Input
                className="mt-1"
                placeholder=""
                onChange={(e: any) => setDeskripsi(e.target.value)}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block ">
          <Button
            layout="outline"
            onClick={() => {
              setActivated(0);
              setNama("");
              setShowKategoriJenisBiaya("");
              setDeskripsi("");
              setKomponenBiaya({ show: "", value: "" });
              setSpesifikasi("");
              onClose();
            }}
            className="mr-2"
          >
            Batal
          </Button>
          <Button onClick={handlePost}>Kirim</Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button
            block
            size="large"
            layout="outline"
            onClick={() => {
              setActivated(0);
              setNama("");
              setShowKategoriJenisBiaya("");
              setDeskripsi("");
              setKomponenBiaya({ show: "", value: "" });
              setSpesifikasi("");
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button block size="large" onClick={handlePost}>
            Tambah
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
