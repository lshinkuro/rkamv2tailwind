import React from 'react'
import { Label, Input, Button, Select } from '@windmill/react-ui';


const Profile = () => {
    return (
        <>
            <div className="flex flex-col  p-2n  gap-4 ">
                <p>Profil</p>
                <hr className="my-3"/>
                <div className="flex  flex-col  md:flex-row gap-2 ">
                    <div className="flex-1">
                        <Label >
                            <span className="text-gray-400">NPSN*</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                    <div className="flex-1">
                        <Label >
                            <span className="text-gray-400">Nama Lembaga*</span>
                            <Select className="mt-1">
                                <option>Standar 1</option>
                                <option>Standar 2</option>
                            </Select>
                        </Label>
                    </div>
                </div>

                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <div className="flex-1">
                        <Label >
                            <span className="text-gray-400">Jenjang*</span>
                            <Select className="mt-1">
                                <option>Standar 1</option>
                                <option>Standar 2</option>
                            </Select>
                        </Label>
                    </div>
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Status Madrasah *</span>
                            <Select className="mt-1">
                                <option>Standar 1</option>
                                <option>Standar 2</option>
                            </Select>                        </Label>
                    </div>
                </div>
                <p>Alamat</p>
                <hr className="my-2"/>

                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Provinsi *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Kabupaten *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                </div>
                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Kecamatan *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Kelurahan *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                </div>

                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Rt *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Rw *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                </div>

                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Alamat *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Kode Pos *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                </div>

                <p>Informasi lainya</p>
                <hr className="my-2"/>

                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">NPWP *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Email *</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                </div>

                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <div className="flex-1">
                        <Label>
                            <span className="text-gray-400">Website*</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                    <div className="flex-1">
                    </div>
                </div>
                <hr className="my-2"/>
                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <div className="flex-1 pl-3">
                        <Button   layout="outline" className="mr-2" >Batal</Button>
                        <Button  className="mr-2">Tambah</Button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Profile
