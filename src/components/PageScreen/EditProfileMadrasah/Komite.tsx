import React from 'react'
import { Label, Input, Button, Select } from '@windmill/react-ui';


function Komite() {
    return (
        <>
            <div className="flex flex-col  p-2n  gap-4 ">
                <p>Komite</p>
                <hr className="my-3" />
                <div className="flex  flex-col  md:flex-row gap-2 ">
                    <div className="flex-1">
                        <Label >
                            <span className="text-gray-400">Nama Ketua Komite*</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                    <div className="flex-1">
                        <Label >
                            <span className="text-gray-400">NIK Ketua komite*</span>
                            <Input className="mt-1" placeholder="" />
                        </Label>
                    </div>
                </div>

                <hr className="my-2" />
                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <div className="flex-1 pl-3">
                        <Button layout="outline" className="mr-2" >Batal</Button>
                        <Button className="mr-2">Tambah</Button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Komite
