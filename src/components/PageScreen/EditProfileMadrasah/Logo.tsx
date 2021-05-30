import React from 'react';
import { Label, Input, Button, Select } from '@windmill/react-ui';
import {CrossIcon,UploadIcon} from "../../../icons"


function Logo() {
    return (
        <>
            <div className="flex flex-col  p-2n  gap-4 ">
                <p>Logo</p>
                <hr className="my-3" />
                <div className="flex  flex-col  md:flex-row gap-2 ">
                    <div className="flex-1">
                            <div id="empty-cover-art" className=" border-2 border-gray-500 p-5 justify-center  rounded sm:w-full md:w-48 md:h-48 py-10 text-center opacity-50 md:border-solid md:border-2 md:border-gray-400">
                              <UploadIcon
                              className="w-full"                 
                              />
                            <div className="py-4">
                                Upload Image
                            </div>
                            </div>
                    </div>
                    <div className="flex-1">
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

export default Logo
