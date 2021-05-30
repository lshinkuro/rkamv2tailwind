import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Select as SelectW,
  Input,
  Card,
} from "@windmill/react-ui";
import "react-datepicker/dist/react-datepicker.css";
import * as plService from "../../../services/v2/planningservice/index";
// import * as rencanaKegiatanService from "../../../services/v2/planningservice/rencanakegiatan";
// import * as uService from "../../../../services/v2/planningservice/usulanservice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

type AddModalProps = {
  isModalOpen: boolean;
  data?: any;
  onClose: () => void;
  hideDetails: () => void;
};

const InputModal: React.FC<AddModalProps> = ({
  isModalOpen,
  data,
  hideDetails,
  onClose,
}) => {
  const refSnp: any[] = JSON.parse(localStorage.getItem("snp")!) || [];
  const refKegiatanSnp: any[] =
    JSON.parse(localStorage.getItem("kegiatan-snp")!) || [];
  const refSubKegiatan: any[] =
    JSON.parse(localStorage.getItem("sub-kegiatan")!) || [];
  const refKelompokSasaran: any[] =
    JSON.parse(localStorage.getItem("kelompoksasaran")!) || [];
  const [kegiatanOption, setKegiatanOption] = useState<any>(
    refKegiatanSnp.filter((el0: any) => el0.kode_snp === data?.kode_snp) || []
  );
  const [subKegiatanOption, setSubKegiatanOption] = useState<any>(
    refSubKegiatan.filter(
      (el1: any) =>
        (el1.kode_snp === data?.kode_snp || 1) &&
        (el1.kode_kegiatan === data?.kode_kegiatan || 1)
    )
  );
  const [sasaranOption, setSasaranOption] = useState<any>([]);
  const [satuanOption, setSatuanOption] = useState<any>([]);

  const dataEdit: any = data || [];
  const [snpNama, setSnpNama] = useState<any>(
    dataEdit ? dataEdit.nama_snp : ""
  );
  const [snpKode, setSnpKode] = useState<any>("");

  const [snpKegiatanNama, setSnpKegiatanNama] = useState<any>("");
  const [snpKegiatanKode, setSnpKegiatanKode] = useState<any>("");
  const [snpSubKegiatanNama, setSnpSubKegiatanNama] = useState<any>("");
  const [snpSubKegiatanKode, setSnpSubKegiatanKode] = useState<any>("");

  const [selectedSubKegiatan, setSelectedSubKegiatan] = useState<any>("");
  const [selectedKelompokSasaran, setSelectedKelompokSasaran] = useState<any>(
    []
  );
  const [selectedIndikatorOutput, setSelectedIndikatorOutput] = useState<any>(
    ""
  );
  const [selectedIndikatorHasil, setSelectedIndikatorHasil] = useState<any>("");
  const [selectedSatuanOutput, setSelectedSatuanOutput] = useState<any>("");
  const [selectedSatuanHasil, setSelectedSatuanHasil] = useState<any>("");
  const [selectedTargetOutput, setSelectedTargetOutput] = useState<any>(0);
  const [selectedTargetHasil, setSelectedTargetHasil] = useState<any>(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 7)
  );
  var CurrentDate = new Date();
  CurrentDate.setMonth(CurrentDate.getMonth() + 1);
  const [endDate, setEndDate] = useState(CurrentDate.toISOString().slice(0, 7));
  const [logErr, setLogErr] = useState<any>("");

  useEffect(() => {
    setSnpKode(data?.kode_snp);
    setKegiatanOption(
      refKegiatanSnp.filter((el0: any) => el0.kode_snp === data?.kode_snp || 1)
    );
    setSubKegiatanOption(
      refSubKegiatan.filter(
        (el1: any) =>
          (el1.kode_snp === data?.kode_snp || 1) &&
          (el1.kode_kegiatan === data?.kode_kegiatan || 1)
      )
    );
    setSnpKegiatanNama(data?.nama_kegiatan || "");

    setSatuanOption(JSON.parse(localStorage.getItem("satuan")!));

    let tmp0: any = [];
    refKelompokSasaran.forEach((el: any) => {
      tmp0.push({
        value: el.kode,
        label: el.nama,
      });
    });
    setSasaranOption(tmp0);
  }, [1]);
  const onSnpChange = (e: any) => {
    const [before0, after0] = e.toString().split(",");
    setSnpKode(before0);
    setSnpNama(after0);
    setKegiatanOption(
      refKegiatanSnp.filter((el: any) => el.kode_snp === before0)
    );
  };

  const onKegiatanChange = (e: any) => {
    const [before0, after0] = e.toString().split(",");
    setSnpKegiatanKode(before0);
    setSnpKegiatanNama(after0);
    setSubKegiatanOption(
      refSubKegiatan.filter(
        (el: any) => el.kode_snp === snpKode && el.kode_kegiatan === before0
      )
    );
  };

  const onSubKegiatanChange = (e: any) => {
    const [before0, after0] = e.toString().split(",");
    setSnpSubKegiatanKode(before0);
    setSnpSubKegiatanNama(after0);
  };

  const settingNotif: any = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const onSubmit = async () => {
    let tmpKegiatan: any = JSON.parse(localStorage.getItem("rencanakegiatan")!);
    let tmp0: any = tmpKegiatan.filter(
      (el) => el.tahun === 2021 && el.kode_sub_kegiatan === snpSubKegiatanKode
    );
    console.log(tmp0);
    let sasaran: any = [];
    let tmp: any = data?.kelompok_sasaran || selectedKelompokSasaran || [];
    if (!data.kode_snp) {
      tmp?.forEach((el) => {
        sasaran.push(el.value);
      });
    } else {
      sasaran = tmp;
    }
    const params: any = {
      bulan_pelaksanaan_start:
        Number(startDate.slice(6, 7)) || data?.bulan_pelaksanaan_start,
      bulan_pelaksanaan_end:
        Number(endDate.slice(6, 7)) || data?.bulan_pelaksanaan_end,
      indikator_hasil: selectedIndikatorHasil || dataEdit.indikator_hasil,
      indikator_hasil_target:
        selectedTargetHasil || dataEdit.indikator_hasil_target,
      indikator_output: selectedIndikatorOutput || dataEdit.indikator_output,
      indikator_output_satuan: !selectedSatuanOutput
        ? dataEdit.indikator_output_satuan
        : selectedSatuanOutput,
      indikator_hasil_satuan: !selectedSatuanHasil
        ? dataEdit.indikator_hasil_satuan
        : selectedSatuanHasil,
      indikator_output_target:
        selectedTargetOutput || dataEdit.indikator_output_target,
      kelompok_sasaran:
        sasaran.length === 0 ? dataEdit.kelompok_sasaran : sasaran,
      kode_snp: !snpKode ? dataEdit.kode_snp : snpKode,
      nama_snp: !snpNama ? dataEdit.nama_snp : snpNama,
      kode_kegiatan: !snpKegiatanKode
        ? dataEdit.kode_kegiatan
        : snpKegiatanKode,
      nama_kegiatan: !snpKegiatanNama
        ? dataEdit.nama_kegiatan
        : snpKegiatanNama,
      kode_sub_kegiatan: !snpSubKegiatanKode
        ? dataEdit.kode_sub_kegiatan
        : snpSubKegiatanKode,
      nama_sub_kegiatan: !snpSubKegiatanNama
        ? dataEdit.nama_sub_kegiatan
        : snpSubKegiatanNama,
      isNew: true,
      tahun: 2021,
      id: data?.id,
    };

    if (!data.kode_snp) {
      if (!snpKode) {
        toast.error("silahkan pilih snp", settingNotif);
        setLogErr("silahkan pilih snp");
      } else if (snpKegiatanKode.length === 0) {
        setLogErr("silahkan pilih kegiatan");
        toast.error("silahkan pilih kegiatan", settingNotif);
      } else if (!snpSubKegiatanKode) {
        setLogErr("silahkan pilih sub kegiatan");
        toast.error("silahkan pilih sub kegiatan", settingNotif);
      } else if (tmp0.length > 0) {
        setLogErr(
          "Data dengan tahun " +
            2021 +
            ", dan kode sub kegiatan " +
            snpSubKegiatanKode +
            " sudah ada"
        );
        toast.error(
          "Data dengan tahun " +
            2021 +
            ", dan kode sub kegiatan " +
            snpSubKegiatanKode +
            " sudah ada",
          settingNotif
        );
      } else if (!sasaran) {
        setLogErr("silahkan pilih kelompok sasaran");
        toast.error("silahkan pilih kelompok sasaran", settingNotif);
      } else if (selectedIndikatorOutput.length === 0) {
        setLogErr("silahkan pilih Indikator Output");
        toast.error("silahkan isi Indikator Output", settingNotif);
      } else if (selectedIndikatorHasil.length === 0) {
        setLogErr("silahkan pilih Indikator Hasil");
        toast.error("silahkan isi Indikator Hasil", settingNotif);
      } else if (selectedTargetOutput === 0) {
        setLogErr("silahkan isi Indikator Output Target");
        toast.error("silahkan isi Indikator Output Target", settingNotif);
      } else if (selectedSatuanOutput.length === 0) {
        setLogErr("silahkan pilih Satuan Output satuan");
        toast.error("silahkan pilih Satuan Output satuan", settingNotif);
      } else if (selectedTargetHasil === 0) {
        setLogErr("silahkan isi Indikator Hasil Target");
        toast.error("silahkan isi Indikator Hasil Target", settingNotif);
      } else if (selectedSatuanHasil.length === 0) {
        setLogErr("silahkan pilih Indikator Hasil Satuan");
        toast.error("silahkan pilih Indikator Hasil Satuan", settingNotif);
      } else {
        try {
          await plService.saveOffline(params, "rencana/kegiatan");
          clearForm();
        } catch (error) {
          toast.error(error.response.data.return, settingNotif);
        }
      }
    } else {
      try {
        await plService.saveOffline(params, "rencana/kegiatan");
        clearForm();
        sasaran = [];
      } catch (error) {
        toast.error(error.response.data.return, settingNotif);
      }
    }
  };

  const clearForm = async () => {
    setKegiatanOption("");
    setSubKegiatanOption("");
    setSatuanOption("");
    setSelectedSubKegiatan("");
    setSelectedKelompokSasaran("");
    setSelectedIndikatorOutput("");
    setSelectedIndikatorHasil("");
    setSelectedSatuanOutput("");
    setSelectedSatuanHasil("");
    setSelectedTargetOutput("");
    setSelectedTargetHasil("");
    setSnpKode("");
    toast.success("Berhasil Menambahkan Data", settingNotif);
    setLogErr("");
    hideDetails();
  };

  const toMulti = (props: any) => {
    let tmp0: any = props || [];
    let sasaran: any = [];
    tmp0.forEach((el) => {
      sasaran.push({
        label: el,
        value: el,
      });
    });
    return sasaran;
  };

  const getEdit: any = {};
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={hideDetails}
      className="w-full px-6 py-4 mx-2  bg-white  dark:bg-gray-800  sm:m-4 xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md"
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ModalHeader>Rencana Kegiatan</ModalHeader>
      <span className="text-red-400">{logErr}</span>
      <ModalBody>
        <div className="flex flex-col p-2n gap-4 md:max-h-xl md:overflow-hidden max-h-64 overflow-y-scroll">
          <div className="flex  flex-col  md:flex-row gap-2 ">
            <div className="flex-1">
              <Label>
                <span className="text-gray-400">Standar Pendidikan</span>
                <span className="text-red-400">*</span>
                <SelectW
                  id="inputSnp"
                  className="mt-1"
                  onChange={(e: any) => {
                    onSnpChange(e.currentTarget.value);
                  }}
                  // defaultValue={data.kode_snp}
                  defaultValue={data?.kode_snp + "," + data?.nama_snp}
                  valid={snpKode ? true : logErr ? false : true}
                >
                  {!data.edit ? (
                    <option hidden>Pilih Standar Pendidikan</option>
                  ) : (
                    <option
                      key={data?.id}
                      value={data?.kode_snp + "," + data?.nama_snp}
                    >
                      {data?.nama_snp}
                    </option>
                  )}
                  {refSnp
                    ? refSnp.map((toOp: any, key: any) => (
                        <option
                          key={toOp.kode}
                          id={toOp.kode}
                          value={toOp.kode + "," + toOp.nama}
                        >
                          {`${toOp.kode}. ${toOp.nama}`}
                        </option>
                      ))
                    : "Silahkan Sinkrokan Data"}
                </SelectW>
                <span className="text-red-400">
                  {data
                    ? ""
                    : !snpNama
                    ? "Silahkan Pilih Standar Pendidikan"
                    : ""}{" "}
                </span>
              </Label>
            </div>
            <div className="flex-1">
              <Label>
                <span className="text-gray-400">Kegiatan</span>
                <span className="text-red-400">*</span>
                <SelectW
                  id="inputKegiatan"
                  className="mt-1"
                  onChange={(e: any) => {
                    onKegiatanChange(e.currentTarget.value);
                  }}
                  defaultValue={data?.kode_kegiatan + "," + data?.nama_kegiatan}
                  // defaultValue={data?.kode_kegiatan || selectedKegiatan}
                  valid={
                    !isEmpty(snpKegiatanKode) ? true : logErr ? false : true
                  }
                >
                  {!data.edit ? (
                    <option hidden>Pilih Kegiatan</option>
                  ) : (
                    <option
                      key={data?.id}
                      value={data?.kode_kegiatan + "," + data?.nama_kegiatan}
                    >
                      {data?.nama_kegiatan}
                    </option>
                  )}
                  {kegiatanOption
                    ? kegiatanOption.map((data: any, key: any) => (
                        <option
                          key={data.id}
                          id={data.id}
                          value={data.kegiatan.kode + "," + data.kegiatan.nama}
                        >
                          {`${data.kode_kegiatan}. ${data.kegiatan.nama}`}
                        </option>
                      ))
                    : "Silahkan Sinkrokan Data"}
                </SelectW>
                <span className="text-red-400">
                  {snpNama && !snpKegiatanNama ? "Silahkan Pilih Kegiatan" : ""}{" "}
                </span>
              </Label>
            </div>
          </div>

          <div className="flex flex-1 flex-col md:flex-row gap-2">
            <div className="flex-1">
              <Label>
                <span className="text-gray-400">Sub Kegiatan</span>
                <span className="text-red-400">*</span>

                <SelectW
                  className="mt-1"
                  onChange={(e: any) => {
                    onSubKegiatanChange(e.target.value);
                  }}
                  defaultValue={
                    data?.kode_sub_kegiatan + "," + data?.nama_sub_kegiatan
                  }
                  // defaultValue={
                  //   data?.kode_sub_kegiatan || selectedSubKegiatan
                  // }
                  valid={
                    !isEmpty(selectedSubKegiatan) ? true : logErr ? false : true
                  }
                  // value={selectedSubKegiatan}
                >
                  {!data.edit ? (
                    <option hidden>Pilih Sub Kegiatan</option>
                  ) : (
                    <option
                      key={data?.id}
                      value={
                        data?.kode_sub_kegiatan + "," + data?.nama_sub_kegiatan
                      }
                    >
                      {data?.nama_sub_kegiatan}
                    </option>
                  )}
                  {subKegiatanOption
                    ? subKegiatanOption.map((op: any, key: any) => (
                        <option
                          key={op.id}
                          id={op.id}
                          value={op.kode + "," + op.nama}
                        >
                          {`${op.kode}. ${op.nama}`}
                        </option>
                      ))
                    : "Silahkan Sinkrokan Data"}
                </SelectW>
                <span className="text-red-400">
                  {/* {snpNama && snpKegiatanNama && !snpSubKegiatanNama ? "" : "Silahkan Pilih Kegiatan"}{" "} */}
                  {snpSubKegiatanNama.length > 0
                    ? ""
                    : snpKegiatanNama.length > 0
                    ? "Silahkan Pilih Sub Kegiatan"
                    : ""}
                </span>
              </Label>
            </div>
            <div className="flex-1">
              <Label>
                <span className="text-gray-400">Kelompok Sasaran </span>
                <span className="text-red-400">*</span>
                <Select
                  defaultValue={toMulti(data?.kelompok_sasaran)}
                  selected={selectedKelompokSasaran}
                  isMulti
                  name="colors"
                  options={sasaranOption}
                  onChange={setSelectedKelompokSasaran}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Label>
            </div>
          </div>
          <div className="flex flex-1 flex-col md:flex-row gap-2">
            <div className="flex-1">
              <Label>
                <span className="text-gray-400">Waktu Pelaksanaan Awal </span>
                <span className="text-red-400">*</span>
                <br />
                <input
                  id="startdate"
                  
                  value={
                    startDate.length === 0
                      ? "2021-" + data?.bulan_pelaksanaan_start.toString()
                      : startDate
                  }
                  type="month"
                  defaultValue={startDate}
                  onChange={(event: any) => setStartDate(event.target.value)}
                />
              </Label>
            </div>
            <div className="flex-1 ">
              <Label>
                <span className="text-gray-400">Waktu Pelaksanaan Akhir </span>
                <span className="text-red-400">*</span><br />
                <input
                  id="endDate"                  
                  formTarget="yyyy-mm"
                  value={
                    endDate.length === 0
                      ? "2021-" + data?.bulan_pelaksanaan_end.toString()
                      : endDate
                  }
                  type="month"
                  defaultValue={endDate}
                  onChange={(event: any) => setEndDate(event.target.value)}
                />
              </Label>
            </div>
          </div>

          <div className="flex flex-1 flex-col md:flex-row gap-2">
            <div className="flex-1">
              <p>Indikator Output</p>
              <Label>
                <span className="text-gray-400">Output </span>
                <span className="text-red-400">*</span>
                <Input
                  onChange={(e: any) => {
                    setSelectedIndikatorOutput(e.target.value);
                  }}
                  defaultValue={data?.indikator_output}
                  valid={
                    selectedIndikatorOutput.length !== 0
                      ? true
                      : logErr
                      ? false
                      : true
                  }
                  className="mt-1"
                  placeholder=""
                />
              </Label>
            </div>
            <div className="flex-1">
              <p>Indikator Hasil</p>
              <Label>
                <span className="text-gray-400">Hasil </span>
                <span className="text-red-400">*</span>
                <Input
                  onChange={(e: any) => {
                    setSelectedIndikatorHasil(e.target.value);
                  }}
                  className="mt-1"
                  defaultValue={data?.indikator_hasil}
                  valid={
                    selectedIndikatorHasil.length !== 0
                      ? true
                      : logErr
                      ? false
                      : true
                  }
                  placeholder=""
                />
              </Label>
            </div>
          </div>

          <div className="flex flex-1 flex-col md:flex-row gap-2">
            <div className="flex  sm:flex-row flex-1">
              <div className="flex-1">
                <Label className="mr-1">
                  <span className="text-gray-400">Target </span>
                  <span className="text-red-400">*</span>
                  <div className="flex flex-row h-10 w-full rounded-lg relative mt-1">
                    {/* <button data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button> */}
                    <Input
                      onInput={(e) => {
                        e.currentTarget.value = Math.max(
                          0,
                          parseInt(e.currentTarget.value)
                        )
                          .toString()
                          .slice(0, 4);
                      }}
                      defaultValue={
                        data?.indikator_output_target || selectedTargetOutput
                      }
                      valid={
                        selectedTargetOutput !== 0
                          ? true
                          : logErr
                          ? false
                          : true
                      }
                      onChange={(e: any) => {
                        setSelectedTargetOutput(e.target.value);
                      }}
                      type="number"
                      className="focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      id="satuantargetoutput"
                    />
                    {/* <button data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button> */}
                  </div>
                </Label>
              </div>
              <div className="flex-1">
                <Label>
                  <span className="text-gray-400">Satuan </span>
                  <span className="text-red-400">*</span>
                  <SelectW
                    className="mt-1"
                    onChange={(e: any) => {
                      setSelectedSatuanOutput(e.target.value);
                    }}
                    defaultValue={
                      data?.indikator_output_satuan || selectedSatuanOutput
                    }
                    // defaultValue={data?.indikator_output_target}
                    valid={
                      selectedSatuanOutput.length !== 0
                        ? true
                        : logErr
                        ? false
                        : true
                    }
                  >
                    {!data.edit ? (
                      <option hidden>Pilih Satuan</option>
                    ) : (
                      <option
                        key={data?.id}
                        value={data?.indikator_output_satuan}
                      >
                        {data?.indikator_output_satuan}
                      </option>
                    )}
                    {satuanOption
                      ? satuanOption.map((data: any, key: any) => (
                          <option
                            key={data.kode}
                            id={data.kode}
                            value={data.nama}
                          >
                            {`${data.nama}`}
                          </option>
                        ))
                      : "Silahkan Sinkrokan Data"}
                  </SelectW>
                </Label>
              </div>
            </div>
            <div className="flex sm:flex-row flex-1">
              <div className="flex-1">
                <Label className="mr-1">
                  <span className="text-gray-400">Target </span>
                  <span className="text-red-400">*</span>
                  <div className="flex flex-row h-10 w-full rounded-lg relative mt-1">
                    {/* <button data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button> */}
                    <Input
                      onChange={(e: any) => {
                        setSelectedTargetHasil(e.target.value);
                      }}
                      defaultValue={
                        data?.indikator_hasil_target || selectedTargetHasil
                      }
                      onInput={(e) => {
                        e.currentTarget.value = Math.max(
                          0,
                          parseInt(e.currentTarget.value)
                        )
                          .toString()
                          .slice(0, 4);
                      }}
                      valid={
                        selectedTargetHasil !== 0 ? true : logErr ? false : true
                      }
                      type="number"
                      className="focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      id="satuantargethasil"
                    />
                  </div>
                </Label>
              </div>
              <div className="flex-1">
                <Label>
                  <span className="text-gray-400">Satuan </span>
                  <span className="text-red-400">*</span>
                  <SelectW
                    className="mt-1"
                    onChange={(e: any) => {
                      setSelectedSatuanHasil(e.target.value);
                    }}
                    defaultValue={data?.indikator_hasil_satuan}
                    // value={data?.indikator_hasil_satuan || selectedSatuanHasil}
                    valid={
                      selectedSatuanHasil.length !== 0
                        ? true
                        : logErr
                        ? false
                        : true
                    }
                  >
                    {!data.edit ? (
                      <option hidden>Pilih Satuan</option>
                    ) : (
                      <option
                        key={data?.id}
                        value={data?.indikator_hasil_satuan}
                      >
                        {data?.indikator_hasil_satuan}
                      </option>
                    )}
                    {satuanOption
                      ? satuanOption.map((data: any, key: any) => (
                          <option
                            key={data.kode}
                            id={data.kode}
                            value={data.nama}
                          >
                            {`${data.nama}`}
                          </option>
                        ))
                      : "Silahkan Sinkrokan Data"}
                  </SelectW>
                </Label>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block ">
          <Button layout="outline" onClick={onClose}>
            Cancel
          </Button>
          <span>
            {!data.kode_snp ? (
              <Button onClick={onSubmit}>Tambah</Button>
            ) : (
              <Button onClick={onSubmit}>Edit</Button>
            )}
          </span>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={onClose}>
            Cancel
          </Button>
          <span>
            {!data.kode_snp ? (
              <Button onClick={onSubmit}>Tambah</Button>
            ) : (
              <Button onClick={onSubmit}>Edit</Button>
            )}
          </span>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
