import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  HelperText,
  Select,
  Input,
} from "@windmill/react-ui";
import * as rService from "../../../services/reference";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [sekolah_id, setSekolahId] = useState<any>("");
  const [kode_bank, setKodeBank] = useState<any>("");
  const [nama_bank, setNamaBank] = useState<any>("");
  const [cabang_bank, setCabangBank] = useState<any>("");
  const [no_rekening_nama, setNoRekeningNama] = useState<any>("");
  const [no_rekening, setNoRekening] = useState<any>("");
  const [tahun, setTahun] = useState<any>(new Date());
  const [keterangan, setKeterangan] = useState<any>("");
  const [kode_tipe_rekening, setKodeTipeRekening] = useState<any>("");
  const [logErr, setLogErr] = useState<any>("");

  const [bank, setBank] = React.useState<any>([]);
  const [bankOption, setBankOption] = React.useState<any>([]);

  React.useEffect(() => {
    setBankOption(JSON.parse(localStorage.getItem("bank")!));
  }, [0]);

  const [before0, after0] = bank.toString().split(",");

  React.useEffect(() => {
    setSekolahId(JSON.parse(localStorage.getItem("auth")!).user_id);
  }, []);

  let submitData = async () => {
    let tmp0: any = [];
    let id: any = 2;

    tmp0.push({
      sekolah_id: sekolah_id,
      kode_bank: after0,
      nama_bank:  before0,
      cabang_bank: cabang_bank,
      no_rekening_nama: no_rekening_nama,
      no_rekening: no_rekening,
      tahun: "2021",
      keterangan: keterangan,
      kode_tipe_rekening: kode_tipe_rekening,
    });
    try {
      await rService.saveOnline(tmp0[0], "reference-services", "rekening-belanja", "rekening-belanja");
      localStorage.getItem("rekening-belanja");
      setSekolahId("");
      setCabangBank("");
      setTahun("");
      setKeterangan("")
      setNoRekeningNama("")
      setNoRekening("")
      onClose();
    } catch (error) {
        if (error.response)
            setLogErr(error.response.data.return);
        else
            setLogErr(error.message);
    }
  };

  let editData = async (data: any) => {
    let tmp0: any = [];
    let id: any = data.id;

    tmp0.push({
      id:data.id,
      sekolah_id: sekolah_id,
      kode_bank: !after0 ? data.nama_bank : after0  ,
      nama_bank: !before0  ? data.kode_bank :before0,
      cabang_bank: cabang_bank.length === 0  ? data.cabang_bank : cabang_bank,
      no_rekening_nama:no_rekening_nama.length === 0 ? data.no_rekening_nama : no_rekening_nama,
      no_rekening:no_rekening.length === 0 ? data.no_rekening : no_rekening,
      tahun: localStorage.getItem("isTahun") || 2021,
      keterangan: keterangan.length === 0  ? data.keterangan : keterangan,
      kode_tipe_rekening:kode_tipe_rekening.length === 0 ? data.kode_tipe_rekening :  kode_tipe_rekening,

    });
    await rService.saveRekeningBelanja(tmp0[0], id);
    localStorage.getItem("rekening-belanja");
    onClose();
    console.log(tmp0);
  };




  let hapusData = async () => {
    rService.deleteReferensiRekeningBelanja(data.id)
    // rService.deleteOnline(data.id, "reference-services", "rekening-belanja");
    localStorage.getItem("rekening-belanja");
    onClose();
  };

  if (data.isDeleted === "deleted") {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Hapus Data</ModalHeader>
        <ModalBody>
          <div>Yakin Hapus Data?</div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block ">
            <Button layout="outline" onClick={onClose}>
              Cancel
            </Button>
            &nbsp;
            <Button onClick={hapusData}>Hapus Data</Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }

  // console.log(data)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{data ? "Edit" : "Tambah"} Rekening Belanja</ModalHeader>
      <ModalBody>
        <div className="flex flex-col p-2 ">
          <div className="w-auto">
            <Label>
              <span className="text-gray-400">Nama Bank*</span>
              <Select
                className="mt-1 
                               text-gray-500"
                onChange={(e: any) => {
                  setBank(e.currentTarget.value);
                }}
                defaultValue={data ? data.nama_bank : ""}
              >
                {bankOption
                  ? bankOption.map((data: any, key: any) => (
                      <option
                        key={data.nama}
                        id={data.nama}
                        value={data.nama + "," + data.kode}
                      >
                        {data.nama}
                      </option>
                    ))
                  : "Silahkan Sinkrokan Data"}
              </Select>
            </Label>
            <Label>
              <span className="text-gray-400">Cabang *</span>
              <Input
                className="mt-1"
                placeholder=""
                defaultValue={data ? data.cabang_bank : ""}
                onChange={(e: any) => {
                  setCabangBank(e.currentTarget.value);
                }}
              />
            </Label>
            <Label>
              <span className="text-gray-400 ">Nama No Rekening*</span>
              <Input
                className="mt-1"
                defaultValue={data ? data.no_rekening_nama : ""}
                onChange={(e: any) => {
                  setNoRekeningNama(e.currentTarget.value);
                }}
              />
            </Label>
            <Label>
              <span className="text-gray-400">No Rekening*</span>
              <Input
                className="mt-1"
                placeholder=""
                defaultValue={data ? data.no_rekening : ""}
                onChange={(e: any) => {
                  setNoRekening(e.currentTarget.value);
                }}
              />
            </Label>
            <Label>
              <span className="text-gray-400">Kode Tipe Rekening*</span>
              <Input
                className="mt-1"
                placeholder=""
                defaultValue={data ? data.kode_tipe_rekening : ""}
                onChange={(e: any) => {
                  setKodeTipeRekening(e.currentTarget.value);
                }}
              />
            </Label>
            <Label>
              <span className="text-gray-400">Keterangan *</span>
              <Input
                className="mt-1"
                placeholder=""
                defaultValue={data ? data.keterangan : ""}
                onChange={(e: any) => {
                  setKeterangan(e.currentTarget.value);
                }}
              />
            </Label>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className=" ">
          <Button layout="outline" onClick={onClose}>
            Cancel
          </Button>
          {data ? (
            <Button
              onClick={() => {
                editData(data);
              }}
            >
              Edit
            </Button>
          ) : (
            <Button onClick={submitData}>Tambah</Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
