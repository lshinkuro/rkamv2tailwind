import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Label,
  Modal,
  ModalFooter,
  Select,
} from "@windmill/react-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDownload,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import * as komponenBiayaService from "../../../services/v2/referenceservice/komponenbiaya";
import { ExportToExcel } from "../../../components/Export/ExportToExcel";

function Step1({ nextStep }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isFail, setisFail] = useState(false);
  const [log, setLog] = useState<any>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const refProvinsi: { kode: string; nama: string }[] = JSON.parse(
    localStorage.getItem("provdropdown")!
  );
  const refKabkota: {
    kode: string;
    nama: string;
    kode_provinsi: string;
  }[] = JSON.parse(localStorage.getItem("kabkotadropdown")!);
  const [selectedProvinsi, setSelectedProvinsi] = useState(refProvinsi[0].kode);
  const [selectedKabkota, setSelectedKabkota] = useState(
    refKabkota.find((el) => el.kode_provinsi === selectedProvinsi)?.kode
  );

  const downloadExcelTemplate = async () => {
    setIsLoading(true);
    showDetails();
    try {
      const res: any = await komponenBiayaService.getJsonXlsx(
        selectedProvinsi,
        selectedKabkota ? selectedKabkota : ""
      );
      setLog("berhasil");
      exportToXlsx(res, "template-komponen-biaya");
      setIsLoading(false);
      setisSuccess(true);
      setisFail(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [selectedProvinsi]);

  useEffect(() => {}, [selectedKabkota]);

  const exportToXlsx = (apiData: any, fileName: any) => {
    console.log(apiData);
    ExportToExcel(apiData, fileName);
  };

  function hideDetails() {
    setIsModalOpen(false);
  }
  function showDetails() {
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-col  md:flex-row gap-2 ">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Provinsi</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Provinsi"
                defaultValue={refProvinsi[0].kode}
                onChange={(e: any) => {
                  setSelectedProvinsi(e.currentTarget.value);
                }}
              >
                {refProvinsi.map((el) => {
                  return (
                    <option key={el.kode} value={el.kode}>
                      {el.nama}
                    </option>
                  );
                })}
              </Select>
            </Label>
          </div>
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Kab/Kota</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Kab/Kota"
                onChange={(e: any) => {
                  setSelectedKabkota(e.currentTarget.value);
                }}
              >
                {refKabkota.map((el) => {
                  if (el.kode_provinsi === selectedProvinsi)
                    return (
                      <option key={el.kode} value={el.kode}>
                        {el.nama}
                      </option>
                    );
                })}
              </Select>
            </Label>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row gap-2 mt-2">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Export Data</span>
              <span className="text-red-500">*</span>
            </Label>
            <Button
              onClick={downloadExcelTemplate}
              className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-2 rounded-md"
            >
              <FontAwesomeIcon icon={faDownload} />
              <span className="text-xs ml-2">Download</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-row justify-end my-3 space-x-2">
          <Button
            onClick={nextStep}
            className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-2 rounded-md"
          >
            <span className="text-xs">Lanjut</span>
            <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
          </Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={hideDetails}>
          {isLoading ? (
            <Alert type="info">
              Sedang Membaca File{" "}
              <FontAwesomeIcon className="ml-2" icon={faSync} spin size="sm" />
            </Alert>
          ) : null}
          {isSuccess ? (
            <Alert
              type="success"
              onClose={() => {
                setisSuccess(false);
              }}
            >
              {log ? log : "berhasil"}
            </Alert>
          ) : null}
          {isFail ? (
            <Alert
              type="danger"
              onClose={() => {
                setisFail(false);
              }}
            >
              {log ? log : "gagal"}
            </Alert>
          ) : null}
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={hideDetails}>
                Ok
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={hideDetails}>
                Ok
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default Step1;
