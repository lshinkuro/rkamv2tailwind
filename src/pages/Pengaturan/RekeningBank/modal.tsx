import React from "react";
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
import "react-datepicker/dist/react-datepicker.css";
import { removeDuplicate, uuidv4 } from "../../../utils/helper";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isUpdate: boolean;
};

const InputModal: React.FC<PageHeaderProps> = ({
  isOpen,
  onClose,
  data,
  isUpdate,
}) => {
  const localStorageName: string = "pengaturan/rekening-bank";
  const [inputBank, setInputBank] = React.useState<any>("");
  const [inputCabangBank, setInputCabangBank] = React.useState<any>("");
  const [inputNoRekening, setInputNoRekening] = React.useState<any>("");
  const [inputNoRekeningNama, setInputNoRekeningNama] = React.useState<any>("");
  const [inputTipeRekening, setInputTipeRekening] = React.useState<any>("");
  const [inputKeterangan, setInputKeterangan] = React.useState<any>("");

  const refBank: any[] = JSON.parse(localStorage.getItem("bank")!) || [];

  let submitData = async (isUpdate: boolean) => {
    const [kodeBank, namaBank] = inputBank.toString().split(",");
    let kode_bank: any = kodeBank?.length > 0 ? kodeBank : data.kode_bank;
    let nama_bank: any = namaBank?.length > 0 ? namaBank : data.nama_bank;
    let cabang_bank: any =
      inputCabangBank?.length > 0 ? inputCabangBank : data.cabang_bank;
    let no_rekening: any =
      inputNoRekening?.length > 0 ? inputNoRekening : data.no_rekening;
    let no_rekening_nama: any =
      inputNoRekeningNama?.length > 0
        ? inputNoRekeningNama
        : data.no_rekening_nama;
    let tipe_rekening: any =
      inputTipeRekening?.length > 0 ? inputTipeRekening : data.tipe_rekening;
    let keterangan: any =
      inputKeterangan?.length > 0 ? inputKeterangan : data.keterangan;
    const reqBody: any = {
      kode_bank: kode_bank,
      nama_bank: nama_bank,
      cabang_bank: cabang_bank,
      no_rekening: no_rekening,
      no_rekening_nama: no_rekening_nama,
      tipe_rekening: tipe_rekening,
      keterangan: keterangan,
      tahun: localStorage.getItem("tahun")
        ? localStorage.getItem("tahun")
        : new Date().getFullYear(),
    };
    let tmpData: any =
      JSON.parse(localStorage.getItem("pengaturan/rekening-bank")!) || [];
    if (isUpdate) {
      reqBody.id = data.id;
      if (tmpData.length > 0) {
        removeDuplicate(tmpData, "id", data.id);
        let tmp0: any = [reqBody, ...tmpData];
        localStorage.setItem("pengaturan/rekening-bank", JSON.stringify(tmp0));
      }
    } else {
      reqBody.id = uuidv4();
      let tmp0: any = [reqBody, ...tmpData];
      localStorage.setItem("pengaturan/rekening-bank", JSON.stringify(tmp0));
    }

    localStorage.getItem("pengaturan/rekening-bank");
    onClose();
  };

  let hapusData = async (id: any) => {
    // await rService.deleteOnline(
    //   data.id,
    //   "reference-services",
    //   localStorageName
    // );
    // const tmp0 = JSON.parse(localStorage.getItem(localStorageName)!) || [];
    // const index = tmp0.findIndex((el) => el.id === data.id);
    // tmp0.splice(index, 1);
    // localStorage.setItem(localStorageName, JSON.stringify(tmp0));
    console.log(id);
    let tmp0: any =
      JSON.parse(localStorage.getItem("pengaturan/rekening-bank")!) || [];

    let tmp1 = tmp0.filter((obj: any) => {
      return obj.id !== id.id;
    });

    // let tmp2: any = [reqBody, ...tmp0];
    localStorage.setItem("pengaturan/rekening-bank", JSON.stringify(tmp1));
    onClose();
    localStorage.getItem("pengaturan/rekening-bank");
  };

  if (data?.isDeleted === "deleted") {
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
            <Button
              onClick={() => {
                hapusData(data);
              }}
            >
              Hapus Data
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{isUpdate ? "Lihat" : "Tambah"} Rekening Bank </ModalHeader>
      <ModalBody>
        <div className="flex flex-col p-2 ">
          <div className="w-auto">
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Bank{" "}
              </span>
              <br />
              <Select
                className="mt-1"
                onChange={(e: any) => {
                  setInputBank(e.currentTarget.value);
                }}
                defaultValue={data ? `${data.kode_bank},${data.nama_bank}` : ""}
              >
                {refBank
                  ? refBank.map((item: any, key: any) => (
                      <option
                        key={item.kode}
                        value={`${item.kode},${item.nama}`}
                      >
                        {item.nama}
                      </option>
                    ))
                  : "Silahkan Sinkrokan Data"}
              </Select>
            </Label>
            <Label>
              <span className="text-gray-400"> Cabang Bank </span>
              <br />
              <Input
                onChange={(e: any) => setInputCabangBank(e.currentTarget.value)}
                className="mt-1"
                defaultValue={data ? data.cabang_bank : ""}
              />
            </Label>
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> No Rekening{" "}
              </span>
              <br />
              <Input
                type="number"
                onChange={(e: any) => setInputNoRekening(e.currentTarget.value)}
                className="mt-1"
                defaultValue={data ? data.no_rekening : ""}
              />
            </Label>
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Nama Rekening{" "}
              </span>
              <br />
              <Input
                onChange={(e: any) =>
                  setInputNoRekeningNama(e.currentTarget.value)
                }
                className="mt-1"
                defaultValue={data ? data.no_rekening_nama : ""}
              />
            </Label>
            <Label>
              {" "}
              <span className="text-gray-400 ">Tipe Rekening </span>
              <br />
              <Select
                className="mt-1"
                onChange={(e: any) => {
                  setInputTipeRekening(e.currentTarget.value);
                }}
                defaultValue={data ? data.tipe_rekening : ""}
              >
                <option key={"kosong"} value={""}>
                  {""}
                </option>
                <option key={"bos"} value={"bos"}>
                  {"BOS"}
                </option>
              </Select>
            </Label>
            <Label>
              <span className="text-gray-400"> Keterangan </span>
              <br />
              <Input
                onChange={(e: any) => setInputKeterangan(e.currentTarget.value)}
                className="mt-1"
                defaultValue={data ? data.keterangan : ""}
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
          &nbsp;
          {data ? (
            <Button
              onClick={() => {
                submitData(isUpdate);
              }}
            >
              Simpan
            </Button>
          ) : (
            <Button
              onClick={() => {
                submitData(isUpdate);
              }}
            >
              Tambah
            </Button>
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
