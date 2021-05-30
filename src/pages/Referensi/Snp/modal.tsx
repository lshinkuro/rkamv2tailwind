import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
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
  // console.log(data)
  const [kode, setKode] = useState<any>("");
  const [nama, setNama] = useState<any>("");
  const [tahun, setTahun] = useState<any>(new Date());
  const [logErr, setLogErr] = useState<any>("");

  let submitData = async () => {
    let number = kode.length === 0 ? data.kode : Number(kode);
    let namaTmp = nama.length === 0 ? data.nama : nama;
    let tahunTmp = tahun.length === 0 ? data.tahun : tahun.getFullYear();
    // let tmp0: any = [];
    // // let tahunTmp: any = tahun.getFullYear(),
    let tmp0 : any ={
      id: data ? data.id : null,
      kode: number,
      nama: namaTmp,
      tahun: tahunTmp,
    } ;
    if(!data){
      delete tmp0["id"];
    }
    try {
      await rService.saveOnline(tmp0, "reference-services", "snp");
      localStorage.getItem("snp");
      setKode("");
      setNama("");
      setLogErr("");
      onClose();
    } catch (error) {
      setLogErr(error.response.data.return);
    }
  };

  if (data.isDeleted === "deleted") {
    let hapusData = async () => {
      rService.deleteSnp(data.id);
      localStorage.getItem("snp");
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
      <ModalHeader>{data ? "Edit" : "Tambah"} SNP </ModalHeader>
      <ModalBody>
        <span className="text-red-500 align-middle">{logErr}</span>
        <div className="flex flex-col p-2 ">
          <div className="w-auto">
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Kode
              </span>
              {data ? (
                <Input
                  onChange={(e) => setKode(e.currentTarget.value)}
                  defaultValue={data ? data.kode : ""}
                  className="mt-1"
                  disabled
                />
              ) : (
                <Input
                  type="number"
                  onChange={(e) => setKode(e.currentTarget.value)}
                  defaultValue={data ? data.kode : ""}
                  className="mt-1"
                  placeholder="Silakan isi kode"
                  valid={kode.length !== 0 ? true : logErr ? false : true}
                  onInput={(e) => {
                    e.currentTarget.value = Math.max(
                      0,
                      parseInt(e.currentTarget.value)
                    )
                      .toString()
                      .slice(0, 4);
                  }}
                />
              )}
            </Label>
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Standar Pendidikan
              </span>
              <Input
                className="mt-1"
                onChange={(e) => setNama(e.currentTarget.value)}
                defaultValue={data ? data.nama : ""}
                placeholder="Silakan isi Nama Standar Pendidikan"
                valid={nama.length !== 0 ? true : logErr ? false : true}
              />
            </Label>
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Tahun{" "}
              </span>
              <br />
              <Input
                type="number"
                onChange={(e) => setTahun(e.currentTarget.value)}
                defaultValue={data ? data.tahun : tahun.getFullYear()}
                className="mt-1"
                placeholder="Silakan isi tahun"
                valid={tahun.length !== 0 ? true : logErr ? false : true}
                // defaultValue={"2021"}
                onInput={(e) => {
                  e.currentTarget.value = Math.max(
                    0,
                    parseInt(e.currentTarget.value)
                  )
                    .toString()
                    .slice(0, 4);
                }}
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
          {data ? (
            <Button onClick={submitData}>Simpan</Button>
          ) : (
            <Button onClick={submitData}>Simpan</Button>
          )}
        </div>
        <div className="block w-full sm:hidden">
          <Button layout="outline" onClick={onClose}>
            Batal
          </Button>
          &nbsp;
          {data ? (
            <Button onClick={submitData}>Simpan</Button>
          ) : (
            <Button onClick={submitData}>Simpan</Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
