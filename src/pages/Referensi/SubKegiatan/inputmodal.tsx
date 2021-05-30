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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { removeDuplicate } from "../../../utils/helper";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [kode, setKode] = useState<any>("");
  const [kode_sub_kegiatan, setKodeSub] = useState<any>("");
  const [nama, setNama] = useState<any>("");
  const [tahun, setTahun] = useState<any>(new Date().getFullYear());

  const [kodekegiatan, setKodeKegiatan] = useState<any>("");
  const [bos, setBos] = useState<any>([]);
  const [bosOption, setBosOption] = useState<any>([]);
  const [snp, setSnp] = useState<any>([]);
  const [snpOption, setSnpOption] = useState<any>([]);
  const [kegiatanOption, setKegiatanOption] = useState<any>([]);
  const [logErr, setLogErr] = useState<any>("");
  useEffect(() => {
    setSnpOption(JSON.parse(localStorage.getItem("snp")!));
    setBosOption(JSON.parse(localStorage.getItem("pbos")!));
    if (data) {
      handleKSnp(data.kode_snp);
    }
  }, [data]);

  const [before0, after0] = snp.toString().split(",");
  const [before1, after1] = kodekegiatan.toString().split(",");
  const [before2, after2] = bos.toString().split(",");
  let submitData = async () => {
    let tmp0: any = [];
    let number: any = Number(kode);

    tmp0.push({
      kode: kode,
      kode_snp: snp,
      kode_bos: bos,
      nama: nama,
      kode_kegiatan: kodekegiatan,
      tahun: tahun,
    });
    if (snp.length === 0) {
      setLogErr("Standar Pendidikan tidak boleh kosong");
    } else if (kodekegiatan.length === 0) {
      setLogErr("Kegiatan Snp tidak boleh kosong");
    } else if (bos.length === 0) {
      setLogErr("Usulan Penggunaan Bos tidak boleh kosong");
    } else if (nama.length === 0) {
      setLogErr("Nama tidak boleh kosong");
    } else {
      try {
        await rService.saveOnline(
          tmp0[0],
          "reference-services",
          "sub-kegiatan"
        );
        localStorage.getItem("sub-kegiatan");
        onClose();
      } catch (error) {
        setLogErr(error.response.data.return);
      }
    }
  };

  let editData = async (res: any) => {
    let tmp0: any = [];
    let dataid: any = res.id;
    let namaTmp: any = nama.length === 0 ? res.nama : nama;
    let kodesnpTmp: any = snp.length === 0 ? res.kode_snp : snp;
    let kkegiatanTmp: any =
      kodekegiatan.length === 0 ? res.kode_kegiatan : kodekegiatan;
    let kbosTmp: any = bos.length === 0 ? res.kode_bos : bos;
    let tahunTmp: any = res.tahun;
    let kodeTmp: any = snp.length === 0 ? res.kode : snp;
    tmp0.push({
      id: dataid,
      kode: kodeTmp,
      nama: namaTmp,
      kode_kegiatan: kkegiatanTmp,
      kode_snp: kodesnpTmp,
      kode_bos: kbosTmp,
      tahun: tahunTmp,
    });
    await rService.saveOnline(tmp0[0], "reference-services", "sub-kegiatan");
    localStorage.getItem("sub-kegiatan");
    onClose();
  };

  let hapusData = async () => {
    try {
      rService.deleteOnline(data.id, "reference-services", "sub-kegiatan");
      localStorage.getItem("sub-kegiatan");
      onClose();
    } catch (error) {}
  };

  let handleKSnp = async (idh: any) => {
    setKegiatanOption([]);

    setSnp(idh);
    let tmp0: any = JSON.parse(localStorage.getItem("kegiatan-snp")!);
    let tmp1: any = tmp0.filter((obj: any) => {
      return obj.kode_snp == idh && obj.tahun === 2021;
    });
    setKegiatanOption(tmp1);
  };

  let handleKegiatanSnp = async (idh: any) => {
    const [before0, after0] = idh.toString().split("-");
    setKodeKegiatan(before0);
    setKode(snp + "-" + idh);
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

  // console.log('data :', data);
  let filtersnpOption = [data.kode_snp];
  const fillteredSnpOption = snpOption.filter(({ kode }) =>
    filtersnpOption.includes(kode)
  );
  // console.log('snp option', fillteredSnpOption)

  // console.log("data :", data);
  let filterKegiatan = [data.kode_kegiatan];
  const filterKegOption = snpOption.filter(({ kode }) =>
    filterKegiatan.includes(kode)
  );
  // console.log("snp option", filterKegOption);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{data ? "Edit" : "Tambah"} SubKegiatan</ModalHeader>
      <ModalBody>
        <div className="flex flex-col p-2 ">
          <span className="text-red-500 align-middle">{logErr}</span>
          <div className="w-auto">
            <Label className="mt-4">
              <span>Standard SNP</span>
              <Select
                className="mt-1"
                onChange={(e: any) => {
                  handleKSnp(e.currentTarget.value);
                }}
                defaultValue={data ? data.kode_snp : ""}
                valid={snp.length !== 0 ? true : logErr ? false : true}
              >
                {data ? (
                  !fillteredSnpOption ? null : (
                    fillteredSnpOption.map((fillter) => (
                      <option key={fillter.kode} value={fillter.kode}>
                        {fillter.kode + " - " + fillter.nama}
                      </option>
                    ))
                  )
                ) : (
                  <option hidden>Pilih Standar Pendidikan</option>
                )}
                {snpOption
                  ? snpOption.map((data: any, key: any) => (
                      <option key={key} id={data.nama} value={data.kode}>
                        {data.kode + " - " + data.nama}
                      </option>
                    ))
                  : "Silahkan Sinkrokan Data"}
              </Select>
            </Label>
            <Label className="mt-4">
              <span>Standard Kegiatan</span>
              <Select
                className="mt-1"
                defaultValue={data ? data.kode_kegiatan : snp}
                onChange={(e: any) => {
                  handleKegiatanSnp(e.currentTarget.value);
                }}
                // placeholder={"asdsadas"}
                valid={kodekegiatan.length !== 0 ? true : logErr ? false : true}
              >
                {kegiatanOption
                  ? kegiatanOption.map((data: any, key: any) => (
                      <option
                        key={key}
                        id={data.id}
                        value={
                          data.kegiatan.kode +
                          "-" +
                          (data.total_sub_kegiatan + 1)
                        }
                      >
                        {data.kegiatan.kode + " - " + data.kegiatan.nama}
                      </option>
                    ))
                  : "Silahkan Sinkrokan Data"}
              </Select>
            </Label>
            <Label className="mt-4">
              <span>Usulan Penggunaan Bos</span>

              <Select
                key="6"
                className="mt-1"
                defaultValue={data ? data.kode_bos : ""}
                onChange={(e: any) => {
                  setBos(e.currentTarget.value);
                }}
                valid={bos.length !== 0 ? true : logErr ? false : true}
              >
                {bosOption
                  ? bosOption.map((data: any, key: any) => (
                      <option key={key} value={data.kode}>
                        {data.kode + " - " + data.nama}
                      </option>
                    ))
                  : "Silahkan Sinkrokan Data"}
              </Select>
            </Label>
            <Label>
              <span className="text-gray-400">Kode Sub Kegiatan*</span>
              <Input
                className="mt-1"
                placeholder=""
                defaultValue={data ? data.kode : kode}
                onChange={(e: any) => {
                  setKodeSub(e.currentTarget.value);
                }}
                disabled
              />
            </Label>

            <Label>
              <span className="text-gray-400">Nama Sub Kegiatan*</span>
              <Input
                className="mt-1"
                placeholder=""
                defaultValue={data ? data.nama : ""}
                onChange={(e: any) => {
                  setNama(e.currentTarget.value);
                }}
                valid={nama.length !== 0 ? true : logErr ? false : true}
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
          {data ? (
            <Button onClick={() => editData(data)}>Edit</Button>
          ) : (
            <Button onClick={submitData}>Tambah</Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
