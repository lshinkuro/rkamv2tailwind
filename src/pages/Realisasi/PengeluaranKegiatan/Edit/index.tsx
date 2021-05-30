import React from 'react';
import { Input, Select, Label, Textarea ,Button} from '@windmill/react-ui'
import { BreadCrumb } from "../../../../components";
import { Main, LogButton, HeadTable } from '../List/style';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faPlus,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";


function EditPengeluaranMadrasah() {
    const item = ["Home", "Realisasi ", "Pengeluaran Madrasah", "Tambah"];

    return (
        <>
            <BreadCrumb data={item} title="Realisasi Pengeluaran Madrasah" />
            <Main>
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex-1">
                        <InputWithSelectLabel
                            label="Sumber Dana"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                            datamap={["m", "n", "o"]}
                        />
                    </div>
                    <div className="flex-1">
                        <InputWithSelectLabel
                            label="Tipe Kas"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                            datamap={["m", "n", "o"]}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex-1">
                        <InputWithSelectLabel
                            label="Metode Pembayaran"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                            datamap={["m", "n", "o"]}
                        />
                    </div>
                    <div className="flex-1 flex-row">
                        <InputWithSelectLabel
                            label="Penerima"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                            datamap={["m", "n", "o"]}
                        />
                        {/* <LogButton onClick="">Tambah</LogButton> */}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex-1">
                        <InputWithDate
                            label="Tanggal Nota"
                            inputOnChange={(e) => { }}
                            selected={''}
                        />
                    </div>
                    <div className="flex-1 flex-row">
                        <InputWithTextArea
                            label="No Referensi"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                    </div>
                </div>
            </Main>
            <Main>
                <div className="flex my-4">
                    <div className="flex-1">
                        <LogButton style={{ borderColor: '#b57f1d', borderWidth: 1, borderStyle: 'dashed', backgroundColor: 'white' }}>
                            <FontAwesomeIcon icon={faTrashAlt} size="sm" color="#b57f1d" />
                        </LogButton>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row my-4">
                    <div className="flex-1">
                        <InputWithLabel
                            label="Komponen Biaya"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                    </div>
                    <div className="flex-1">

                    </div>
                </div>
                <div className="flex flex-col md:flex-row my-4">
                    <div className="flex flex-1 flex-col md:flex-row">
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Kategori :</div>
                            <div className="flex-1 mt-1 text-gray-800">-</div>
                        </div>
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Nama :</div>
                            <div className="flex-1 mt-1 text-gray-800">-</div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col md:flex-row">
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Spesifikasi :</div>
                            <div className="flex-1 mt-1 text-gray-800">-</div>
                        </div>
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Satuan :</div>
                            <div className="flex-1 mt-1 text-gray-800">-</div>
                        </div>
                    </div>
                </div>
                <div>Rencana Komponen Biaya</div>
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex-1">
                        <InputWithLabel
                            label="Harga Satuan "
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"

                        />
                    </div>
                    <div className="flex-1 flex-row">
                        <InputWithLabel
                            label="Kuantitas"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex flex-1">
                        <div className="flex-1 ">
                            <Label check>
                                <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    onChange={() => { }}
                                />
                                <span className="ml-2">Pajak PPN?</span>
                            </Label>
                        </div>
                        <div className="flex-1">
                            <Label check>
                                <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    onChange={() => { }}
                                />
                                <span className="ml-2">Potong Pajak PPN?</span>
                            </Label>
                        </div>
                    </div>
                    <div className="flex-1">

                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex flex-1">
                        <div className="flex-1 ">
                            <Label check>
                                <input
                                    type="checkbox"
                                    defaultChecked={false}
                                    onChange={() => { }}
                                />
                                <span className="ml-2">Potong Pajak PPH?</span>
                            </Label>
                        </div>
                        <div className="flex-1">
                        </div>
                    </div>
                    <div className="flex-1">

                    </div>
                </div>
                <div className="flex flex-col md:flex-row my-4">
                    <div className="flex flex-1 flex-col md:flex-row">
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Sub Total :</div>
                            <div className="flex-1 mt-1 text-gray-800">0</div>
                        </div>
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Pajak :</div>
                            <div className="flex-1 mt-1 text-gray-800">0</div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col md:flex-row">
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Pajak Terutang  :</div>
                            <div className="flex-1 mt-1 text-gray-800">0</div>
                        </div>
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Total :</div>
                            <div className="flex-1 mt-1 text-gray-800">0</div>
                        </div>
                    </div>
                </div>
                <div className="flex my-4">
                    <div className="flex-1">
                        <LogButton style={{ borderColor: '#b57f1d', borderWidth: 1, borderStyle: 'dashed', backgroundColor: 'white' }}>
                            <FontAwesomeIcon icon={faPlus} size="sm" color="#b57f1d" />
                        </LogButton>
                    </div>
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
                            <div className="flex-1 text-gray-800">Sub Total :</div>
                            <div className="flex-1 mt-1 text-gray-800">0</div>
                        </div>
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Pajak :</div>
                            <div className="flex-1 mt-1 text-gray-800">0</div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col md:flex-row">
                        <div className="flex-1 ">
                            <div className="flex-1 text-gray-800">Pajak Terutang  :</div>
                            <div className="flex-1 mt-1 text-gray-800">0</div>
                        </div>
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

                        <Button  onClick={() => {}}>
                             Simpan
                        </Button>
                    </div>
                </div>

            </Main>
        </>
    )
}

export default EditPengeluaranMadrasah;

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
                   focus:border-purple-800  focus:shadow-outline-purple "
        />
    </div>
)

const InputWithLabel = WithLabel(MyInput);
const InputWithSelectLabel = WithLabel(MySelectLabel);
const InputWithTextArea = WithLabel(MyTextArea)
const InputWithDate = WithLabel(MyDateInput)



