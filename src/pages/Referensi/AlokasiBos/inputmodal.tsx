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

type PageHeaderProps = {
    isOpen: boolean;
    onClose: () => void;
    data: any
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
    // console.log(data)
    if (data) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} >

                <ModalHeader>Edit Kegiatan</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col p-2 ">
                        <Label>
                            <span className="text-gray-400 ">Jenjang *</span>
                            <Input className="mt-1" defaultValue={data.jenjang} />
                        </Label>
                        <Label >
                            <span className="text-gray-400">Status Sekolah*</span>
                            <Input className="mt-1" placeholder="" defaultValue={data.statusSekolah} />
                        </Label>
                        <Label>
                            <span className="text-gray-400">Satuan Kerja Madrasah *</span>
                            <Input className="mt-1" placeholder="" defaultValue={data.satkerMadrasah} />
                        </Label>
                        <Label>
                            <span className="text-gray-400 ">Pusat *</span>
                            <Input className="mt-1" placeholder="" defaultValue={data.pusat} />
                        </Label>
                        <Label>
                            <span className="text-gray-400">Provinsi *</span>
                            <Input className="mt-1" placeholder="" defaultValue={data.provinsi} />
                        </Label>
                        <Label>
                            <span className="text-gray-400 ">Kab/Kota *</span>
                            <Input className="mt-1" placeholder="" defaultValue={data.kabkota} />
                        </Label>
                        <Label>
                            <span className="text-gray-400">Activated *</span>
                            <Input className="mt-1" placeholder="" defaultValue={data.activated} />
                        </Label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="hidden sm:block ">
                        <Button layout="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={() => { }}>
                            Edit
                        </Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button block size="large" onClick={() => { }}>
                            Edit
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        )
    }
    return (

        <Modal isOpen={isOpen} onClose={onClose} >

            <ModalHeader>Tambah SNP </ModalHeader>
            <ModalBody>
                <div className="flex flex-col p-2 ">
                    <div className="w-auto">
                        <Label>
                            <span className="text-gray-400 ">Jenjang *</span>
                            <Input className="mt-1" />
                        </Label>
                        <Label >
                            <span className="text-gray-400">Status Sekolah*</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                        <Label>
                            <span className="text-gray-400">Satuan Kerja Madrasah *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                        <Label>
                            <span className="text-gray-400 ">Pusat *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                        <Label>
                            <span className="text-gray-400">Provinsi *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                        <Label>
                            <span className="text-gray-400 ">Kab/Kota *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                        <Label>
                            <span className="text-gray-400">Activated *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="hidden sm:block ">
                    <Button layout="outline" onClick={onClose}>
                        Cancel
                        </Button>
                    <Button onClick={() => { }}>
                        Tambah
                        </Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button block size="large" layout="outline" onClick={onClose}>
                        Cancel
                        </Button>
                    <Button block size="large" onClick={() => { }}>
                        Tambah
                        </Button>
                </div>
            </ModalFooter>
        </Modal>

    )
}

export default InputModal
