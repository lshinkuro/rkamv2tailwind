import React, { useEffect, useState } from "react";
import { Input, Button, Label, Select, Textarea } from "@windmill/react-ui";
import SectionTitle from "../../../../components/Typography/SectionTitle";
import { BreadCrumb } from "../../../../components";
import * as usulanService from "../../../../services/v2/planningservice/usulanservice";
import { useHistory } from "react-router-dom";
const AjukanKomponenUsulan = () => {
  const item = ["Home", "Usulan Kegiatan", "Komponen Usulan"];
  const refSnp: any[] = JSON.parse(localStorage.getItem("snp")!) || [];
  const [snp, setSnp] = useState<any>([]);
  const [snpNama, setSnpNama] = useState<any>("");
  const [subUsulan, setSubUsulan] = useState<any>("");
  const [pbBos, setPBos] = useState<any>("");
  const [keterangan, setKeterangan] = useState<any>("");
  const [usulan, setUsulan] = useState<any>("");
  const [bos, setBos] = useState<any>([]);
  const [bosOption, setBosOption] = useState<any>([]);
  const route = useHistory();
  const [logErr, setLogErr] = useState<any>("");
  const [kodekegiatan, setKodeKegiatan] = useState<any>("");
  const [namakegiatan, setNamaKegiatan] = useState<any>("");
  const [SubKegAndBos, setSubKegAndBos] = useState([
    { sub_kegiatan: "", penggunaan_bos: "" },
  ]);
  const [kegiatanOption, setKegiatanOption] = useState<any>([]);
  // handle input change
  const handleSubKegAndBosChange = (e, index) => {
    const { name, value } = e;
    const list = [...SubKegAndBos];
    list[index][name] = value;
    setSubKegAndBos(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...SubKegAndBos];
    list.splice(index, 1);
    setSubKegAndBos(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setSubKegAndBos([
      ...SubKegAndBos,
      { sub_kegiatan: "", penggunaan_bos: "" },
    ]);
  };

  useEffect(() => {
    setBosOption(JSON.parse(localStorage.getItem("pbos")!));
  }, [0]);

  let backTo = async () => {
    route.push("/usulan/subkegiatan/request");
  };

  let submitData = async () => {
    let tmpSub: any = [];
    SubKegAndBos.forEach((el0) => {
      const [before0, after0] = el0.penggunaan_bos.toString().split(",");
      tmpSub.push({
        kode_penggunaan_bos: after0,
        nama_penggunaan_bos: before0,
        sub_kegiatan: el0.sub_kegiatan,
      });
    });
    let tmp0 = JSON.parse(localStorage.getItem("auth")!);
    let madrasah = "";

    if (tmp0.madrasah) {
      madrasah = tmp0.madrasah.nama === null ? "" : tmp0.madrasah.nama;
    }
    const [before0, after0] = snp.toString().split(",");
    const [before1, after1] = bos.toString().split(",");
    const reqBody: any = {
      tipe_usulan: 2,
      tahun: 2021,
      usulan: {
        tahun: 2021,
        kode_snp: snp.length === 0 ? refSnp[0].kode : before0,
        nama_snp: snp.length === 0 ? refSnp[0].nama : after0,
        kode_kegiatan: kodekegiatan,
        nama_kegiatan: namakegiatan,
        nama_sub_kegiatan: subUsulan,
        keterangan: keterangan,
        usulan_kode_bos: pbBos,
        usulan_nama_bos: after1,
        pengusul: madrasah,
        no_tiket:
          localStorage.getItem("usulanSubKegiatan") !== null
            ? localStorage.getItem("usulanSubKegiatan")!.length.toString()
            : "0",
      },
      aksi: "aksi",
      isNew: true,
    };
    // console.log(reqBody);
    // if (snp.length === 0) {
    //   setLogErr("standar pendidikan tidak boleh kosong");
    // } else if (!usulan) {
    //   setLogErr("nama usulan tidak boleh kosong");
    // } else if (keterangan.length === 0) {
    //   setLogErr("keterangan tidak boleh kosong");
    // } else {
    try {
      await usulanService.saveOffline(reqBody, "usulanSubKegiatan");
      route.push("/usulan/subkegiatan/list");
    } catch (error) {
      setLogErr(error.response.data.return);
    }
    // }
  };

  let handleSnp = async (idh: any) => {
    // setKegiatanOption([]);

    const [before0, after0] = idh.toString().split(",");
    setSnp(after0);
    setSnpNama(before0);
    let tmp0: any = JSON.parse(localStorage.getItem("kegiatan-snp")!);
    let tmp1: any = tmp0.filter((obj: any) => {
      return obj.kode_snp === after0;
    });
    console.log(after0);
    setKegiatanOption(tmp1);
  };
  let handleKegiatanSnp = async (idh: any) => {
    const [before0, after0] = idh.toString().split("-");
    setKodeKegiatan(before0);
    setNamaKegiatan(after0);
    // setKode(snp + "-" + idh);
  };
  return (
    <>
      <BreadCrumb data={item} title="Komponen Usulan" />

      <div className="mx-5">
        <SectionTitle>Usulan Sub Kegiatan Madrasah</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <span className="text-red-500 align-middle">{logErr}</span>
          <Label className="mt-4">
            <span>Standard Kegiatan</span>
            <Select
              className="mt-1"
              onChange={(e: any) => {
                handleSnp(e.currentTarget.value);
              }}
              // valid={
              //   snp.length !== 0
              //     ? true
              //     : logErr !== "standar pendidikan tidak boleh kosong"
              //     ? true
              //     : false
              // }
            >
              {refSnp
                ? refSnp.map((data: any, key: any) => (
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
          <Label className="mt-4">
            <span>Kegiatan</span>
            <Select
              className="mt-1"
              // defaultValue={data ? data.kode_kegiatan : snp}
              onChange={(e: any) => {
                handleKegiatanSnp(e.currentTarget.value);
              }}
              // placeholder={"asdsadas"}
              // valid={kodekegiatan.length !== 0 ? true : logErr ? false : true}
            >
              {kegiatanOption
                ? kegiatanOption.map((data: any, key: any) => (
                    <option
                      key={key}
                      id={data.id}
                      value={
                        data.kegiatan.kode + "-" + (data.kegiatan.nama)
                      }
                    >
                      {data.kegiatan.kode + " - " + data.kegiatan.nama}
                    </option>
                  ))
                : "Silahkan Sinkrokan Data"}
            </Select>
          </Label>
          <Label>
            <span>Sub Kegiatan</span>
            <Input
              // defaultValue={x.sub_kegiatan}
              onChange={(e: any) => {
                setSubUsulan(e.currentTarget.value);
              }}
              className="mt-1"
              placeholder="Usulan Kegiatan"
              valid={subUsulan.length !== 0 ? true : logErr ? false : true}
            />
          </Label>
          <Label className="mt-4">
            <span>Usulan Penggunaan Bos</span>

            <Select
              className="mt-1"
              // value={x.penggunaan_bos}
              onChange={(e: any) => {
                setPBos(e.currentTarget.value);
              }}
              valid={bos.length !== 0 ? true : logErr ? false : true}
            >
              {bosOption
                ? bosOption.map((data: any, key: any) => (
                    <option key={data.kode} value={data.nama + "," + data.kode}>
                      {data.nama}
                    </option>
                  ))
                : "Silahkan Sinkrokan Data"}
            </Select>
          </Label>
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
          <div className="items-end my-4 justify-end">
            <Button
              className="mr-2 bg-red-600"
              onClick={backTo}
              type="submit"
              layout="primary"
            >
              Cancel
            </Button>
            <Button onClick={submitData}>Tambah</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AjukanKomponenUsulan;
