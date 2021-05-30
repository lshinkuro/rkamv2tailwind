import React, { useCallback } from "react";
import { Main, HeadTable } from './style';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css"
import { Alert, Button } from '@windmill/react-ui';
import { ExportToExcel } from "../../../components/Export/ExportToExcel";
import { AlertProps } from '@windmill/react-ui/dist/Alert';
import XLSX from "xlsx";
import * as paguDefinitifService from "../../../services/v2/realizationservice/pagudefinitif";
import { formatRupiah } from "../../../utils/helper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAddressCard, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import EditModal from "./editmodal";


function PaguDefinitifList() {
    const [dataTable, setDataTable]: any = React.useState<any>([]);
    const [dataTableExport, setDataTableExport] = React.useState<any>([]);
    const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
    const [alertType, setAlertType] = React.useState<AlertProps["type"]>(undefined);
    const [alertMessage, setAlertMessage] = React.useState<String>("");
    const [isReading, setIsReading] = React.useState<boolean>(false);
    const [isReadingComplete, setIsReadingComplete] = React.useState<boolean>(false);
    const [isUploading, setIsUploading] = React.useState<boolean>(false);
    const groupRole = JSON.parse(localStorage.getItem("auth")!).group_role || "";
    const kodeRole = JSON.parse(localStorage.getItem("auth")!).kode_role || "";



    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [modalData, setModalData] = React.useState<any>({});



    React.useEffect(() => {
        // let response = []
        if (groupRole === "madrasah") {
            const response = JSON.parse(localStorage.getItem("pagu-definitif")!) || [];
            console.log('gasmin hehe', response)
            setDataTable(response)
            setDataTableExport(response)
        } else {
            paguDefinitifService.browse({ activated: ["1"], tahun: [2021], groupRole: groupRole }).then(data => {
                setDataTable(data)
                setDataTableExport(data)
            });
        }
    }, [localStorage.getItem("pagu-definitif")])

    function showDetails(data: any) {
        setIsModalOpen(true);
        setModalData(data);
    }

    function hideDetails() {
        setIsModalOpen(false);
    }

    console.log(dataTable)

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
                // paddingLeft: "0 8px",
                color: "white",
            },
        },
    };

    const columns = [
        {
            name: "NSM",
            selector: "nsm",
            sortable: true,
        },
        {
            name: "Nama Sekolah",
            selector: "nama_madrasah",
            sortable: true,
        },
        {
            name: "Sumber Dana",
            selector: "sumber_dana",
            sortable: true,
        },
        {
            name: "No Rekening",
            selector: "no_rekening",
            sortable: true,
        },
        {
            name: "Termin 1",
            selector: "termin_1",
            sortable: true,
            cell: (row) => (
                <div className="flex items-center">
                    {row.termin_1}<span> &#37;</span>
                </div>
            )
        },
        {
            name: "Termin 2",
            selector: "termin_2",
            sortable: true,
            cell: (row) => (
                <div className="flex items-center">
                    {row.termin_2}<span> &#37;</span>
                </div>
            )
        },
        {
            name: "Pagu Definitif",
            selector: "nilai_pagu",
            sortable: true,
            cell: (row: any) => (
                <div className="flex items-center">
                    {formatRupiah(row.nilai_pagu)}
                </div>
            )
        },
        {
            name: "Aksi",

            cell: (row) => (
                <div className="flex items-center text-white">
                    {
                        kodeRole === "admin_pusat" && (
                            <div
                                // layout="link"
                                className="bg-yellow-300 hover:bg-yellow-700 mx-0 px-2 py-1  cursor-pointer"
                                aria-label="Edit"
                                title="Edit"
                                onClick={() => {
                                    showDetails(row);
                                }}
                            >
                                <FontAwesomeIcon icon={faPencilAlt} size="sm" />
                            </div>

                        ) || null
                    }
                </div>
            ),
        },
    ];

    async function downloadExcelTemplate() {
        setAlert(true, "info", "Sedang mengunduh template")
        try {
            const dataMadrasah: [] = JSON.parse(localStorage.getItem("profile-madrasah")!);
            exportToXlsx(dataMadrasah.map((el: any) => {
                return {
                    'ID': el.id, 'NSM': el.nsm, 'PPK': el.kode_level_ppk, 'NAMA SEKOLAH': el.nama, 'TERMIN 1': '', 'TERMIN 2': '',
                    'SUMBER DANA': '', 'PAGU DEFINITIF': 0, 'NAMA BANK': el.nama_bank, 'NO REKENING': el.no_rekening
                }
            }), "template-pagu-definitif");
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
                const elements = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]).map((el: any) => { return { madrasah_id: el['ID'], nsm: el['NSM'], kode_level_ppk: el['PPK'], nama_madrasah: el['NAMA SEKOLAH'], sumber_dana: el['SUMBER DANA'], termin_1: el['TERMIN 1'], termin_2: el['TERMIN 2'], nilai_pagu: el['PAGU DEFINITIF'], no_rekening: el['NO REKENING'], tahun: 2021 } });
                setDataTable(elements);
                setDataTableExport(elements)
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
            await paguDefinitifService.bulkSave(dataTable);
            setAlert(true, "success", "Berhasil menyimpan data")
        } catch (error) {
            console.log(error)
            setAlert(true, "danger", "Gagal menyimpan data")
        }
        // resetState();
        setIsUploading(false);
    };

    function resetState() {
        setIsAlertOpen(false);
        setAlertType(undefined);
        setAlertMessage("");
        setIsReading(false);
        setIsReadingComplete(false);
    }

    return (
        <>
            {isAlertOpen ? <Alert type={alertType}>
                {alertMessage}
            </Alert> : null}
            <EditModal isOpen={isModalOpen} onClose={hideDetails} data={modalData} />
            <Main>
                <HeadTable>
                    {groupRole === "pusat" ?
                        <HeadTable>
                            <Button className="mr-2" disabled={isAlertOpen && alertType === "info"} onClick={downloadExcelTemplate}>Unduh Template</Button>
                            <span>
                                <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
                                {isReading ? <p>Reading...</p> : null}
                            </span>
                            {isReadingComplete ?
                                <Button className="mr-2" disabled={isAlertOpen && alertType === "info"} onClick={simpanTemplate}>Simpan </Button> : null
                            }
                        </HeadTable> : null
                    }
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
                            customStyles={customStyles}

                        />
                    </DataTableExtensions>
                </div>
            </Main>
        </>
    )
}

export default PaguDefinitifList
