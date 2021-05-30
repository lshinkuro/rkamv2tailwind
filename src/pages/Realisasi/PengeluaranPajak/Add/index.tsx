import React from 'react';
import { Input, Select, Label, Textarea, Button } from '@windmill/react-ui'
import { BreadCrumb } from "../../../../components";
import { Main, LogButton, HeadTable } from '../List/style';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faPlus,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import response from '../List/response'


function TambahPengeluaranPajak() {
    const item = ["Home", "Realisasi ", "Pengeluaran Pajak", "Tambah"];
    const [dataTable, setDataTable]: any = React.useState<any>(response);
    const [dataTableExport, setDataTableExport] = React.useState<any>(response);

    const [tipekas, setTipeKas] = React.useState('Tunai')

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
            name: "Sumber Dana",
            selector: "sumber_dana",
            sortable: true,
        },
        {
            name: "No Nota",
            selector: "no_nota",
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row) => (
                <div className="flex  flex-col justify-end text-white z-0" >

                </div>
            ),
        },
    ];


    return (
        <>
            <BreadCrumb data={item} title="Realisasi Pengeluaran Pajak" />
            <Main>
                <div className="grid grid-cols-2 gap-4">
                    <div >
                        <InputWithSelectLabel
                            label="Sumber Dana"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                            datamap={["APBN_BOS", "BOSDA Provinsi"]}
                        />
                    </div>
                    <div >
                        <InputWithSelectLabel
                            label="Tipe Kas"
                            inputOnChange={(e) => { setTipeKas(e.target.value) }}
                            inputPlaceholder="halooooo"
                            datamap={["Tunai", "Rekening Bank"]}
                        />
                    </div>
                    {
                        tipekas === 'Rekening Bank' &&
                        <div>
                            <InputWithSelectLabel
                                label="No Rekening"
                                inputOnChange={(e) => { }}
                                inputPlaceholder="halooooo"
                                datamap={["23", "44"]}
                            />
                        </div>
                    }
                    <div>
                        <InputWithSelectLabel
                            label="Jenis Pajak"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                            datamap={["PPN", "PPH 21", "PPH 22", "PPH 23"]}
                        />
                    </div>
                    <div>
                    <InputWithDate
                                label="Tanggal Nota"
                                inputOnChange={(e) => { }}
                                selected={''}
                            />
                    </div>
                    <div>
                    <InputWithTextArea
                                label="Keterangan"
                                inputOnChange={(e) => { }}
                                inputValue={''}
                                inputPlaceholder=""
                            />
                    </div>
                </div>
               
            </Main>
            <Main>
                <div className="main z-0">
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


            <Main>
                <div>
                    Saldo Kas : 0
                    Grand Total
                </div>
                <div className="flex flex-col md:flex-row my-4">
                    <div className="flex flex-1 flex-col md:flex-row">
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Total :</div>
                            <div className="flex-1 mt-1 text-gray-800">0</div>
                        </div>
                    </div>
                </div>
                <hr className="my-3" />
                <div className="flex justify-end  ">
                    <div className="gap-2">
                        <Button layout="outline" onClick={() => { }} className="mr-1">
                            Batal
                        </Button>

                        <Button onClick={() => { console.log(tipekas) }}>
                            Simpan
                        </Button>
                    </div>
                </div>

            </Main>
        </>
    )
}

export default TambahPengeluaranPajak;

const WithLabel = Component => {
    return props => (
        <Label>
            <span className="text-gray-800">
                {" "}
                <span className="text-red-500">*</span>{props.label}
            </span>
            <Component {...props} />
        </Label>
    );
};

const MyInput = props => (
    <Input
        className="mt-1"
        placeholder={props.inputPlaceholder}
        defaultValue={props.inputValue}
        onChange={props.inputOnChange}
    />
);

const MyTextArea = props => (
    <Textarea
        className="mt-1"
        placeholder={props.inputPlaceholder}
        defaultValue={props.inputValue}
        onChange={props.inputOnChange}
    />
);

const MySelectLabel = props => (
    <Select
        className="mt-1"
        onChange={props.inputOnChange} {...props}>
        {
            props.datamap.map((item, index) => {
                return (<option key={index}>{item}</option>)
            })
        }
    </Select>
)

const MyDateInput = props => (
    <div className="w-full">
        <DatePicker
            selected={props.selected}
            dateFormat="ddmmyyyy"
            showFullMonthYearPicker
            onChange={props.inputOnChange}
            className=" mt-2 active:block text-sm focus:outline-none form-input leading-5 
                   focus:border-purple-800  focus:shadow-outline-purple w-full"
        />
    </div>
)

const InputWithLabel = WithLabel(MyInput);
const InputWithSelectLabel = WithLabel(MySelectLabel);
const InputWithTextArea = WithLabel(MyTextArea)
const InputWithDate = WithLabel(MyDateInput)



