import React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Label,
    Select,
    Input,
} from "@windmill/react-ui"
import * as rService from "../../../services/reference";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PageHeaderProps = {
    isOpen: boolean;
    onClose: () => void;
    data: any
};


const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {

    const [kode, setKode] = React.useState("");
    const [tahun, setTahun] = React.useState("")
    const [nama, setNama] = React.useState("")
    const [logErr, setLogErr] = React.useState<any>("");
    const [madrasahN, setMadrasahNegeri] = React.useState(false)
    const [madrasahS, setMadrasahSwasta] = React.useState(false)
    const [ra, setRa] = React.useState(false)

    let submitData = async () => {
        setLogErr("")
        let kodeTmp = kode.length === 0 ? data.kode : kode;
        let namaTmp = nama.length === 0 ? data.nama : nama;
        let tahunTmp = tahun.length === 0 ? data.tahun : tahun;
        let madrasahNTmp = madrasahN ? "1" : "0";
        let madrasahSTmp: any = madrasahS ? "1" : "0";
        let raTmp: any = ra ? "1" : "0";
        let tmp0: any = [];
        tmp0.push({
            kode: kodeTmp ? kodeTmp : "",
            nama: namaTmp ? namaTmp : "",
            tahun: tahunTmp ? tahunTmp : 2021,
            madrasah_n: madrasahNTmp,
            madrasah_s: madrasahSTmp,
            ra: raTmp,
        });
        try {
            await rService.saveReferensiSumberDana(tmp0[0], data.id);
            localStorage.getItem("referensi-sumberdana");
            setKode("")
            setTahun("")
            setNama("")
            setMadrasahNegeri(false)
            setMadrasahSwasta(false)
            setRa(false)
            onClose();
            setLogErr("")
        } catch (error) {
            if (error.response)
                setLogErr(error.response.data.return);
            else
                setLogErr(error.message);
        }
    };

    let editData = async (data: any) => {
        setLogErr("")
        let kodeTmp = kode.length === 0 ? data.kode : kode;
        let namaTmp = nama.length === 0 ? data.nama : nama;
        let tahunTmp = tahun.length === 0 ? data.tahun : tahun;
        let madrasahNTmp = madrasahN ? "1" : "0";
        let madrasahSTmp: any = madrasahS ? "1" : "0";
        let raTmp: any = ra ? "1" : "0";
        let tmp0: any = [];

        tmp0.push({
            id: data.id,
            kode: kodeTmp ? kodeTmp : "",
            nama: namaTmp ? namaTmp : "",
            tahun: tahunTmp ? tahunTmp : 2021,
            madrasah_n: madrasahNTmp,
            madrasah_s: madrasahSTmp,
            ra: raTmp,
        });
        try {
            await rService.saveReferensiSumberDana(tmp0[0], data.id);
            localStorage.getItem("referensi-sumberdana");
            setKode("")
            setTahun("")
            setNama("")
            setMadrasahNegeri(false)
            setMadrasahSwasta(false)
            setRa(false)
            onClose();
            setLogErr("")
        } catch (error) {
            if (error.response)
                setLogErr(error.response.data.return);
            else
                setLogErr(error.message);
        }
    };

    let hapusData = async () => {
        rService.deleteReferensiSumberDana(data.id);
        localStorage.getItem("referensi-sumberdana");
        onClose();
    };

    if (data.isDeleted === "deleted") {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalHeader>Hapus Data</ModalHeader>
                <ModalBody>
                    <div>Yakin Hapus Data?</div>
                </ModalBody>
                <ModalFooter>
                    <div className="hidden sm:block ">
                        <Button layout="outline" onClick={onClose}>
                            Cancel
                </Button>
                &nbsp;
                <Button onClick={hapusData}>Hapus Data</Button>
                    </div>
                </ModalFooter>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} >

            <ModalHeader>{data ? "Edit" : " Tambah"} Sumber Dana</ModalHeader>
            <ModalBody>
                <span className="text-red-500 align-middle">{logErr}</span>
                <div className="flex flex-col p-2 ">
                    <div className="w-auto">
                        <Label>
                            <span className="text-gray-400 ">Tahun  *</span>
                            <Input type="number" className="mt-1" defaultValue={data ? data.tahun : ""} onChange={(e) => {
                                setTahun(e.currentTarget.value)
                            }} valid={tahun.length !== 0 ? true : logErr ? false : true}
                                onInput={(e) => {
                                    e.currentTarget.value = Math.max(
                                        0,
                                        parseInt(e.currentTarget.value)
                                    )
                                        .toString()
                                        .slice(0, 4);
                                }}
                            />
                        </Label>
                        <Label>
                            <span className="text-gray-400 ">Kode  *</span>
                            <Input className="mt-1" defaultValue={data ? data.kode : ""} onChange={(e) => { setKode(e.currentTarget.value) }} valid={kode.length !== 0 ? true : logErr ? false : true} />
                        </Label>
                        <Label>
                            <span className="text-gray-400">Nama *</span>
                            <Input className="mt-1" placeholder="" defaultValue={data ? data.nama : ""} onChange={(e) => { setNama(e.currentTarget.value) }} valid={nama.length !== 0 ? true : logErr ? false : true} />
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col p-2 ">
                    <div className="w-auto">
                        <Label check>
                            <input
                                type="checkbox"
                                defaultChecked={madrasahN}
                                onChange={() => setMadrasahNegeri(!madrasahN)}
                            />
                            <span className="ml-2">Madrasah Negeri?</span>
                            {madrasahN}
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col p-2 ">
                    <div className="w-auto">
                        <Label check>
                            <input
                                type="checkbox"
                                defaultChecked={madrasahS}
                                onChange={() => setMadrasahSwasta(!madrasahS)}
                            />
                            <span className="ml-2">Madrasah Swasta?</span>
                            {madrasahS}
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col p-2 ">
                    <div className="w-auto">
                        <Label check>
                            <input
                                type="checkbox"
                                defaultChecked={ra}
                                onChange={() => setRa(!ra)}
                            />
                            <span className="ml-2">Raudhatul Athfal?</span>
                            {ra}
                        </Label>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="">
                    <Button layout="outline" onClick={onClose}>
                        Cancel
                        </Button>
                    {
                        data ? (<Button onClick={() => editData(data)}>
                            Simpan
                        </Button>

                        ) : (
                            <Button onClick={submitData}>
                                Tambah
                            </Button>
                        )
                    }

                </div>
            </ModalFooter>
        </Modal>
    )
}

export default InputModal
