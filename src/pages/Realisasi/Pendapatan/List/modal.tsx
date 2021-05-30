import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Select,
  Textarea
} from "@windmill/react-ui";

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
  const [keterangan, setKeterangan] = useState<any>("");
  const [logErr, setLogErr] = useState<any>("");

  let submitData = async () => {

  };

  let hapusData = async () => {
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
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full px-6 py-4 mx-2  bg-white  dark:bg-gray-800  sm:m-4 xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md"  >
      <ModalHeader>{data ? "Edit" : "Tambah"} Nota Pendapatan </ModalHeader>
      <ModalBody>
        <span className="text-red-500 align-middle">{logErr}</span>
        <div className="flex flex-col p-2 gap-2 ">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <Label>
                  <span className="text-gray-400">
                    {" "}
                    <span className="text-red-500">*</span> Sumber Dana
                 </span>
                  <Select
                    className="mt-1"
                    onChange={(e: any) => {
                    }}>
                    <option>Apbn Bos</option>
                  </Select>
                </Label>
              </div>
              <div className="flex-1">
                <Label>
                  <span className="text-gray-400">
                    {" "}
                    <span className="text-red-500">*</span> Tipe Kas
                 </span>
                  <Select
                    className="mt-1"
                    onChange={(e: any) => {
                    }}>
                    <option>Apbn Bos</option>
                  </Select>
                </Label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <Label>
                  <span className="text-gray-400">
                    {" "}
                    <span className="text-red-500">*</span> Tanggal Nota
                 </span>
                  <div className="w-full">
                    <DatePicker
                      selected={tahun}
                      dateFormat="ddmmyyyy"
                      showFullMonthYearPicker
                      onChange={(date: Date) => setTahun(date)}
                      className="mt-2 active:block text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700"
                    />
                  </div>
                </Label>
              </div>
              <div className="flex-1">
                <span className="text-gray-400">
                  {" "}
                  <span className="text-red-500">*</span> Nilai Pendapatan
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
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <Label className="mt-4">
                  <span>Keterangan</span>
                  <Textarea
                    onChange={(e) => setKeterangan(e.currentTarget.value)}
                    className="mt-1"
                    rows={4}
                    placeholder="Enter some long form content."
                    valid={keterangan.length !== 0 ? true : logErr ? false : true}
                  />

                </Label>
              </div>
              <div className="flex-1"></div>
            </div>



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
          <Button block size="large" onClick={() => { }}>
            Tambah
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
