import React, { useEffect, useState } from "react";
import { Input, Button, Label, Select, Textarea } from "@windmill/react-ui";
import SectionTitle from "../../../../components/Typography/SectionTitle";
import { BreadCrumb } from "../../../../components";
import * as usulanService from "../../../../services/v2/planningservice/usulanservice";
import { useHistory } from "react-router-dom";
import { createTrue } from "typescript";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const AjukanKomponenUsulan = () => {
  const item = ["Home", "Usulan Kegiatan", "Komponen Usulan"];
  const refSnp: any[] = JSON.parse(localStorage.getItem("snp")!) || [];
  const [snp, setSnp] = useState<any>([]);
  const [subUsulan, setSubUsulan] = useState<any>("");
  const [keterangan, setKeterangan] = useState<any>("");
  const [usulan, setUsulan] = useState<any>("");
  const [bos, setBos] = useState<any>([]);
  const [bosOption, setBosOption] = useState<any>([]);
  const route = useHistory();
  const [logErr, setLogErr] = useState<any>("");
  const [SubKegAndBos, setSubKegAndBos] = useState([
    { sub_kegiatan: "", penggunaan_bos: "" },
  ]);

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
    route.push("/usulan/kegiatan/list");
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
    const [before1, after1] = snp.toString().split(",");
    const reqBody: any = {
      tipe_usulan: 1,
      tahun: 2021,
      usulan: {
        tahun: 2021,
        kode_snp: snp.length === 0 ? refSnp[0].kode : before1,
        nama_snp: snp.length === 0 ? refSnp[0].nama : after1,
        keterangan: keterangan,
        usulan_nama_kegiatan: usulan,
        pengusul: madrasah,
        no_tiket:
          localStorage.getItem("usulankegiatan") !== null
            ? localStorage.getItem("usulankegiatan")!.length.toString()
            : "0",
        sub_kegiatan: tmpSub,
      },
      aksi: "aksi",
      isNew: true,
    };
    // console.log(reqBody);
    if (!usulan) {
      setLogErr("nama usulan tidak boleh kosong");
    } else if (keterangan.length === 0) {
      setLogErr("keterangan tidak boleh kosong");
    } else {
      try {
        await usulanService.saveOffline(reqBody, "usulankegiatan1");
        backTo();
      } catch (error) {
        setLogErr(error.response.data.return);
      }
    }
  };
  return (
    <>
      <BreadCrumb data={item} title="Komponen Usulan" />

      <div className="mx-5">
        <SectionTitle>Usulan Kegiatan Madrasah</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <span className="text-red-500 align-middle">{logErr}</span>
          <Label className="mt-4">
            <span>Standard Kegiatan</span>
            <Select
              className="mt-1"
              onChange={(e: any) => {
                setSnp(e.currentTarget.value);
              }}
              valid={
                snp.length !== 0
                  ? true
                  : logErr !== "standar pendidikan tidak boleh kosong"
                  ? true
                  : false
              }
            >
              {refSnp
                ? refSnp.map((data: any, key: any) => (
                    <option
                      key={data.nama}
                      id={data.nama}
                      value={data.kode + "," + data.nama}
                    >
                      {data.nama}
                    </option>
                  ))
                : "Silahkan Sinkrokan Data"}
            </Select>
          </Label>
          <Label className="mt-4">
            <span>Usulan Kegiatan</span>
            <Input
              type="text"
              className="mt-1"
              onChange={(e) => setUsulan(e.currentTarget.value)}
              id="usulan"
              placeholder="Usulan Kegiatan"
              valid={usulan.length !== 0 ? true : logErr ? false : true}
            />
          </Label>
          {SubKegAndBos.map((x, i) => {
            return (
              <div key={i}>
                <Label className="mt-4">
                  <span>
                    {i + 1} - Usulan Sub Kegiatan{" "}
                    {SubKegAndBos.length !== 1 && (
                      <i
                        className="bg-red-500 text-white p-1 px-2 ml-2 rounded-sm hover:bg-red-700 cursor-pointer"
                        onClick={() => handleRemoveClick(i)}
                      >
                        <FontAwesomeIcon icon={faMinus} size="sm" />
                      </i>
                    )}
                    {SubKegAndBos.length - 1 === i && (
                      <i
                        onClick={handleAddClick}
                        className="bg-blue-500 text-white p-1 px-2 ml-2 rounded-sm hover:bg-blue-700 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </i>
                    )}
                  </span>
                  <Input
                    defaultValue={x.sub_kegiatan}
                    onChange={(e: any) => {
                      let x: any = {
                        name: "sub_kegiatan",
                        value: e.target.value,
                      };
                      handleSubKegAndBosChange(x, i);
                    }}
                    className="mt-1"
                    placeholder="Usulan Kegiatan"
                    valid={
                      subUsulan.length !== 0 ? true : logErr ? false : true
                    }
                  />
                </Label>
                <Label className="mt-4">
                  <span>Usulan Penggunaan Bos</span>

                  <Select
                    className="mt-1"
                    value={x.penggunaan_bos}
                    onChange={(e: any) => {
                      let x: any = {
                        name: "penggunaan_bos",
                        value: e.target.value,
                      };
                      handleSubKegAndBosChange(x, i);
                    }}
                    valid={bos.length !== 0 ? true : logErr ? false : true}
                  >
                    {bosOption
                      ? bosOption.map((data: any, key: any) => (
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
              </div>
            );
          })}

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
              className="mr-2 "
              onClick={backTo}
              type="submit"
              layout="outline"
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
