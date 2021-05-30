import React, { useCallback, useState } from "react";
import { Alert, Button, Modal, ModalFooter } from "@windmill/react-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSync } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import XLSX from "xlsx";

import { testUpload } from "../../../services/v2/referenceservice/komponenbiaya";

function Step2({ nextStep, prevStep }) {
  const [dataTable, setDataTable]: any = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isFail, setisFail] = useState(false);
  const [log, setLog] = useState<any>("");

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const columns: any = [
    {
      name: "Tahun",
      selector: "Tahun",
      sortable: true,
      subHeader: true,
      width: "100px ",
    },
    {
      name: "Kategori",
      selector: "Kategori",
      sortable: true,
    },
    {
      name: "Kode Kategori",
      selector: "Kode Kategori",
      sortable: true,
      width: "100px ",
    },
    {
      name: "Kode Provinsi",
      selector: "Kode Provinsi",
      sortable: true,
      width: "100px ",
    },
    {
      name: "Kode Kabkota",
      selector: "Kode Kabkota",
      sortable: true,
      width: "100px ",
    },
    {
      name: "Kode",
      selector: "Kode",
      sortable: true,
      width: "100px ",
    },
    {
      name: "Nama",
      selector: "Nama",
      sortable: true,
    },
    {
      name: "Spesifikasi",
      selector: "Spesifikasi",
      sortable: true,
    },
    {
      name: "Satuan",
      selector: "Satuan",
      sortable: true,
      width: "100px ",
    },
    {
      name: "Harga 1",
      selector: "Harga 1",
      sortable: true,
      width: "150px ",
    },
    {
      name: "Harga 2",
      selector: "Harga 2",
      sortable: true,
      width: "150px ",
    },
    {
      name: "Harga 3",
      selector: "Harga 3",
      sortable: true,
      width: "150px ",
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: "#1b6fbb",
        textTransform: "uppercase",
        color: "white",
      },
    },
  };

  const [isReading, setIsReading] = useState(false);

  const uploadTest = async (e: any) => {
    setIsLoading(true);
    showDetails();
    try {
      const res: any = await testUpload(dataTable);
      setLog(res);
      setisSuccess(true);
      setisFail(false);
      setIsLoading(false);
    } catch (error) {
      if (error.response) setLog(error.response.data.return);
      else setLog(error.message);

      setisSuccess(false);
      setisFail(true);
      setIsLoading(false);
    }
  };
  const handleFileChange = useCallback((e: any) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    showDetails();
    setIsLoading(true);

    try {
      reader.onload = function (e: any) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        var firstSheet = workbook.SheetNames[0];
        setIsReading(false);
        const elements = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
        console.log("Excel read OK!");
        console.log("Found " + elements.length + " elements");
        console.log("JSON size", JSON.stringify(elements).length, "bytes");
        setDataTable(elements);
        console.log(elements);
        setIsLoading(false);
        setisSuccess(true);
        setisFail(false);
        setIsLoading(false);
      };
      setIsReading(true);
      reader.readAsArrayBuffer(file);
    } catch (error) {}
  }, []);
  function hideDetails() {
    setIsModalOpen(false);
  }
  function showDetails() {
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <span>
          <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
          {isReading ? <p>Reading...</p> : null}
        </span>{" "}
        &nbsp;
        <span className="ml-1 mt-3">
          {dataTable.length > 0 ? (
            <Button
              onClick={uploadTest}
              className="flex mt-7 text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-2 rounded-md"
            >
              <span className="text-xs">Prosses Data</span>
            </Button>
          ) : (
            ""
          )}
        </span>{" "}
        &nbsp;
        <span>{log}</span>
        <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md w-full">
          {dataTable.length > 0 ? (
            <DataTableExtensions
              subHeader={columns}
              columns={columns}
              data={dataTable}
            >
              <DataTable
                key={"asd"}
                subHeader={false}
                columns={columns}
                data={dataTable}
                noHeader
                responsive={true}
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
                customStyles={customStyles}
                overflowYOffset="hidden"
              />
            </DataTableExtensions>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-row justify-end my-3 space-x-2">
          <Button
            onClick={prevStep}
            className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-2 rounded-md"
          >
            <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
            <span className="text-xs">Kembali</span>
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

export default Step2;
