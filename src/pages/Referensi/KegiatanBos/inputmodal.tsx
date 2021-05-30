import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Label,
    Input,
} from "@windmill/react-ui";
import * as rService from "../../../services/reference";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PageHeaderProps = {
    isOpen: boolean;
    onClose: () => void;
    data: any;
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
    // console.log(data)
    const localStorageName = "pbos"
    const [kode, setKode] = useState<any>("");
    const [nama, setNama] = useState<any>("");
    const [tahun, setTahun] = useState<any>("");
    const [logErr, setLogErr] = useState<any>("");
    const today = new Date();

    let submitData = async () => {
        let kodeTmp = kode.length === 0 ? data.kode : Number(kode);
        let namaTmp = nama.length === 0 ? data.nama : nama;
        let tahunTmp = tahun.length === 0 ? data.tahun : today.getFullYear();
        let reqBody: any = {
            kode: kodeTmp,
            nama: namaTmp,
            tahun: tahunTmp ? tahunTmp : today.getFullYear(),
        };
        if (data) {
            reqBody.id = data.id
        }

        try {
            await rService.saveOnline(reqBody, "reference-services", "penggunaan-bos", localStorageName);
            localStorage.getItem(localStorageName);
            setKode("");
            setNama("");
            setTahun("");
            onClose();
        } catch (error) {
            if (error.response)
                setLogErr(error.response.data.return);
            else
                setLogErr(error.message);
        }

    };

    let hapusData = async () => {
        try {
            await rService.deleteOnline(
                data.id,
                "reference-services",
                "penggunaan-bos",
                localStorageName
            );
            localStorage.getItem(localStorageName);
            onClose();
        } catch (error) {
            if (error.response)
                setLogErr(error.response.data.return);
            else
                setLogErr(error.message);
        }
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>{data ? "Edit" : "Tambah"} Kegiatan BOS </ModalHeader>
            <ModalBody>
                <span className="text-red-500 align-middle">{logErr}</span>
                <div className="flex flex-col p-2 ">
                    <div className="w-auto">
                        <Label>
                            <span className="text-gray-400">
                                {" "}
                                <span className="text-red-500">*</span> Kode
              </span>
                            {data ? (
                                <Input
                                    onChange={(e) => setKode(e.currentTarget.value)}
                                    defaultValue={data ? data.kode : ""}
                                    className="mt-1"
                                    disabled
                                />
                            ) : (
                                <Input
                                    type="number"
                                    onChange={(e) => setKode(e.currentTarget.value)}
                                    defaultValue={data ? data.kode : ""}
                                    className="mt-1"
                                    placeholder="Silakan isi kode"
                                    valid={kode.length !== 0 ? true : logErr ? false : true}
                                    onInput={(e) => {
                                        e.currentTarget.value = Math.max(
                                            0,
                                            parseInt(e.currentTarget.value)
                                        )
                                            .toString()
                                            .slice(0, 4);
                                    }}
                                />
                            )}
                        </Label>
                        <Label>
                            <span className="text-gray-400">Nama *</span>
                            <Input className="mt-1" placeholder="" defaultValue={data ? data.nama : ""} onChange={(e) => { setNama(e.currentTarget.value) }} valid={nama.length !== 0 ? true : logErr ? false : true} />
                        </Label>
                        <Label>
                            <span className="text-gray-400">
                                {" "}
                                <span className="text-red-500">*</span> Tahun{" "}
                            </span>
                            <br />
                            <Input
                                type="number"
                                onChange={(e) => setTahun(e.currentTarget.value)}
                                defaultValue={data ? data.tahun : today.getFullYear()}
                                className="mt-1"
                                placeholder="Silakan isi tahun"
                                valid={tahun.length !== 0 ? true : logErr ? false : true}
                                // defaultValue={"2021"}
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
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="hidden sm:block ">
                    <Button layout="outline" onClick={onClose}>
                        Cancel
          </Button>
          &nbsp;
                        <Button onClick={submitData}>{data ? 'Simpan' : 'Tambah'}</Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button block size="large" layout="outline" onClick={onClose}>
                        Cancel
          </Button>
                    <Button block size="large" onClick={submitData}>
                        {data ? 'Simpan' : 'Tambah'}
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default InputModal;
