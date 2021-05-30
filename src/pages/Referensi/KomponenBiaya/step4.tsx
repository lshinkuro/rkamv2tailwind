import React from "react";
import {
    Button,
    Label,
    Select,
} from "@windmill/react-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Step4({ nextStep, prevStep }) {
    const refProvinsi: { kode: string, nama: string }[] = JSON.parse(localStorage.getItem("provdropdown")!)
    const refKabkota: { kode: string, nama: string, kode_provinsi: string }[] = JSON.parse(localStorage.getItem("kabkotadropdown")!)
    const [selectedProvinsi, setSelectedProvinsi] = React.useState(refProvinsi[0].kode);
    const [selectedKabkota, setSelectedKabkota] = React.useState("");

    return (<>
        <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
            <div className="flex flex-col  md:flex-row gap-2 ">
                <div className="flex-1">
                    <Label>
                        <span className="text-gray-400">Provinsi</span>
                        <Select
                            className="mt-1 text-gray-500"
                            placeholder="semua Provinsi"
                            defaultValue={refProvinsi[0].kode}
                            onChange={(e: any) => { setSelectedProvinsi(e.currentTarget.value) }}
                        >
                            {refProvinsi.map((el) => {
                                return (<option key={el.kode} value={el.kode}>{el.nama}</option>)
                            })}
                        </Select>
                    </Label>
                </div>
                <div className="flex-1">
                    <Label>
                        <span className="text-gray-400">Kab/Kota</span>
                        <Select
                            className="mt-1 text-gray-500"
                            placeholder="semua Kab/Kota"
                        >
                            {refKabkota.map((el) => {
                                if (el.kode_provinsi === selectedProvinsi)
                                    return (<option key={el.kode} value={el.kode}>{el.nama}</option>)
                            })}
                        </Select>
                    </Label>
                </div>
            </div>
        </div>
        <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
            <div className="flex flex-row justify-end my-3 space-x-2">
                <Button onClick={prevStep}
                    className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-2 rounded-md">
                    <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
                    <span className="text-xs">Kembali</span>
                </Button>
                <Button onClick={nextStep}
                    disabled
                    className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-2 rounded-md">
                    <span className="text-xs">Lanjut</span>
                    <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
                </Button>
            </div>
        </div>
    </>)
}

export default Step4;