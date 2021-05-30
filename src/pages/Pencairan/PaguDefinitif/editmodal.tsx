import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Label,
    Select,
    Input,
    Textarea
} from "@windmill/react-ui";
import * as rService from "../../../services/reference";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { editId } from "../../../services/v2/realizationservice/pagudefinitif";


type PageHeaderProps = {
    isOpen: boolean;
    onClose: () => void;
    data: any;
};



const EditModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
    const [termin1, setTermin1] = React.useState(0)
    const [termin2, setTermin2] = React.useState()
    const [nilaiPagu, setNilaiPagu] = React.useState(0)

    const [logErr, setLogErr] = useState<any>("");





    const HandleSubmit = async () => {

        let tmp0: any = []
        if (data) {
            tmp0.push({
                nilai_pagu: nilaiPagu,
                tahun: data.tahun,
                madrasah_id: data.madrasah_id,
                nama_madrasah: data.nama_madrasah,
                termin_1: termin1,
                termin_2: termin2,
                sumber_dana: data.sumber_dana,
                nsm: data.nsm,
            })
        }

        try {
            await editId(tmp0[0], data.id)
            onClose()
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Edit Pagu Definitif</ModalHeader>
            <ModalBody>
                <span className="text-red-500 align-middle">{logErr}</span>
                <div className="grid md:grid-cols-2 gap-2">
                    <div className="my-2">
                        NSM :{data.nsm}
                    </div>
                    <div className="my-2">
                        Nama Madrasah :{data.nama_madrasah}
                    </div>
                    <div><InputWithLabel
                        label="Termin 1"
                        inputOnChange={(e) => { setTermin1(e.target.value) }}
                        defaultValue={data ? data.termin_1 : ""}
                        inputValue={termin1}
                        inputPlaceholder=""

                    /></div>
                    <div><InputWithLabel
                        label="Termin 2"
                        inputOnChange={(e) => { setTermin2(e.target.value) }}
                        defaultValue={data ? data.termin_2 : ""}
                        inputValue={termin2}
                        inputPlaceholder=""

                    /></div>
                    <div><InputWithLabel
                        label="Pagu Definitif"
                        inputOnChange={(e) => { setNilaiPagu(e.target.value) }}
                        defaultValue={data ? data.nilai_pagu : ""}
                        inputValue={nilaiPagu}
                        inputPlaceholder=""

                    /></div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="flex justify-end  ">
                    <div className="gap-2">
                        <Button layout="outline" onClick={onClose} className="mr-1">
                            Batal
                        </Button>
                        <Button onClick={HandleSubmit}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    )
}
export default EditModal;

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
        {...props}
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
        {...props}
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


