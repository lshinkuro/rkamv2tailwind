import React from 'react';
import { Input, Select, Label, Textarea, Button } from '@windmill/react-ui'
import { BreadCrumb } from "../../../../../components";
import { Main, LogButton, HeadTable } from '../List/style';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleRight,
    faEdit,
    faEye,
    faPlus,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";


function EditRencanaKegiatanDanAnggaran() {
    const item = ["Home", "Rencana", "Kegiatan", "Rincian", "Tambah"];
    const [isExpand, setIsExpand] = React.useState<boolean>(false);


    return (
        <>
            <BreadCrumb data={item} title="Rincian Kegiatan" />
            <Main>
                <div
                    className="h-48 bg-white shadow-sm w-full rounded-sm cursor-pointer flex hover:bg-gray-100 transform hover:scale-y-105"
                    onClick={() => setIsExpand(!isExpand)}
                >
                    <div className="w-10 h-full flex items-center justify-center text-gray-500">
                        {!isExpand ? (
                            <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown} size="lg" />
                        )}
                    </div>
                    <div className="mt-5 flex-1 flex  items-center justify-between">
                        <div className="w-2/6">
                            <p>Standar Nasional</p>
                            <p>PENGEMBANGAN STANDAR PROSES</p>
                        </div>
                        <div className="w-2/6">
                            <p>Kegiatan</p>
                            <p>Pengelolaan Program Kesiswaan</p>
                        </div>
                        <div className="w-2/6">
                            <p>Sub Kegiatan</p>
                            <p>Pelaksanaan Tes Kendali Mutu</p>
                        </div>
                    </div>
                </div>
                {isExpand ? (
                    <div className="my-4 mx-4 h-auto bg-white  cursor-pointer">
                        <div className=" flex flex-col md:flex-row ">
                            <div className="mt-5 flex-1 flex justify-between">
                                <div className="w-1/4">
                                    <p>Pelaksanaan</p>
                                    <p>Februari s/d Maret</p>
                                </div>
                            </div>
                            <div className="mt-5 flex-1 flex justify-between">
                                <div className="w-1/4">
                                    <p>sasaran</p>
                                    <p>Madrasah</p>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col md:flex-row ">
                            <div className="mt-5 flex-1 flex justify-between">
                                <div className="w-1/4">
                                    <p>Indikator Output</p>
                                    <p>asd :12 bungkus</p>
                                </div>
                            </div>
                            <div className="mt-5 flex-1 flex justify-between">
                                <div className="w-1/4">
                                    <p>Indikator Hasil</p>
                                    <p>asdd :122 bungkus</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Main>
            <Main>
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex-1">
                        <InputWithSelectLabel
                            label="Pendapatan"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                            datamap={["m", "n", "o"]}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex flex-1 flex-col my-4 ">
                        <div className="flex-1">Pendapatan :</div>
                        <div className="flex-1 my-3">200.000.000 -,</div>                
                    </div>
                    <div className="flex flex-1 flex-col my-4 ">
                        <div className="flex-1">Belanja :</div>
                        <div className="flex-1 my-3">223.000 -,</div>                
                    </div>
                   
                    <div className="flex flex-1 flex-col my-4 ">
                        <div className="flex-1">Selisih :</div>
                        <div className="flex-1 my-3">134.00.000 -,</div>                
                    </div>
                </div>
 

                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex-1">
                        <InputWithLabel
                            label="Komponen Biaya"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                    </div>
                    <div className="flex-1 flex-row">
                        <InputWithSelectLabel
                            label="Akun Belanja"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                            datamap={["m", "n", "o"]}
                        />
                    </div>
                    <div className="flex-1 flex-row">
                        <InputWithSelectLabel
                            label="Pajak"
                            inputOnChange={(e) => { }}
                            inputPlaceholder="halooooo"
                            datamap={["m", "n", "o"]}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex-1">
                        Kategori : -
                    </div>
                    <div className="flex-1 flex-row">
                        Nama : -
                    </div>
                    <div className="flex-1 flex-row">
                        Spesifikasi :-
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex-1">
                        Harga Satuan : -
                    </div>
                    <div className="flex-1 flex-row">
                        Satuan : -
                    </div>
                    <div className="flex-1 flex-row">
                        Pajak :-
                    </div>
                </div>

                <div className="flex flex-col my-4 ">
                    <div className="flex-1">
                        <p className="text-sm">
                            Koefisien : -
                        </p>
                    </div>
                    <div className="flex flex-1 flex-col md:flex-row my-3 gap-2">
                        <div className="flex-1 flex flex-col md:flex-row" >
                            <div className="flex-1">
                                <Input
                                    className="mt-1"
                                    placeholder={''}
                                    defaultValue={''}
                                    onChange={() => { }}
                                />
                            </div>
                            <div className="flex-1 mr-1">
                                <Select
                                    className="mt-1"
                                    onChange={() => { }}>
                                    <option>2</option>
                                    <option>3</option>

                                </Select>
                            </div>
                            <div className="flex-1">
                                <Input
                                    className="mt-1"
                                    placeholder={''}
                                    defaultValue={''}
                                    onChange={() => { }}
                                />
                            </div>
                            <div className="flex-1">
                                <Select
                                    className="mt-1"
                                    onChange={() => { }}>
                                    <option>2</option>
                                    <option>3</option>

                                </Select>
                            </div>

                        </div>
                        <div className="flex-1 flex flex-col md:flex-row" >
                            <div className="flex-1">
                                <Input
                                    className="mt-1"
                                    placeholder={''}
                                    defaultValue={''}
                                    onChange={() => { }}
                                />
                            </div>
                            <div className="flex-1 mr-1">
                                <Select
                                    className="mt-1"
                                    onChange={() => { }}>
                                    <option>2</option>
                                    <option>3</option>

                                </Select>
                            </div>
                            <div className="flex-1">
                                <Input
                                    className="mt-1"
                                    placeholder={''}
                                    defaultValue={''}
                                    onChange={() => { }}
                                />
                            </div>
                            <div className="flex-1">
                                <Select
                                    className="mt-1"
                                    onChange={() => { }}>
                                    <option>2</option>
                                    <option>3</option>

                                </Select>
                            </div>

                        </div>
                    </div>

                </div>
                
                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex-1">
                        Perkalian: -
                    </div>
                    <div className="flex-1 flex-row">
                        Kuantitas : -
                    </div>
                    <div className="flex-1 flex-row">
                        Total Harga :-
                    </div>
                </div>

                <div className="flex flex-col my-4 ">
                    <div className="flex-1">* Anggaran Kas Belanja</div>
                    <div className="flex-1 my-3">Kuantitas : 0</div>                
                </div>

                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex flex-1 flex-col md:flex-row gap-3">
                         <div className="flex-1">
                         <InputWithLabel
                            label="Januari"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                         <div className="flex-1">
                         <InputWithLabel
                            label="Februari"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                         <div className="flex-1">
                         <InputWithLabel
                            label="Maret"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                    </div>
                    <div className="flex flex-1 flex-col md:flex-row gap-3">
                         <div className="flex-1">
                         <InputWithLabel
                            label="April"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                         <div className="flex-1">
                         <InputWithLabel
                            label="Mei"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                         <div className="flex-1">
                         <InputWithLabel
                            label="Juni"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 my-4">
                    <div className="flex flex-1 flex-col md:flex-row gap-3">
                         <div className="flex-1">
                         <InputWithLabel
                            label="Juli"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                         <div className="flex-1">
                         <InputWithLabel
                            label="Agustus"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                         <div className="flex-1">
                         <InputWithLabel
                            label="September"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                    </div>
                    <div className="flex flex-1 flex-col md:flex-row gap-3">
                         <div className="flex-1">
                         <InputWithLabel
                            label="Oktober"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                         <div className="flex-1">
                         <InputWithLabel
                            label="November"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                         <div className="flex-1">
                         <InputWithLabel
                            label="Desember"
                            inputOnChange={(e) => { }}
                            inputValue={''}
                            inputPlaceholder=""
                        />
                         </div>
                    </div>
                </div>
                <hr className="my-3" />
                <div className="flex justify-end  ">
                    <div className="gap-2">
                        <Button layout="outline" onClick={() => { }} className="mr-1">
                            Batal
                        </Button>

                        <Button onClick={() => { }}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Main>
        </>
    )
}

export default EditRencanaKegiatanDanAnggaran;

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



