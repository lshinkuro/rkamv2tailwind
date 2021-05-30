import React, { useEffect } from "react";
import { BreadCrumb } from "../../../../components";
import { Badge, } from "@windmill/react-ui";
import { Main,HeadTable,LogButton } from '../List/style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css"
import response from '../List/response';






function LogPengeluaranMadrasah() {
    const route = useHistory()
    const item = ["Home", "Realisasi", "Pindah Buku", "Logs"];
    const [dataTable, setDataTable]: any = React.useState<any>([]);
    const [dataTableExport, setDataTableExport] = React.useState<any>([]);

    React.useEffect(() => {
        setDataTable(response)
        setDataTableExport(response)
    }, [])


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
            name: "Tanggal",
            selector: "no_nota",
            sortable: true,
        },
        {
            name: "Aksi",
            selector: "aksi",
            sortable: true,
        },
        {
            name: "Dibuat oleh",
            selector: "sumber_dana",
            sortable: true,
        },
        {
            name: "Tanggal Nota",
            selector: "tanggal_nota",
            sortable: true,
        },
        {
            name: "No Nota",
            selector: "no_nota",
            sortable: true,
        },
        {
            name: "Sumber Dana",
            selector: "sumber_dana",
            sortable: true,
        },
        {
            name: "Tipe Kas",
            selector: "tipe_kas",
            sortable: true,
        },
        {
            name: "Ke Tipe Kas",
            selector: "ke_tipe_kas",
            sortable: true,
        },
        {
            name: "Jumlah",
            selector: "jumlah",
            sortable: true,
        },
        {
            name: "Keterangan",
            selector: "keterangan",
            sortable: true,
        },
        {
            name: "Tanggal Realisasi",
            selector: "tanggal_realisasi",
            sortable: true,
        },
        {
            name: "No Referensi",
            selector: "no_referensi",
            sortable: true,
        },
        { 
            
            name: "Status",
            selector: "activated",
            sortable: true,
            fixedHeader:true,
            persistTableHead:true,
            cell: (row) => (
                <div className="">
                    <Badge >
                        row
                    </Badge>{" "}
                </div>
            ),
        },
    ];



    return (
        <>
            <BreadCrumb data={item} title="Log Realisasi Kegiatan" />
            <Main>
                <div className="main  overflow-x-auto" style={{width:'100%'}}>
                    <HeadTable>
                        <LogButton onClick={()=>{route.push('list')}}>kembali</LogButton>
                    </HeadTable>
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

export default LogPengeluaranMadrasah;


