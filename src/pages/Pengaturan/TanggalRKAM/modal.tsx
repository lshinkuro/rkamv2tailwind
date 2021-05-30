import React, {  useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Select,
  Textarea,
} from "@windmill/react-ui";
import * as pService from "../../../services/v2/planningservice/index";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [kode, setKode] = useState<any>("");
  const [nama, setNama] = useState<any>("");
  const [logErr, setLogErr] = useState<any>("");
  const [kodeTahapan, setKodeTahapan] = useState<any>("");
  const [namaTahapan, setNamaTahapan] = useState<any>("");


  var CurrentDate = new Date();
  const [startDate, setStartDate] = useState(
    CurrentDate.toISOString().slice(0, 16)
  );
  CurrentDate.setDate(CurrentDate.getDate() + 1);
  const [endDate, setEndDate] = useState(
    CurrentDate.toISOString().slice(0, 16)
  );
  const optionTahapan: any = [
    {
      kode: "penetapan",
      nama: "Penetapan",
    },
    {
      kode: "perubahan",
      nama: "Perubahan",
    },
    {
      kode: "pergeseran",
      nama: "Pergeseran",
    },
  ];

  let handleStartDate = async (e) => {
    setStartDate(e);
    console.log(e);
  };
  let clearForm = async () => {
    await localStorage.getItem("rencana-tanggal");
    setKode("");
    setKodeTahapan("");
    setNamaTahapan("");
    setNama("");
    setLogErr("");
    onClose();
  };
  let submitData = async () => {
    var regex = new RegExp(",", "g");
    let str: any = kode.replace("Rp", "").replace(regex, "");
    let namaTmp = nama.length === 0 ? data.keterangan : nama;
    let kodeSDTmp: any = !kodeTahapan
      ? data.kode_jenis_tahapan
      : kodeTahapan || "";
    let tmp0: any = {
      id: data ? data.id : null,
      kode_jenis_tahapan: kodeSDTmp,
      keterangan: namaTmp,
      tahun: JSON.parse(localStorage.getItem("isTahun")!) || 2021,
      start_date: startDate,
      end_date: endDate,
      isNew: true,
    };

    if (!data) {
      delete tmp0["id"];
      delete tmp0["activated"];
    }
    console.log(tmp0);
    if (!data) {
      if (!kodeSDTmp) {
        setLogErr("sumber dana tidak boleh kosong");
      } else if (!namaTmp) {
        setLogErr("keterangan tidak boleh kosong");
      } else {
        try {
          await pService.saveOnline(tmp0, "rencana-tanggal", "rencana-tanggal");
          await clearForm();
        } catch (error) {
          if (error.response) setLogErr(error.response.data.return);
          else setLogErr(error.message);
        }
      }
    } else {
      try {
        delete tmp0["activated"];
        await pService.updateOnline(tmp0, "rencana-tanggal", "edit");
        await clearForm();
      } catch (error) {
        if (error.response) setLogErr(error.response.data.return);
        else setLogErr(error.message);
      }
    }
  };

  if (data.isDeleted === "deleted") {
    let hapusData = async () => {
      await pService.updateOnline(data, "rencana-tanggal", "hapus");
      localStorage.getItem("rencana-tanggal");
      setKode("");
      setNama("");
      setLogErr("");
      onClose();
    };
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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{data ? "Edit" : "Tambah"} Tanggal RKAM </ModalHeader>
      <ModalBody>
        <span className="text-red-500 align-middle">{logErr}</span>
        <div className="flex flex-col p-2 ">
          <div className="w-auto">
            <Label className="mt-4">
              <span>Sumber Dana</span>
              <Select
                className="mt-1"
                onChange={(e: any) => {
                  setKodeTahapan(e.currentTarget.value);
                }}
                defaultValue={data.kode_jenis_tahapan}
                valid={kodeTahapan.length > 0 ? true : logErr ? false : true}
              >
                {data ? (
                  optionTahapan ? null : (
                    optionTahapan.map((fillter) => (
                      <option
                        key={fillter.kode}
                        value={data.kode_jenis_tahapan}
                      >
                        {data.kode_jenis_tahapan}
                      </option>
                    ))
                  )
                ) : (
                  <option hidden>Pilih Sumber Dana</option>
                )}
                {optionTahapan
                  ? optionTahapan.map((data: any, key: any) => (
                      <option
                        key={key}
                        id={data.nama}
                        value={data.kode}
                      >
                        {data.nama}
                      </option>
                    ))
                  : "Silahkan Sinkrokan Data"}
              </Select>
            </Label>
            <div className="flex flex-1 flex-col md:flex-row gap-2">
              <div className="flex-1">
                <Label>
                  <span className="text-gray-400">
                    {" "}
                    <span className="text-red-500">*</span> Tanggal Mulai
                  </span>
                  <br />
                  <input
                    id="startdate"
                    min={new Date().toISOString().slice(0, 16)}
                    type="datetime-local"
                    step="1"
                    defaultValue={data.start_date || startDate}
                    onChange={(event: any) =>
                      handleStartDate(event.target.value)
                    }
                  />
                </Label>
              </div>
              <div className="flex-1">
                <Label>
                  <span className="text-gray-400">
                    {" "}
                    <span className="text-red-500">*</span> Tanggal Selesai
                  </span>
                  <br />
                  <input
                    id="enddate"
                    min={startDate}
                    type="datetime-local"
                    defaultValue={data.end_date || endDate}
                    onChange={(event: any) => setEndDate(event.target.value)}
                  />
                </Label>
              </div>
            </div>
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Keterangan
              </span>
              <Textarea
                className="mt-1"
                onChange={(e) => setNama(e.currentTarget.value)}
                defaultValue={data ? data.keterangan : ""}
                placeholder="Silakan isi Keterangan"
                valid={nama.length !== 0 ? true : logErr ? false : true}
              />
            </Label>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block ">
          <Button layout="outline" onClick={onClose}>
            Batal
          </Button>
          &nbsp;
          <Button onClick={submitData}>Simpan</Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button layout="outline" onClick={onClose}>
            Batal
          </Button>
          &nbsp;
          <Button onClick={submitData}>Simpan</Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
