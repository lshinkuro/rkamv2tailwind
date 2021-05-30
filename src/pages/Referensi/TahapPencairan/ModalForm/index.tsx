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
import * as rService from "../../../../services/reference";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const ModalForm: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [nama, setNama] = useState<any>("");
  const [tahun, setTahun] = useState<any>("");
  const [logErr, setLogErr] = React.useState<any>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [TerminList, setTerminList] = useState([{ tahap: "", nilai: "" }]);
  const [TglMulai, setTglMulai] = useState("");
  const [TglBerakhir, setTglBerakhir] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
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

  // handle input change
  const handleTerminListChange = (e, index) => {
    const { name, value } = e;
    const list = [...TerminList];
    list[index][name] = value;
    setTerminList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...TerminList];
    list.splice(index, 1);
    setTerminList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setTerminList([...TerminList, { tahap: "", nilai: "" }]);
  };

  if (data.action === "activated") {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          {isChecked
            ? "Non-Aktifkan Tahap Pencairan"
            : "Aktifkan Tahap Pencairan"}
        </ModalHeader>
        <ModalBody>
          Yakin{" "}
          {isChecked
            ? "Non-Aktifkan Tahap Pencairan"
            : "Aktifkan Tahap Pencairan"}
          ?
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
        <ModalHeader>{data ? "Edit" : "Tambah"} Tahapan Pencairan</ModalHeader>
        <ModalBody>
          <span className="text-red-500 align-middle">{logErr}</span>
          <div className="flex flex-col p-2 ">
            <div className="w-auto">
              <Label>
                <span className="text-gray-400">Tahun *</span>
                <Input
                  className="mt-1"
                  placeholder="Silahkan isi Nama "
                  onChange={(e) => setNama(e.currentTarget.value)}
                  defaultValue={data ? data.nama : ""}
                  valid={nama.length !== 0 ? true : logErr ? false : true}
                />
              </Label>
              <Label>
                <span className="text-gray-400 ">Tgl.Mulai *</span>
                <Input
                  id="startdate"
                  defaultValue={
                    startDate.length === 0
                      ? data?.tgl_start.toString()
                      : startDate
                  }
                  type="date"
                  onChange={(event: any) => setTglMulai(event.target.value)}
                />
              </Label>
              <Label>
                <span className="text-gray-400 ">Tgl.Berakhir *</span>
                <Input
                  id="startdate"
                  defaultValue={
                    startDate.length === 0
                      ? data?.tgl_start.toString()
                      : startDate
                  }
                  type="date"
                  onChange={(event: any) => setTglBerakhir(event.target.value)}
                />
              </Label>
              {TerminList.map((x, i) => {
                return (
                  <Label className="mt-4">
                    <span>
                      Termin ke - {i + 1}
                      {TerminList.length !== 1 && (
                        <i
                          className="bg-red-500 text-white p-1 px-2 ml-2 rounded-sm hover:bg-red-700 cursor-pointer"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <FontAwesomeIcon icon={faMinus} size="sm" />
                        </i>
                      )}
                      {TerminList.length - 1 === i && (
                        <i
                          onClick={handleAddClick}
                          className="bg-blue-500 text-white p-1 px-2 ml-2 rounded-sm hover:bg-blue-700 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faPlus} size="sm" />
                        </i>
                      )}
                    </span>
                    <br />
                    <span className="text-gray-400 ">Tahap *</span>
                    <Input
                      className="mt-1"
                      placeholder=""
                      defaultValue={x.tahap}
                      onChange={(e: any) => {
                        let payload = {
                          name: "tahap",
                          value: e.target.value,
                        };
                        handleTerminListChange(payload, i);
                      }}
                    />
                    <span className="text-gray-400 ">Nilai *</span>
                    <Input
                      className="mt-1"
                      placeholder=""
                      defaultValue={x.nilai}
                      onChange={(e: any) => {
                        let payload = {
                          name: "nilai",
                          value: e.target.value,
                        };
                        handleTerminListChange(payload, i);
                      }}
                    />
                  </Label>
                );
              })}
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

export default ModalForm;
