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
import * as rService from "../../../services/reference";

import DatePicker from "react-datepicker";
import optionMadrasah from "./response";
import "react-datepicker/dist/react-datepicker.css";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [nilai, setNilai] = useState<any>("");
  const [logErr, setLogErr] = useState<any>("");
  const [tahun, setTahun] = useState<any>(new Date());
  const [madrasah, setMadrasah] = useState<any>([]);
  const [madrasahOption, setMadrasahOption] = useState<any>([]);
  useEffect(() => {
    setMadrasahOption(optionMadrasah);
  }, [0]);

  let submitData = async () => {
    const [before0, after0] = madrasah.toString().split(",");

    let tmp0: any = [];
    let number = Number(nilai);
    let sekolahidTmp: any = madrasah.length > 0 ? after0 : data.sekolah_id;
    let sekolahnamaTmp: any = madrasah.length > 0 ? before0 : data.nama_sekolah;
    tmp0.push({
      id: data.id,
      nilai_pagu: nilai ? number : data.nilai_pagu,
      tahun: tahun.getFullYear(),
      sekolah_id: madrasah.length === 0 ? madrasahOption[0].id : sekolahidTmp,
      nama_sekolah:
        madrasah.length === 0 ? madrasahOption[0].nama : sekolahnamaTmp,
    });
    try {
      await rService.saveOnline(
        tmp0[0],
        "reference-services",
        "pagu-indikatif",
        "pagu-indikatif"
      );
      onClose();
      await localStorage.getItem("pagu-indikatif");
      setLogErr("");
    } catch (error) {
      setLogErr(error.response.data.return);
    }
  };

  let hapusData = async () => {
    await rService.deleteOnline(
      data.id,
      "reference-services",
      "pagu-indikatif",
      "pagu-indikatif"
    );
    await localStorage.getItem("pagu-indikatif");
    onClose();
  };

  if (data.isDeleted === "deleted") {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          {data.aktif === "1"
            ? "Non-Aktifkan Pagu Indikatif"
            : "Aktifkan Pagu Indikatif"}
        </ModalHeader>
        <ModalBody>
          <div>
            Yakin{" "}
            {data.aktif === "1"
              ? "Non-Aktifkan Pagu Indikatif"
              : "Aktifkan Pagu Indikatif"}
            ?
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block ">
            <Button layout="outline" onClick={onClose}>
              Tidak
            </Button>
            &nbsp;
            <Button onClick={hapusData}>Yakin</Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{data ? "Edit" : "Tambah"} Pagu Indikatif </ModalHeader>

      <ModalBody>
        <div className="flex flex-col p-2 ">
          <span className="text-red-500">{logErr}</span> 
          <div className="w-auto">
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Tahun{" "}
              </span>
              <br />
              <DatePicker
                selected={tahun}
                dateFormat="yyyy"
                showYearPicker
                onChange={(date: Date) => setTahun(date)}
                className="active:block text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700'"
              />
            </Label>
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Nilai Pagu{" "}
              </span>
              <br />
              <Input
                type="number"
                onChange={(e: any) => setNilai(e.currentTarget.value)}
                className="mt-1"
                defaultValue={data ? data.nilai_pagu : ""}
              />
            </Label>
            <Label>
              {" "}
              <span className="text-gray-400 ">
                <span className="text-red-500">*</span>Pilih Nama Sekolah{" "}
              </span>
              <br />
              <Select
                className="mt-1"
                defaultValue={data ? data.nama_sekolah + "," + data.id : ""}
                onChange={(e: any) => {
                  setMadrasah(e.currentTarget.value);
                }}
              >
                {!data ? (
                  <option hidden>Pilih Nama Sekolah</option>
                ) : (
                  <option
                    key={data.id}
                    value={data.nama_sekolah + "," + data.id}
                  >
                    {data.nama_sekolah}
                  </option>
                )}
                {madrasahOption
                  ? madrasahOption.map((idz: any, key: any) => (
                      <option key={idz.id} value={idz.nama + "," + idz.id}>
                        {idz.nama}
                      </option>
                    ))
                  : "Silahkan Sinkrokan Data"}
              </Select>
            </Label>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block ">
          <Button layout="outline" onClick={onClose}>
            Cancel
          </Button>
          &nbsp;
          {data ? (
            <Button onClick={submitData}>Edit</Button>
          ) : (
            <Button onClick={submitData}>Tambah</Button>
          )}
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button block size="large" onClick={() => {}}>
            Tambah
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
