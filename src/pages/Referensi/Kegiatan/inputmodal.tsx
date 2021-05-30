import React, { useEffect, useState } from "react";
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
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    setSnpOption(JSON.parse(localStorage.getItem("snp")!));
  }, [0]);

  const [kode, setKode] = useState<any>("");
  const [nama, setNama] = useState<any>("");
  const [madrasah, setMadrasah] = useState<any>("");
  const [ra, setRa] = useState<any>("");
  const [logErr, setLogErr] = useState<any>("");
  const [snp, setSnp] = useState<any>([]);
  const [snpOption, setSnpOption] = useState<any>([]);
  const [tahun, setTahun] = useState<any>(new Date().getFullYear());
  const [isChecked, setIsChecked] = useState<any>(false);
  const [raChecked, setRaChecked] = useState<any>(false);

  let submitData = async () => {
    let [before0, after0] = snp.toString().split(",");
    // let kodeTmp = kode.length === 0 ? data.kegiatan.kode : Number(kode);
    let kodeTmp = kode.length === 0 ? data.kegiatan.kode : kode;
    let namaTmp = nama.length === 0 ? data.kegiatan.nama : nama;
    let tahunTmp = tahun.length === 0 ? data.kegiatan.tahun : tahun;
    let checkTmp: any = isChecked ? 1 : 0;
    let raTmp: any = raChecked ? 1 : 0;
    let tmp0: any = [];

    let snpTmp: any = data
      ? data.kegiatan.kode
      : snp.length === 0
      ? snpOption[0].kode
      : after0;

    if (data) {
      tmp0.push({
        id: data.id,
        kode_snp: snpTmp,
        kode: kodeTmp,
        nama: namaTmp,
        madrasah: checkTmp,
        ra: raTmp,
        tahun: tahunTmp,
      });
    } else {
      tmp0.push({
        kode_snp: snpTmp,
        kode: kodeTmp,
        nama: namaTmp,
        madrasah: checkTmp,
        ra: raTmp,
        tahun: tahunTmp,
      });
    }
    try {
      await rService.saveOnline(tmp0[0], "reference-services", "kegiatan-snp");
      localStorage.getItem("kegiatan-snp");
      setKode("");
      setNama("");
      onClose();
    } catch (error) {
      setLogErr(error.response.data.return);
    }
  };

  let hapusData = async () => {
    try {
      await rService.deleteOnline(
        data.id,
        "reference-services",
        "kegiatan-snp"
      );
      await localStorage.getItem("kegiatan-snp");
      onClose();
    } catch (error) {
      setLogErr(error.response.data.return);
    }
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

  let filtersnpOption = [data.kode_snp];
  const fillteredSnpOption = snpOption.filter(({ kode }) =>
    filtersnpOption.includes(kode)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{data ? "Edit" : "Tambah"} Kegiatan</ModalHeader>
      <ModalBody>
        <span className="text-red-500 align-middle">{logErr}</span>
        <div className="flex flex-col p-2 ">
          <div className="w-auto">
            <Label className="mt-4">
              <span className="text-red-500">*</span> Standar Pendidikan{" "}
              <Select
                className="mt-1"
                onChange={(e: any) => {
                  setSnp(e.currentTarget.value);
                }}
                valid={snp.length !== 0 ? true : logErr ? false : true}
              >
                {data ? (
                  !fillteredSnpOption ? null : (
                    fillteredSnpOption.map((fillter) => (
                      <option
                        key={fillter.kode}
                        value={fillter.nama + "," + fillter.kode}
                      >
                        {fillter.nama}
                      </option>
                    ))
                  )
                ) : (
                  <option hidden>Pilih Standar Pendidikan</option>
                )}
                {snpOption
                  ? snpOption.map((data: any, key: any) => (
                      <option
                        key={data.kode}
                        value={data.nama + "," + data.kode}
                      >
                        {data.nama}
                      </option>
                    ))
                  : "Silahkan Sinkrokan Data"}
              </Select>
            </Label>

            <Label>
              <span className="text-red-500">*</span> Kode{" "}
              <Input
                type="number"
                className="mt-1"
                placeholder=""
                valid={kode.length !== 0 ? true : logErr ? false : true}
                defaultValue={data ? data.kegiatan.kode : ""}
                onChange={(e: any) => {
                  setKode(e.currentTarget.value);
                }}
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
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Tahun{" "}
              </span>
              <br />
              <Input
                type="number"
                onChange={(e) => setTahun(e.currentTarget.value)}
                defaultValue={data ? data.kegiatan.tahun : tahun}
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
            <Label>
              <span className="text-gray-400">Nama Kegiatan*</span>
              <Input
                className="mt-1"
                placeholder=""
                valid={nama.length !== 0 ? true : logErr ? false : true}
                defaultValue={data ? data.kegiatan.nama : ""}
                onChange={(e) => {
                  setNama(e.currentTarget.value);
                }}
              />
            </Label>
            <div>
              <Label check>
                <input
                  type="checkbox"
                  defaultChecked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span className="ml-2">Madrasah?</span>
                {isChecked}
              </Label>
            </div>

            <div>
              <Label check>
                <input
                  type="checkbox"
                  defaultChecked={raChecked}
                  onChange={() => setRaChecked(!raChecked)}
                />
                <span className="ml-2">Ra?</span>
                {isChecked}
              </Label>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="">
          <Button layout="outline" onClick={onClose}>
            Batal
          </Button>
          {data ? (
            <Button
              onClick={() => {
                submitData();
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
};

export default InputModal;
