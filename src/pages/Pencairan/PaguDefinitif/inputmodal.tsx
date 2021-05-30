import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
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
  const [nama, setNama] = useState<any>("");
  const [tahun, setTahun] = useState<any>("");
  const [logErr, setLogErr] = React.useState<any>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  React.useEffect(() => {
    console.log(data.activated);
    if (data.activated === "1") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [data]);
  let submitData = async () => {
    let tmp0: any = [];
    let namaTmp = nama.length === 0 ? data.nama : nama;
    let tahunTmp = tahun.length === 0 ? data.tahun : tahun;
    let isAktif: any = isChecked ? 1 : 0;
    tmp0.push({
      nama: namaTmp,
      tahun: tahunTmp,
      activated: isAktif,
    });
    try {
      await rService.saveTahun(tmp0[0], null);
      localStorage.getItem("tahun");
      setNama("");
      setTahun("");
      onClose();
    } catch (error) {
      if (error.response) setLogErr(error.response.data.return);
      else setLogErr(error.message);
    }
  };

  let editData = async (d: any) => {
    let tmp0: any = [];
    let namaTmp = nama.length === 0 ? d.nama : nama;
    let tahunTmp = tahun.length === 0 ? d.tahun : tahun;
    let isAktif: any = isChecked ? 1 : 0;
    tmp0.push({
      id: d.id,
      nama: namaTmp,
      tahun: tahunTmp,
      activated: isAktif,
    });
    try {
      await rService.saveTahun(tmp0[0], d.id);
      await localStorage.getItem("tahun");
      setNama("");
      setTahun("");
      onClose();
    } catch (error) {
      if (error.response) setLogErr(error.response.data.return);
      else setLogErr(error.message);
    }
  };

  let hapusData = async () => {
    await rService.deleteTahun(data.id);
    await localStorage.getItem("tahun");
    onClose();
  };

  if (data.isDeleted === "deleted") {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          {isChecked ? "Non-Aktifkan Tahun" : "Aktifkan Tahun"}
        </ModalHeader>
        <ModalBody>
          Yakin {isChecked ? "Non-Aktifkan Tahun" : "Aktifkan Tahun"}?
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block ">
            <Button layout="outline" onClick={onClose}>
              Batal
            </Button>
            &nbsp;
            <Button onClick={hapusData}>Yakin</Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  } else {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>{data ? "Edit" : "Tambah"} Pagu Definitif</ModalHeader>
        <ModalBody>
          <span className="text-red-500 align-middle">{logErr}</span>
          <div className="flex flex-col p-2 ">
            <div className="w-auto">
              <Label>
                <span className="text-gray-400">Nama *</span>
                <Input
                  className="mt-1"
                  placeholder="Silahkan isi Nama "
                  onChange={(e) => setNama(e.currentTarget.value)}
                  defaultValue={data ? data.nama : ""}
                  valid={nama.length !== 0 ? true : logErr ? false : true}
                />
              </Label>
              <Label>
                <span className="text-gray-400 ">Tahun *</span>
                <Input
                  type="number"
                  className="mt-1"
                  defaultValue={data ? data.tahun : ""}
                  onChange={(e) => {
                    setTahun(e.currentTarget.value);
                  }}
                  valid={tahun.length !== 0 ? true : logErr ? false : true}
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
              {/* <Label check className="mt-2">
                <input
                  id="isEmail"
                  type="checkbox"
                  defaultChecked={!isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span className="ml-2">Aktif?</span>
              </Label> */}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className=" ">
            <Button layout="outline" onClick={onClose}>
              Cancel
            </Button>
            &nbsp;
            {data ? (
              <Button
                onClick={() => {
                  editData(data);
                }}
              >
                Simpan
              </Button>
            ) : (
              <Button onClick={submitData}>Tambah</Button>
            )}
          </div>
        </ModalFooter>
      </Modal>
    );
  }
};

export default InputModal;
