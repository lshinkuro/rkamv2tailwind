import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Label,
  Textarea,
  Button,
  Card,
} from "@windmill/react-ui";
import { SearchIcon } from "../../../../../icons";
import { BreadCrumb } from "../../../../../components";
import { Main, LogButton, HeadTable } from "../List/style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faEdit,
  faEye,
  faPlus,
  faMinus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import InputModal from "../Component/modal";
import * as pService from "../../../../../services/v2/planningservice/index";

import Headerz from "../header";
import { useLocation, useHistory } from "react-router-dom";
import { formatRupiah, getBulan, uuidv4 } from "../../../../../utils/helper";

const TembahRencanaKegiatanDanAnggaran: any = () => {
  const item = ["Home", "Rencana", "Kegiatan", "Rincian", "Tambah"];
  const route = useHistory();
  const location = useLocation();
  let patenam: any = location.pathname.split("rincian/").pop();
  let patanam: any = patenam.split("/add");
  const passing: any = location.state;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>("");
  const [pendapatan, setPendapatan] = useState<any>({});
  const [rekapSumberDana, rekapSumberDanaSet] = useState<any>({});
  const kSatuan: any = JSON.parse(localStorage.getItem("satuan")!) || [];
  const RSumberDana: any =
    JSON.parse(localStorage.getItem("rencana/rincian/rekapsumberdana")!) || [];
  const kBiaya: any = JSON.parse(localStorage.getItem("jenis-belanja")!) || [];
  const kPajak: any = JSON.parse(localStorage.getItem("kbiaya/pajak")!) || [];

  const optionPendapatan: any =
    JSON.parse(localStorage.getItem("rencana-pendapatan")!) || [];

  let handlePendapatan = async (e) => {
    let tmp0: any = JSON.parse(e);
    let tmp1: any = RSumberDana.filter((obj: any) => {
      return tmp0.kode_sumber_dana.indexOf(obj.kode_sumber_dana) > -1;
      // return tmp0.kode_sumber_dana === obj.kode_sumber_dana;
    });
    rekapSumberDanaSet(tmp1[0]);
    setPendapatan(JSON.parse(e));
  };

  useEffect(() => {
    rekapSumberDanaSet(RSumberDana[0]);
    setPendapatan(optionPendapatan[0]);
  }, [0]);

  function showDetails(data?: any, i?: number) {
    setIsModalOpen(true);
    setModalData({
      data: data,
      index: i,
      handleLoop0: handleLoop0,
    });
  }

  const renderRow = (actor: any, p?: any) => {
    let tmp0: any = kBiaya.filter((obj: any) => {
      return actor.indexOf(obj.kode) > -1;
    });
    return (
      <div className="flex-1 flex-row">
        <Label>
          <span className="text-red-500">*</span> Akun Belanja{" "}
          <Select
            className="mt-1"
            onChange={(e: any) => {
              let [before0, after0] = e.target.value.toString().split(",");
              let x: any = {
                name: "kode_jenis_belanja",
                value: after0,
              };
              handleLoop0(x, p);
              let y: any = {
                name: "jenis_belanja_nama",
                value: before0,
              };
              handleLoop0(y, p);
            }}
            id="jenis"
          >
            <option hidden>Pilih Akun Belanja</option>
            {tmp0
              ? tmp0.map((idz: any, key: any) => (
                  <option key={idz.kode} value={idz.nama + "," + idz.kode}>
                    {idz.kode + " - " + idz.nama}
                  </option>
                ))
              : "Silahkan Sinkrokan Data"}
          </Select>
        </Label>
      </div>
    );
  };

  function hideDetails() {
    setModalData("");
    setIsModalOpen(false);
  }

  const tmpEditBulan = [
    passing.row?.jumlah_bulan1,
    passing.row?.jumlah_bulan2,
    passing.row?.jumlah_bulan3,
    passing.row?.jumlah_bulan4,
    passing.row?.jumlah_bulan5,
    passing.row?.jumlah_bulan6,
    passing.row?.jumlah_bulan7,
    passing.row?.jumlah_bulan8,
    passing.row?.jumlah_bulan9,
    passing.row?.jumlah_bulan10,
    passing.row?.jumlah_bulan11,
    passing.row?.jumlah_bulan12,
  ];
  const months0 = [
    "jumlah_bulan1",
    "jumlah_bulan2",
    "jumlah_bulan3",
    "jumlah_bulan4",
    "jumlah_bulan5",
    "jumlah_bulan6",
    "jumlah_bulan7",
    "jumlah_bulan8",
    "jumlah_bulan9",
    "jumlah_bulan10",
    "jumlah_bulan11",
    "jumlah_bulan12",
  ];

  const loopMonth: any = {
    jumlah_bulan1: 0,
    jumlah_bulan2: 0,
    jumlah_bulan3: 0,
    jumlah_bulan4: 0,
    jumlah_bulan5: 0,
    jumlah_bulan6: 0,
    jumlah_bulan7: 0,
    jumlah_bulan8: 0,
    jumlah_bulan9: 0,
    jumlah_bulan10: 0,
    jumlah_bulan11: 0,
    jumlah_bulan12: 0,
  };

  const handleLooop1 = (e: any, k?: any, i?: any) => {
    const { name, value } = e;
    const list: any = loopMonth;
    list[name] = value;
    handleLoop0(e, i);
  };
  const handleSubmit = async () => {
    try {
      for (let i = 0; i < LoopRincianKegiatan.length; i++) {
        const el0: any = LoopRincianKegiatan[i];
        el0.isNew = true;
        el0.rencana_tanggal_id = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
        el0.rencana_pendapatan_id = pendapatan.id
          ? pendapatan.id
          : optionPendapatan[0].id;
        el0.rencana_kegiatan_id = patanam[0];
        el0.rencana_pendapatan_nama = rekapSumberDana.nama_kode_sumber_dana;
        el0.tahun = JSON.parse(localStorage.getItem("isTahun")!) || 2021;
        el0.total_kuantitas =
          el0.koef1_jumlah +
          el0.koef2_jumlah +
          el0.koef3_jumlah +
          el0.koef4_jumlah;
        el0.activated = "1";
        el0.total_rencana_belanja =
          (Number(el0.koef1_jumlah) +
            Number(el0.koef2_jumlah) +
            Number(el0.koef3_jumlah) +
            Number(el0.koef4_jumlah)) *
            Number(el0.harga_satuan) || passing.row?.total_rencana_belanja;
        el0.kode_harga = el0.kode_harga || passing.row?.kode_harga;
        if (passing?.status === "edit") {
          el0.id = passing.row?.id || uuidv4();
        } else {
          el0.id = uuidv4();
        }
        delete el0.kode_kategori;
      }
      if (passing?.status === "edit") {
        await pService.saveOffline(
          LoopRincianKegiatan[0],
          "rencana-rincian-kegiatan",
          "edit",
          "rencana/rincian"
        );
      } else {
        await pService.saveOffline(
          LoopRincianKegiatan,
          "rencana-rincian-kegiatan",
          "tambah",
          "rencana/rincian"
        );
      }
      alert('oiii')

      console.log(LoopRincianKegiatan);
      // console.log(passing.status);
      route.push({
        pathname: `/rencana/rincian/${passing.passing?.id || passing?.id}/list`,
        state: passing?.passing || passing,
      });
    } catch (error) {
      if (error.response) console.log(error.response.data.return);
      else console.log(error.message);
    }
  };

  const [LoopRincianKegiatan, setLoopRincianKegiatan] = useState([
    {
      id: passing.row?.id || "",
      activated: "",
      total_rencana_belanja: passing.row?.total_rencana_belanja || "",
      rencana_tanggal_id: passing.row?.rencana_tanggal_id || "",
      rencana_kegiatan_id: passing.row?.rencana_kegiatan_id || "",
      rencana_pendapatan_id: passing.row?.rencana_pendapatan_id || "",
      rencana_pendapatan_nama: passing.row?.rencana_pendapatan_nama || "",
      kode_jenis_belanja: passing.row?.kode_jenis_belanja || "",
      jenis_belanja_nama: passing.row?.jenis_belanja_nama || "",
      komponen_biaya_harga_id: passing.row?.komponen_biaya_harga_id || "",
      komponen_biaya_nama: passing.row?.komponen_biaya_nama || "",
      harga_satuan: passing.row?.harga_satuan || "",
      pajak: passing.row?.pajak || "",
      koef_persen_pajak: passing.row?.koef_persen_pajak || "",
      kategori_komponen_biaya_nama:
        passing.row?.kategori_komponen_biaya_nama || "",
      kode_kategori: "",
      koef1_jumlah: passing.row?.koef1_jumlah || 1,
      koef1_satuan: passing.row?.koef1_satuan || "",
      koef2_jumlah: passing.row?.koef2_jumlah || "",
      koef2_satuan: passing.row?.koef2_satuan || "",
      koef3_jumlah: passing.row?.koef3_jumlah || "",
      koef3_satuan: passing.row?.koef3_satuan || "",
      koef4_jumlah: passing.row?.koef4_jumlah || "",
      koef4_satuan: passing.row?.koef4_satuan || "",

      jumlah_bulan1: passing.row?.jumlah_bulan1 || 0,
      jumlah_bulan2: passing.row?.jumlah_bulan2 || 0,
      jumlah_bulan3: passing.row?.jumlah_bulan3 || 0,
      jumlah_bulan4: passing.row?.jumlah_bulan4 || 0,
      jumlah_bulan5: passing.row?.jumlah_bulan5 || 0,
      jumlah_bulan6: passing.row?.jumlah_bulan6 || 0,
      jumlah_bulan7: passing.row?.jumlah_bulan7 || 0,
      jumlah_bulan8: passing.row?.jumlah_bulan8 || 0,
      jumlah_bulan9: passing.row?.jumlah_bulan9 || 0,
      jumlah_bulan10: passing.row?.jumlah_bulan10 || 0,
      jumlah_bulan11: passing.row?.jumlah_bulan11 || 0,
      jumlah_bulan12: passing.row?.jumlah_bulan12 || 0,

      tahun: "",
      isNew: false,
    },
  ]);

  const handleLoop0 = (e, index) => {
    const { name, value } = e;
    const list = [...LoopRincianKegiatan];
    list[index][name] = value;
    setLoopRincianKegiatan(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...LoopRincianKegiatan];
    list.splice(index, 1);
    setLoopRincianKegiatan(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setLoopRincianKegiatan([
      ...LoopRincianKegiatan,
      {
        id: "",
        activated: "",
        total_rencana_belanja: "",
        rencana_tanggal_id: "",
        rencana_kegiatan_id: "",
        rencana_pendapatan_id: "",
        rencana_pendapatan_nama: "",
        kode_jenis_belanja: "",
        jenis_belanja_nama: "",
        kategori_komponen_biaya_nama: "",
        komponen_biaya_harga_id: "",
        komponen_biaya_nama: "",
        harga_satuan: "",
        pajak: "",
        koef_persen_pajak: "",
        kode_kategori: "",
        koef1_jumlah: 1,
        koef1_satuan: "",
        koef2_jumlah: "",
        koef2_satuan: "",
        koef3_jumlah: "",
        koef3_satuan: "",
        koef4_jumlah: "",
        koef4_satuan: "",

        jumlah_bulan1: 0,
        jumlah_bulan2: 0,
        jumlah_bulan3: 0,
        jumlah_bulan4: 0,
        jumlah_bulan5: 0,
        jumlah_bulan6: 0,
        jumlah_bulan7: 0,
        jumlah_bulan8: 0,
        jumlah_bulan9: 0,
        jumlah_bulan10: 0,
        jumlah_bulan11: 0,
        jumlah_bulan12: 0,

        tahun: "",
        isNew: false,
      },
    ]);
  };
  return (
    <>
      <BreadCrumb data={item} title="Rincian Kegiatan" />
      <Headerz passing={passing?.passing || passing} />

      <Main>
        <div className="flex flex-col md:flex-row gap-2 my-4">
          <div className="flex-1">
            <Select
              className="mt-1"
              onChange={(e: any) => {
                handlePendapatan(e.currentTarget.value);
              }}
              defaultValue={JSON.stringify(pendapatan)}
            >
              {optionPendapatan
                ? optionPendapatan.map((data: any, key: any) => (
                    <option key={key} id={data.id} value={JSON.stringify(data)}>
                      {data.nama_sumber_dana}
                    </option>
                  ))
                : "Silahkan Sinkrokan Data"}
            </Select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 my-4">
          <div className="flex-1">
            {rekapSumberDana?.jumlah
              ? "Pendapatan : " + formatRupiah(rekapSumberDana?.jumlah)
              : ""}
          </div>
          <div className="flex-1 flex-row">
            {rekapSumberDana?.jumlah
              ? "Belanja : " +
                formatRupiah(rekapSumberDana?.sub_total_rencana_belanja)
              : ""}{" "}
            <br />
            {rekapSumberDana?.jumlah
              ? "Belanja Belum Di setujui : " +
                formatRupiah(
                  rekapSumberDana?.sub_total_rencana_belanja_unapproved
                )
              : ""}
          </div>
          <div className="flex-1 flex-row">
            {rekapSumberDana?.jumlah
              ? "Selisih : " + formatRupiah(rekapSumberDana?.selisih)
              : ""}
          </div>
        </div>
      </Main>

      {LoopRincianKegiatan.map((x, i) => {
        return (
          <div key={i}>
            <Card className="m-5  p-3">
              <Label className="mt-4">
                <span>
                  {i + 1} - Rincian Rencana Kegiatan{" "}
                  {LoopRincianKegiatan.length !== 1 && (
                    <i
                      className="bg-red-500 text-white p-1 px-2 ml-2 rounded-sm hover:bg-red-700 cursor-pointer"
                      onClick={() => handleRemoveClick(i)}
                    >
                      <FontAwesomeIcon icon={faMinus} size="sm" />
                    </i>
                  )}
                  {LoopRincianKegiatan.length - 1 === i && (
                    <i
                      title="Tambah Rincian Kegiatan"
                      onClick={handleAddClick}
                      className="bg-blue-500 text-white p-1 px-2 ml-2 rounded-sm hover:bg-blue-700 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPlus} size="sm" />
                    </i>
                  )}
                </span>
              </Label>

              {/* pppppppp */}
              <div className="flex flex-col md:flex-row gap-1 my-4">
                <div className="flex-1">
                  <Label>
                    <span className="text-red-500">*</span> Komponen biaya{" "}
                    <div className="flex flex-row ">
                      <div>
                        <Input
                          className="mt-1"
                          placeholder=""
                          disabled
                          defaultValue={
                            LoopRincianKegiatan[i].komponen_biaya_nama ||
                            passing.row?.komponen_biaya_nama
                          }
                        />
                      </div>
                      <div
                        title="Tambah Komponen Biaya"
                        className="bg-blue-500 p-3 rounded-md mr-2 text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
                        onClick={(e: any) => {
                          showDetails("", i);
                        }}
                      >
                        <SearchIcon className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </div>
                  </Label>
                </div>

                {LoopRincianKegiatan[i].komponen_biaya_nama ? (
                  renderRow(LoopRincianKegiatan[i].kode_kategori, i)
                ) : (
                  <div className="flex-1 flex-row">
                    <Label>
                      <span className="text-red-500">*</span> Akun Belanja{" "}
                      <Select className="mt-1">
                        {LoopRincianKegiatan[0].komponen_biaya_nama > 0 ? (
                          <option hidden>Pilih Pajak</option>
                        ) : (
                          <option hidden>Silahkan Pilih Komponen Biaya</option>
                        )}
                      </Select>
                    </Label>
                  </div>
                )}

                <div className="flex-1 flex-row">
                  <Label>
                    <span className="text-red-500">*</span> Pajak{" "}
                    <Select
                      className="mt-1"
                      defaultValue={
                        passing.row?.pajak +
                        "," +
                        passing.row?.koef_persen_pajak
                      }
                      onChange={(e: any) => {
                        let [before0, after0] = e.target.value
                          .toString()
                          .split(",");
                        let x: any = {
                          name: "pajak",
                          value: before0,
                        };
                        let y: any = {
                          name: "koef_persen_pajak",
                          value: after0,
                        };
                        handleLoop0(x, i);
                        handleLoop0(y, i);
                      }}
                      id="jenis"
                    >
                      <option hidden>Pilih Pajak</option>
                      {kPajak
                        ? kPajak.map((idz: any, key: any) => (
                            <option
                              key={idz.kode}
                              value={idz.nama + "," + idz.koefisien}
                            >
                              {idz.nama +
                                "(Koefisien:" +
                                idz.koefisien * 100 +
                                "%"}
                            </option>
                          ))
                        : "Silahkan Sinkrokan Data"}
                    </Select>
                  </Label>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 my-4">
                <div className="flex-1 ">
                  <p className="text-sm">
                    Kategori :
                    {LoopRincianKegiatan[i].kategori_komponen_biaya_nama ||
                      passing.row?.kategori_komponen_biaya_nama}
                  </p>
                </div>
                <div className="flex-1 flex-row">
                  <p className="text-sm">
                    Nama :{" "}
                    {LoopRincianKegiatan[i].jenis_belanja_nama ||
                      passing.row?.jenis_belanja_nama}{" "}
                    <br />
                  </p>
                </div>
                <div className="flex-1 flex-row">
                  <p className="text-sm">Spesifikasi : -</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 my-4">
                <div className="flex-1">
                  <p className="text-sm">
                    Harga Satuan :{" "}
                    {formatRupiah(
                      Number(
                        LoopRincianKegiatan[i].harga_satuan ||
                          passing.row?.harga_satuan ||
                          0
                      )
                    )}
                  </p>
                </div>
                <div className="flex-1 flex-row">
                  <p className="text-sm"></p>
                </div>
                <div className="flex-1 flex-row">
                  <p className="text-sm">
                    Pajak : {LoopRincianKegiatan[i].pajak || passing.row?.pajak}
                  </p>
                </div>
              </div>

              <div className="flex flex-col my-4 ">
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="text-red-500">* </span>Koefisien
                    (perkalian)
                  </p>
                </div>
                <div className="flex flex-1 flex-col md:flex-row my-3 gap-2">
                  <div className="flex-1 flex flex-col md:flex-row">
                    <div className="flex-1">
                      <Input
                        className="mt-1"
                        type="number"
                        placeholder={""}
                        defaultValue={passing.row?.koef1_jumlah}
                        onChange={(e) => {
                          let x: any = {
                            name: "koef1_jumlah",
                            value: Number(e.currentTarget.value),
                          };
                          handleLoop0(x, i);
                        }}
                      />
                    </div>
                    <div className="flex-1 ml-1">
                      <Select
                        className="mt-1"
                        disabled
                        defaultValue={passing.row?.koef1_satuan}
                        onChange={(e) => {
                          let x: any = {
                            name: "koef1_satuan",
                            value: e.target.value,
                          };
                          handleLoop0(x, i);
                        }}
                      >
                        {kSatuan
                          ? kSatuan.map((idz: any, key: any) => (
                              <option key={idz.nama} value={idz.nama}>
                                {idz.nama}
                              </option>
                            ))
                          : "Silahkan Sinkrokan Data"}
                      </Select>
                    </div>
                    <div className="flex-1 ml-1">
                      <Input
                        type="number"
                        className="mt-1"
                        placeholder={""}
                        defaultValue={passing.row?.koef2_jumlah}
                        onChange={(e) => {
                          let x: any = {
                            name: "koef2_jumlah",
                            value: Number(e.currentTarget.value),
                          };
                          handleLoop0(x, i);
                        }}
                      />
                    </div>
                    <div className="flex-1 ml-1">
                      <Select
                        className="mt-1"
                        defaultValue={passing.row?.koef2_satuan}
                        onChange={(e) => {
                          let x: any = {
                            name: "koef2_satuan",
                            value: e.target.value,
                          };
                          handleLoop0(x, i);
                        }}
                      >
                        <option hidden>pilih satuan 2</option>
                        {kSatuan
                          ? kSatuan.map((idz: any, key: any) => (
                              <option key={idz.nama} value={idz.nama}>
                                {idz.nama}
                              </option>
                            ))
                          : "Silahkan Sinkrokan Data"}
                      </Select>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row">
                    <div className="flex-1">
                      <Input
                        type="number"
                        className="mt-1"
                        placeholder={""}
                        defaultValue={passing.row?.koef3_jumlah}
                        onChange={(e) => {
                          let x: any = {
                            name: "koef3_jumlah",
                            value: Number(e.currentTarget.value),
                          };
                          handleLoop0(x, i);
                        }}
                      />
                    </div>
                    <div className="flex-1 ml-1">
                      <Select
                        className="mt-1"
                        defaultValue={passing.row?.koef3_satuan}
                        onChange={(e) => {
                          let x: any = {
                            name: "koef3_satuan",
                            value: e.target.value,
                          };
                          handleLoop0(x, i);
                        }}
                      >
                        <option hidden>pilih satuan 3</option>
                        {kSatuan
                          ? kSatuan.map((idz: any, key: any) => (
                              <option key={idz.nama} value={idz.nama}>
                                {idz.nama}
                              </option>
                            ))
                          : "Silahkan Sinkrokan Data"}
                      </Select>
                    </div>
                    <div className="flex-1 ml-1">
                      <Input
                        type="number"
                        className="mt-1"
                        placeholder={""}
                        defaultValue={passing.row?.koef4_jumlah}
                        onChange={(e) => {
                          let x: any = {
                            name: "koef4_jumlah",
                            value: Number(e.currentTarget.value),
                          };
                          handleLoop0(x, i);
                        }}
                      />
                    </div>
                    <div className="flex-1 ml-1">
                      <Select
                        className="mt-1"
                        defaultValue={passing.row?.koef4_satuan}
                        onChange={(e) => {
                          let x: any = {
                            name: "koef4_satuan",
                            value: e.target.value,
                          };
                          handleLoop0(x, i);
                        }}
                      >
                        <option hidden>pilih satuan 4</option>
                        {kSatuan
                          ? kSatuan.map((idz: any, key: any) => (
                              <option key={idz.nama} value={idz.nama}>
                                {idz.nama}
                              </option>
                            ))
                          : "Silahkan Sinkrokan Data"}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 my-4">
                <div className="flex-1">
                  <p className="text-sm">
                    Perkalian :{" "}
                    {LoopRincianKegiatan[i].koef1_jumlah &&
                    LoopRincianKegiatan[i].koef1_satuan
                      ? LoopRincianKegiatan[i].koef1_jumlah +
                        " " +
                        LoopRincianKegiatan[i].koef1_satuan
                      : ""}
                    {LoopRincianKegiatan[i].koef2_jumlah &&
                    LoopRincianKegiatan[i].koef2_satuan
                      ? " x " +
                        LoopRincianKegiatan[i].koef2_jumlah +
                        " " +
                        LoopRincianKegiatan[i].koef2_satuan
                      : ""}
                    {LoopRincianKegiatan[i].koef3_jumlah &&
                    LoopRincianKegiatan[i].koef3_satuan
                      ? " x " +
                        LoopRincianKegiatan[i].koef3_jumlah +
                        " " +
                        LoopRincianKegiatan[i].koef3_satuan
                      : ""}
                    {LoopRincianKegiatan[i].koef4_jumlah &&
                    LoopRincianKegiatan[i].koef4_satuan
                      ? " x " +
                        LoopRincianKegiatan[i].koef4_jumlah +
                        " " +
                        LoopRincianKegiatan[i].koef4_satuan
                      : ""}
                  </p>
                </div>
                <div className="flex-1 flex-row">
                  <p className="text-sm">
                    Kuantitas :{" "}
                    {Number(LoopRincianKegiatan[i].koef1_jumlah) +
                      Number(LoopRincianKegiatan[i].koef2_jumlah) +
                      Number(LoopRincianKegiatan[i].koef3_jumlah) +
                      Number(LoopRincianKegiatan[i].koef4_jumlah)}
                  </p>
                </div>
                <div className="flex-1 flex-row">
                  <p className="text-sm">
                    Total Harga :{" "}
                    {formatRupiah(
                      (Number(LoopRincianKegiatan[i].koef1_jumlah) +
                        Number(LoopRincianKegiatan[i].koef2_jumlah) +
                        Number(LoopRincianKegiatan[i].koef3_jumlah) +
                        Number(LoopRincianKegiatan[i].koef4_jumlah)) *
                        Number(LoopRincianKegiatan[i].harga_satuan)
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col my-4 ">
                <div className="flex-1">
                  {" "}
                  <p className="text-sm">
                    <span className="text-red-500">*</span> Anggaran Kas Belanja
                  </p>
                </div>
                <div className="flex-1 my-3">
                  {" "}
                  <p className="text-sm">
                    Kuantitas :{" "}
                    {Number(LoopRincianKegiatan[i].jumlah_bulan1) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan2) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan3) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan4) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan5) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan6) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan7) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan8) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan9) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan10) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan11) +
                      Number(LoopRincianKegiatan[i].jumlah_bulan12)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {months0.map((m, k) => (
                  <div className="">
                    <Label>
                      <span className="text-gray-400">
                        {" "}
                        <span className="text-red-500">*</span> {getBulan(k)}{" "}
                      </span>
                      <br />
                      {(passing.bulan_pelaksanaan_start ||
                        passing.passing?.bulan_pelaksanaan_start) === k ||
                      (passing.bulan_pelaksanaan_end ||
                        passing.passing?.bulan_pelaksanaan_end) === k ? (
                        <Input
                          type="number"
                          className="mt-1"
                          defaultValue={tmpEditBulan[k]}
                          onChange={(e: any) => {
                            let x: any = {
                              name: m,
                              value: Number(e.currentTarget.value),
                            };
                            handleLooop1(x, k, i);
                          }}
                        />
                      ) : (
                        <Input
                          type="number"
                          defaultValue={0}
                          className="mt-1"
                          disabled
                        />
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      })}

      <hr className="my-3" />
      <div className="flex justify-end m-2  ">
        <div className="gap-2">
          <Button
            layout="outline"
            onClick={() => {
              route.push({
                pathname: `/rencana/rincian/${
                  passing.passing?.id || passing?.id
                }/list`,
                state: passing?.passing || passing,
              });
            }}
            className="mr-1"
          >
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </div>
      </div>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
    </>
  );
};

