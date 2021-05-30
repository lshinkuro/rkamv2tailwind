import React, { useEffect } from "react";
import { BreadCrumb } from "../../../../../components";
import { Badge } from "@windmill/react-ui";
import { Main, LogButton, HeadTable } from "../List/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleRight,
    faEdit,
    faEye,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import response from "../List/response";
import routes from "../../../../../routes";


function LogsRincianKegiatanDanAnggaran() {
    const route = useHistory();
    const item = ["Home", "Rencana Kerja Dan Anggaran", "Rincian", "Logs"];
    const [isModalRealisasi, setIsModalRealisasi] = React.useState<boolean>(
        false
    );
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [modalData, setModalData] = React.useState<any>("");
    const [dataTable, setDataTable]: any = React.useState<any>([]);
    const [dataTableExport, setDataTableExport] = React.useState<any>([]);
    const [isExpand, setIsExpand] = React.useState<boolean>(false);

    //static percentage
    const percent = 70;

    React.useEffect(() => {
        setDataTable(response);
        setDataTableExport(response);
    }, []);

    function showDetails(data: any) {
        setIsModalOpen(true);
        setModalData(data);
    }
    function showDetail() {
        setIsModalOpen(true);
    }
    function deleteData() {
        let tmp0: any = [];
        tmp0.push({
            isDeleted: "deleted",
        });
        setIsModalOpen(true);
        setModalData(tmp0[0]);
    }

    function hideDetails() {
        setModalData("");
        setIsModalOpen(false);
    }

    function showModalRealisasi() {
        setIsModalRealisasi(true);
    }

    function hideModalRealisasi() {
        setIsModalRealisasi((prev) => !prev);
    }

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
            name: "Tanggal Aksi",
            selector: "pendapatan",
            sortable: true,
        },
        {
            name: "Dibuat Oleh",
            selector: "pendapatan",
            sortable: true,
        },
        {
            name: "Pendapatan",
            selector: "pendapatan",
            sortable: true,
        },
        {
            name: "Jenis Belanja",
            selector: "jenis_belanja",
            sortable: true,
        },
        {
            name: "Kategori Komponen Biaya",
            selector: "kategori_komponen_biaya",
            sortable: true,
        },
        {
            name: "Komponen Biaya",
            selector: "pendapatan",
            sortable: true,
        },
        {
            name: "Satuan",
            selector: "satuan",
            sortable: true,
        },
        {
            name: "Harga Satuan",
            selector: "harga_satuan",
            sortable: true,
        },
        {
            name: "Pajak",
            selector: "pajak",
            sortable: true,
        },
        {
            name: "Total Komponen",
            selector: "kuantitas",
            sortable: true,
        },
        {
            name: "Total Harga",
            selector: "total_harga",
            sortable: true,
        },
        {
            name: "Status",
            selector: "activated",
            sortable: true,
            cell: (row) => (
                <div>
                    <Badge>row</Badge>{" "}
                </div>
            ),
        },
    ];

    return (
        <>
            <BreadCrumb data={item} title="Logs Rincian Kegiatan" />
            <Main>
                <HeadTable>
                    <LogButton onClick={() => {
                        route.push("list");
                    }}>Kembali</LogButton>
                </HeadTable>
                <div className="main">
                    <DataTableExtensions
                        exportToXlsx={dataTableExport}
                        columns={columns}
                        data={dataTableExport}
                        overflowX={true}
                    >
                        <DataTable
                            selectableRows
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
    );
}

export default LogsRincianKegiatanDanAnggaran;
