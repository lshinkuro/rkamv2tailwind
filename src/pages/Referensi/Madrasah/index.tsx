import React, { useCallback } from "react";
import { BreadCrumb } from "../../../components";
import {
  Label,
  Select,
} from "@windmill/react-ui";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { Main, HeadTable, CustomStyles } from '../../Pencairan/PaguDefinitif/style';
import { Alert, Button } from '@windmill/react-ui';
import { AlertProps } from "@windmill/react-ui/dist/Alert";
import { ExportToExcel } from "../../../components/Export/ExportToExcel";
import XLSX from "xlsx";
import { bulkEditPpk } from "../../../services/users";

function ReferensiMadrasah() {
  const item = ["Home", "Referensi", "Madrasah"];
  const [dataTable, setDataTable]: any = React.useState<any>([]);
  const [dataTableExport, setDataTableExport] = React.useState<any>([]);
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<AlertProps["type"]>(undefined);
  const [alertMessage, setAlertMessage] = React.useState<String>("");
  const [isReading, setIsReading] = React.useState<boolean>(false);
  const [isReadingComplete, setIsReadingComplete] = React.useState<boolean>(false);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [tableRefresh, setTableRefresh] = React.useState<number>(0);
  const [dataUpload, setDataUpload] = React.useState<any[]>([]);

  React.useEffect(() => {
    const response = JSON.parse(localStorage.getItem("profile-madrasah")!) || [];
    setDataTable(response);
    setDataTableExport(response)
  }, [tableRefresh]);

  const columns: any = [
    {
      name: "NSM",
      selector: "nsm",
      sortable: true,
      subHeader: true,
    },
    {
      name: "NPSN",
      selector: "npsn",
      sortable: true,
    },
    {
      name: "Nama Madrasah",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Status Madrasah",
      selector: "status",
      sortable: true,
      cell: (row: any) => (
        <div className="flex items-center">
          {row.status != null && row.status.toLowerCase() === 's' ? 'Swasta' : 'Negeri'}
        </div>
      )
    },
    {
      name: "Jenjang",
      selector: "jenjang",
      sortable: true,
    },
    {
      name: "Alamat",
      selector: "alamat_jalan",
      sortable: true,
    },
    {
      name: "RT",
      selector: "rt",
      sortable: true,
    },
    {
      name: "RW",
      selector: "rw",
      sortable: true,
    },

  ];

  async function downloadExcelTemplate() {
    setAlert(true, "info", "Sedang mengunduh template")
    try {
      const dataMadrasah: [] = JSON.parse(localStorage.getItem("profile-madrasah")!);
      exportToXlsx(dataMadrasah.map((el: any) => { return { 'ID': el.id, 'NSM': el.nsm, 'NAMA SEKOLAH': el.nama, 'PPK': el.kode_level_ppk, } }), "referensi-madrasah");
      setAlert(true, "success", "Berhasil mengunduh template")
    } catch (error) {
      setAlert(true, "danger", "Gagal mengunduh template")
    }
  };

  function setAlert(isAlertOpen: boolean, alertType: AlertProps['type'], alertMessage: String) {
    setIsAlertOpen(isAlertOpen)
    setAlertType(alertType)
    setAlertMessage(alertMessage)
  }

  function exportToXlsx(apiData: any, fileName: any) {
    ExportToExcel(apiData, fileName);
  };

  const handleFileChange = useCallback((e: any) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    setAlert(true, "info", "Sedang mengunggah template")
    try {
      reader.onload = function (e: any) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        var firstSheet = workbook.SheetNames[0];
        setIsReading(false);
        const elements = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]).map((el: any) => { return { madrasah_id: el['ID'], nsm: el['NSM'], nama_madrasah: el['NAMA SEKOLAH'], kode_level_ppk: el['PPK'] } });
        setDataUpload(elements)
        // setDataTable(elements);
        // setDataTableExport(elements)
        setAlert(true, "success", "Berhasil membaca file template")
        setIsReadingComplete(true)
      };
      setIsReading(true);
      reader.readAsArrayBuffer(file);
    } catch (error) {
      setAlert(true, "danger", "Gagal membaca file template")
    }
  }, []);

  async function simpanTemplate(e: any) {
    setAlert(true, "info", "Sedang menyimpan data")
    setIsUploading(true);
    try {
      await bulkEditPpk(dataUpload);
      setAlert(true, "success", "Berhasil menyimpan data")
    } catch (error) {
      setAlert(true, "danger", "Gagal menyimpan data")
    }
    // resetState();
    setIsUploading(false);
  };

  return (
    <>
      <BreadCrumb data={item} title="Madrasah" />
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-col  md:flex-row gap-2 ">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Provinsi</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Provinsi"
              >
                <option>Aceh</option>
                <option>Sumatra Selatan</option>
              </Select>
            </Label>
          </div>
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Kab/Kota</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Kab/Kota"
              >
                <option>Aceh Selatan</option>
                <option>Aceh Utara</option>
              </Select>
            </Label>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row gap-2 ">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Jenjang</span>
              <Select className="mt-1 text-gray-500">
                <option>Madrasah Ibtidaiyah</option>
                <option>Madrasah Tsanawiyah</option>
              </Select>
            </Label>
          </div>
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Status Madrasah</span>
              <Select className="mt-1 text-gray-500">
                <option>Negeri</option>
                <option>Swasta</option>
              </Select>
            </Label>
          </div>
        </div>
      </div>
      {isAlertOpen ? <Alert type={alertType}>
        {alertMessage}
      </Alert> : null}
      <Main>
        <HeadTable>
          <HeadTable>
            <Button className="mr-2" disabled={isAlertOpen && alertType === "info"} onClick={downloadExcelTemplate}>Unduh Template</Button>
            <span>
              <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
              {isReading ? <p>Reading...</p> : null}
            </span>
            {isReadingComplete ?
              <Button className="mr-2" disabled={isAlertOpen && alertType === "info"} onClick={simpanTemplate}>Simpan Template</Button> : null
            }
          </HeadTable>
        </HeadTable>
        <div className="main z-0 " key={dataTable.length}>
          <DataTableExtensions
            exportToXlsx={dataTableExport}
            columns={columns}
            data={dataTableExport}
            overflowX={true}
          >
            <DataTable
              columns={columns}
              data={dataTable}
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
              customStyles={CustomStyles}

            />
          </DataTableExtensions>
        </div>
      </Main>
    </>
  );
}

export default ReferensiMadrasah;