export default TembahRencanaKegiatanDanAnggaran;

const WithLabel = (Component) => {
  return (props) => (
    <Label>
      <span className="text-gray-800 text-sm">
        {" "}
        <span className="text-red-500 ">*</span>
        {props.nama}
      </span>
      <Component {...props} />
    </Label>
  );
};

const MyInput = (props) => (
  <Input
    className="mt-1"
    placeholder={props.inputPlaceholder}
    defaultValue={props.inputValue}
    onChange={props.inputOnChange}
  />
);

const MyTextArea = (props) => (
  <Textarea
    className="mt-1"
    placeholder={props.inputPlaceholder}
    defaultValue={props.inputValue}
    onChange={props.inputOnChange}
  />
);

const MySelectLabel = (props) => (
  <Select className="mt-1" onChange={props.inputOnChange} {...props}>
    {props.datamap.map((item, index) => {
      return <option key={index}>{item}</option>;
    })}
  </Select>
);

const MyDateInput = (props) => (
  <div className="w-full">
    <DatePicker
      selected={props.selected}
      dateFormat="ddmmyyyy"
      showFullMonthYearPicker
      onChange={props.inputOnChange}
      className=" mt-2 active:block text-sm focus:outline-none form-input leading-5 
                   focus:border-purple-800  focus:shadow-outline-purple "
    />
  </div>
);

const InputWithLabel = WithLabel(MyInput);
const InputWithSelectLabel = WithLabel(MySelectLabel);
const InputWithTextArea = WithLabel(MyTextArea);
const InputWithDate = WithLabel(MyDateInput);
