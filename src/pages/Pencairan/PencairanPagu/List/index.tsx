import React from 'react';
import { BreadCrumb } from "../../../../components";
import { Main, LogButton, HeadTable } from '../style';
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css"
// import response from '../List/response';
import { Badge, Button, Modal, } from '@windmill/react-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencilAlt,
    faFileExport,
    faPlus,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";
import ModalUpload from "../ModalUpload"

import { formatRupiah } from '../../../../utils/helper';
import DropDownButton from "../../../../components/Button/dropdownbutton"


function PencairanPagu() {
    const item = ["Home", "Pencairan", "Pencairan Pagu", "List"];



    const [kodeRole, setKodeRole] = React.useState<any>("");
    const [kodePPK, setKodePPK] = React.useState<any>("");
    const [dataTable, setDataTable]: any = React.useState<any>([]);
    const [dataTableExport, setDataTableExport] = React.useState<any>([]);

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [isInputModalOpen, setIsInputModalOpen] = React.useState<boolean>(false);
    const [modalData, setModalData] = React.useState<any>({});

    function showDetails(data: any) {
        setIsModalOpen(true);
        setModalData(data);
    }
    function showInputModal(data: any) {
        setIsInputModalOpen(true);
        setModalData(data);
    }
    function hideDetails() {
        setModalData("");
        setIsModalOpen(false);
        setIsInputModalOpen(false);
    }

    const route = useHistory()

    React.useEffect(() => {
        const response = JSON.parse(localStorage.getItem("pencairan-pagu-definitif")!) || [];
        setKodeRole(JSON.parse(localStorage.getItem("auth")!).kode_role);
        setKodePPK(JSON.parse(localStorage.getItem("profile-madrasah")!)[0].kode_level_ppk);
        setDataTable(response)
        setDataTableExport(response)
    }, [])

    console.log("kode ppk", kodeRole)

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
            name: "Tahun",
            selector: "tahun",
            sortable: true,
        },
        {
            name: "Tanggal Termin ",
            selector: "tanggal_termin",
            sortable: true,
        },
        {
            name: "Sumber Pagu",
            selector: "sumber_dana",
            sortable: true,
        },
        {
            name: "Termin Ke",
            selector: "tahap",
            sortable: true,
        },

        // {
        //     name: "Nilai (%)",
        //     selector: "nilai_persen",
        //     sortable: true,
        //     cell: (row: any) => (
        //         <div className="flex items-center">
        //             {row['nilai_persen'].toString().substr(0, row['nilai_persen'].indexOf(".") + 3) + "%"}
        //         </div>
        //     )
        // },
        // {
        //     name: "Jumlah",
        //     selector: "nilai_pencairan_pagu",
        //     sortable: true,
        //     cell: (row: any) => (
        //         <div className="flex items-center">
        //             {formatRupiah(row.nilai_pencairan_pagu)}
        //         </div>
        //     )
        // },
        {
            name: "Bendahara",
            cell: (row: any) => (
                <div>
                    <Badge>
                        {row.dokumen_pencairan_pagu_definitif.length > 0 ? "uploaded" : "menunggu" }
                    </Badge>

                </div>
            )
        },
        {
            name: "PPK",
            cell: (row) => (
                <div>
                     <Badge>
                        {row.dokumen_pencairan_pagu_definitif.length > 1 ? "uploaded" : "menunggu" }
                    </Badge>
                </div>
            )

        },
        {
            name: "PPSPM",
            cell: (row) => (
                <div>
                    <Badge>
                        {row.dokumen_pencairan_pagu_definitif.length > 2 ? "uploaded" : "menunggu" }
                    </Badge>
                </div>
            )
        },
        {
            name: "SP2D",
            cell: (row) => (
                <div>
                    <Badge>
                        {row.dokumen_pencairan_pagu_definitif.length > 3 ? "uploaded" : "menunggu" }
                    </Badge>
                </div>
            )

        },

        {
            name: "Aksi",
            cell: (row: any) => (
                <div className="flex items-center ">
                    <Button size="small" onClick={()=>{showDetails(row)}}>
                        Aksi
                    </Button>
                    {/* <DropDownButton isOpen={row.isOpen} toggleDropDown={(isOpen: boolean) => {
                        const newDataTable = dataTable.map((el: any) => {
                            if (el.id === row.id) {
                                el.isOpen = !isOpen
                            } else {
                                el.isOpen = false
                            }
                            return el
                        })
                        setDataTable(newDataTable)
                        setDataTableExport(newDataTable)
                    }} /> */}
                </div>
            ),
        },
    ];




    return (
        <>
            <BreadCrumb data={item} title="Pencairan Pagu" />
            <ModalUpload isOpen={isModalOpen} onClose={hideDetails} data={modalData} />

            <Main>
                <HeadTable>
                    <HeadTable>
                        {/* {(kodeRole === "bendahara_madrasah" && ( */}
                        <LogButton onClick={() => { route.push('add') }} >
                            Tambah
                        </LogButton>
                        {/* )) ||
                            null} */}
                        <LogButton onClick={() => { route.push('logs') }} style={{ backgroundColor: "#e02424" }}>
                            Logs
                        </LogButton>
                    </HeadTable>
                </HeadTable>
                <div className="main z-0">
                    <DataTableExtensions
                        exportToXlsx={dataTableExport}
                        columns={columns}
                        data={dataTableExport}
                        overflowX={true}
                    >
                        <DataTable
                            className="z-0"
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

export default PencairanPagu
