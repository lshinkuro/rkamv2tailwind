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
  Textarea,
} from "@windmill/react-ui";
import * as pService from "../../../services/v2/planningservice/index";
import { default as NumberFormat } from "react-number-format";

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
  const [kodeSumberDana, setKodeSumberDana] = useState<any>("");
  const [namaSumberDana, setNamaSumberDana] = useState<any>("");

  const optionSumberDana: any =
    JSON.parse(localStorage.getItem("referensi-sumberdana")!) || [];

  // useEffect(() => {
  // }, [0]);
  let handleSumberDana = async (e) => {
    let [before0, after0] = e.toString().split(",");
    setNamaSumberDana(before0);
    setKodeSumberDana(after0);
  };
  let clearForm = async () => {
    await localStorage.getItem("rencana-pendapatan");
    setKode("");
    setKodeSumberDana("");
    setNamaSumberDana("");
    setNama("");
    setLogErr("");
    onClose();
  };
  let submitData = async () => {
    var regex = new RegExp(",", "g");
    let str: any = kode.replace("Rp", "").replace(regex, "");
    let number = kode.length === 0 ? data.jumlah : str;
    let namaTmp = nama.length === 0 ? data.keterangan : nama;
    let tahunTmp = tahun.length === 0 ? data.tahun : tahun.getFullYear();
    let kodeSDTmp: any = !kodeSumberDana
      ? data.kode_sumber_dana
      : kodeSumberDana || "";
    let namaSDTmp: any = !namaSumberDana
      ? data.nama_sumber_dana
      : namaSumberDana;
    // let tmp0: any = [];
    // // let tahunTmp: any = tahun.getFullYear(),
    let tmp0: any = {
      id: data ? data.id : null,
      jumlah: number,
      activated: data ? data.activated : "1",
      keterangan: namaTmp,
      tahun: JSON.parse(localStorage.getItem("isTahun")!) || 2021,
      kode_sumber_dana:
        kodeSumberDana.length === 0 ? data.kode_sumber_dana : kodeSumberDana,
      nama_sumber_dana:
        namaSumberDana.length === 0 ? data.nama_sumber_dana : namaSumberDana,
      isNew: true,
    };

    let tmpCheck = JSON.parse(
      localStorage.getItem("rencana-pendapatan")!
    ).filter((obj: any) => {
      return (
        obj.tahun === tmp0.tahun &&
        obj.kode_sumber_dana === tmp0.kode_sumber_dana
      );
    });
    console.log(tmpCheck);

    if (!data) {
      delete tmp0["id"];
      delete tmp0["activated"];
    }
    // console.log(kodeSDTmp)
    if (!data) {
      if (!kodeSDTmp) {
        setLogErr("sumber dana tidak boleh kosong");
      } else if (!number) {
        setLogErr("nilai pendapatan tidak boleh kosong");
      } else if (!namaTmp) {
        setLogErr("keterangan tidak boleh kosong");
      } else if (tmpCheck.length > 0) {
        setLogErr(
          "tahun " +
            tmp0.tahun +
            " dengan sumber dana " +
            tmp0.nama_sumber_dana +
            " sudah ada"
        );
      } else {
        try {
          tmp0.activated = "1";
          await pService.saveOffline(tmp0, "rencana-pendapatan");
          await clearForm();
        } catch (error) {
          setLogErr(error.response.data.return);
        }
      }
    } else {
      try {
        await pService.saveOffline(tmp0, "rencana-pendapatan", "edit");
        await clearForm();
      } catch (error) {
        setLogErr(error.response.data.return);
      }
    }
  };

  if (data.isDeleted === "deleted") {
    let hapusData = async () => {
      await pService.saveOffline(data, "rencana-pendapatan", "hapus");
      localStorage.getItem("rencana-pendapatan");
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
      <ModalHeader>{data ? "Edit" : "Tambah"} Rencana Pendapatan </ModalHeader>
      <ModalBody>
        <span className="text-red-500 align-middle">{logErr}</span>
        <div className="flex flex-col p-2 ">
          <div className="w-auto">
            <Label className="mt-4">
              <span>Sumber Dana</span>
              <Select
                className="mt-1"
                onChange={(e: any) => {
                  handleSumberDana(e.currentTarget.value);
                }}
                defaultValue={
                  data.nama_sumber_dana + "," + data.kode_sumber_dana
                }
                valid={kodeSumberDana.length > 0 ? true : logErr ? false : true}
              >
                {data ? (
                  optionSumberDana ? null : (
                    optionSumberDana.map((fillter) => (
                      <option
                        key={fillter.kode}
                        value={
                          data.nama_sumber_dana + "," + data.kode_sumber_dana
                        }
                      >
                        {data.nama_sumber_dana}
                      </option>
                    ))
                  )
                ) : (
                  <option hidden>Pilih Sumber Dana</option>
                )}
                {optionSumberDana
                  ? optionSumberDana.map((data: any, key: any) => (
                      <option
                        key={key}
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
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Nilai Pendapatan
              </span>
              <NumberFormat
                thousandSeparator={true}
                prefix={"Rp"}
                mask="."
                customInput={Input}
                onChange={(e) => setKode(e.currentTarget.value)}
                defaultValue={data ? data.jumlah : ""}
                className="mt-1"
                placeholder="Silakan isi kode"
                valid={kode.length !== 0 ? true : logErr ? false : true}
              />

              {/* <Input
                type="number"
              /> */}
            </Label>
            <Label>
              <span className="text-gray-400">
                {" "}
                <span className="text-red-500">*</span> Keterangan
              </span>
              <Textarea
                className="mt-1"
                // type="text-area"
                onChange={(e) => setNama(e.currentTarget.value)}
                defaultValue={data ? data.keterangan : ""}
                placeholder="Silakan isi Keterangan"
                valid={nama.length !== 0 ? true : logErr ? false : true}
              />
            </Label>
            {/* <Label>
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
            </Label> */}
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
          {/* {data ? (
            <Button onClick={submitData}>Simpan</Button>
          ) : (
          )} */}
        </div>
        <div className="block w-full sm:hidden">
          <Button layout="outline" onClick={onClose}>
            Batal
          </Button>
          &nbsp;
          <Button onClick={submitData}>Simpan</Button>
          {/* {data ? (
          ) : (
            <Button onClick={submitData}>Simpan</Button>
          )} */}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
