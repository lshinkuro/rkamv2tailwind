import React, { useState, useEffect } from 'react'
import {
    BreadCrumb,
    Button1
} from "../../../components"



import { Badge, Button, Modal, Label, Input, Select, ModalBody, ModalFooter, ModalHeader, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from '@windmill/react-ui';
import { TrashIcon, EditIcon } from '../../../icons';
import response from '../../../utils/demo/dataPenerima'


function StaffMadrasah() {
    const item = ["Pengaturan", "Penerima"]
    const [pageTable, setPageTable] = useState<number>(1)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState<any>('')
    const [startDate, setStartDate] = useState(new Date());


    function showDetails() {
        setIsModalOpen(true)
    }

    function hideDetails() {
        setIsModalOpen(false)
    }

    // setup data for every table
    const [dataTable, setDataTable] = useState<any>([])



    // pagination setup
    const resultsPerPage = 10
    const totalResults = response.length

    // pagination change control
    function onPageChangeTable(p: number) {
        setPageTable(p)
    }
    console.log("table", dataTable)

    useEffect(() => {
        setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
    }, [pageTable])

    const status = (sts: number) => {
        if (sts === 1) {
            return "setuju"
        } else if (sts === 0) {
            return "reject"
        } else {
            return "waiting"
        }
    }

    const bdg = (sts: number) => {
        if (sts === 1) {
            return "success"
        } else if (sts === 0) {
            return "danger"
        } else {
            return "warning"
        }
    }

    const tooltip = (sts: number, tgl: string) => {
        if (sts === 1) {
            return tgl
        } else if (sts === 0) {
            return tgl
        } else {
            return ""
        }
    }

    return (
        <div className="">
            <BreadCrumb data={item} title="Penerima" />
            <div className="px-6">
                <div className="max-w-auto pt-4 pb-10 px-8 bg-white dark:bg-gray-900 shadow-sm rounded-sm my-3">
                    <div className="flex flex-col md:flex-row justify-start ">
                        <h1 className="px-3 text-teal-700 mr-5" style={{ fontSize: 20 }}>Penerima</h1>
                        <Button1 onClick={showDetails} label="tambah" />
                    </div>
                    <div>
                        <div className="px-3 py-3 flex justify-center xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm max-w-full">
                            <TableContainer className="mb-8 table-fixed md:overflow-x-auto overflow-hidden" >
                                <Table>
                                    <TableHeader>
                                        <tr>
                                            <TableCell>Tipe Penerima</TableCell>
                                            <TableCell>Nama</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>NPWP</TableCell>
                                            <TableCell>Provinsi</TableCell>
                                            <TableCell>Kab/Kota</TableCell>
                                            <TableCell>Kecamatan</TableCell>
                                            <TableCell>Kelurahan</TableCell>
                                            <TableCell>Rt</TableCell>
                                            <TableCell>Rw</TableCell>
                                            <TableCell>Alamat</TableCell>
                                            <TableCell>Keterangan</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </tr>
                                    </TableHeader>
                                    <TableBody>
                                        {dataTable.map((user: any, i: number) => (
                                            <TableRow key={i}>
                                                <TableCell className="dark:text-white-400">
                                                    {user.tipePenerima}
                                                </TableCell>
                                                <TableCell>
                                                    {user.nama}
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    {user.npwp}
                                                </TableCell>
                                                <TableCell>
                                                    {user.provinsi}
                                                </TableCell>
                                                <TableCell>
                                                    {user.kabupaten}
                                                </TableCell>
                                                <TableCell>
                                                    {user.kecamatan}
                                                </TableCell>
                                                <TableCell>
                                                    {user.kelurahan}
                                                </TableCell>
                                                <TableCell>
                                                    {user.rt}
                                                </TableCell>
                                                <TableCell>
                                                    {user.rw}
                                                </TableCell>
                                                <TableCell>
                                                    {user.alamat}
                                                </TableCell>
                                                <TableCell>
                                                    {user.keterangan}
                                                </TableCell>
                                                <TableCell className="overflow-x-hidden">
                                                    <div className="flex items-center space-x-4">
                                                        <Button layout="link" aria-label="details" title="edit">
                                                            <EditIcon className="w-4" aria-hidden="true" title="edit" />
                                                        </Button>
                                                        <Button layout="link" aria-label="details" title="hapus">
                                                            <TrashIcon className="w-3" aria-hidden="true" title="hapus" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TableFooter>
                                    <Pagination
                                        totalResults={totalResults}
                                        resultsPerPage={resultsPerPage}
                                        onChange={onPageChangeTable}
                                        label="Table navigation"
                                    />
                                </TableFooter>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={hideDetails} >
                <ModalHeader>Tambah Penerima </ModalHeader>
                <ModalBody className="">
                    <div className="flex flex-col  p-2n  ">
                        <div className="flex  flex-col  md:flex-row gap-2 ">
                            <div className="flex-1">
                            <Label >
                                <span className="text-gray-400">Tipe Penerima*</span>
                                <Select className="mt-1">
                                    <option>$1,000</option>
                                    <option>$5,000</option>
                                </Select>
                            </Label>
                            </div>
                            <div className="flex-1">     
                                <Label>
                                <span className="text-gray-400">Nama *</span>
                                <Input className="mt-1" placeholder="" />
                                </Label>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col md:flex-row gap-2">
                            <div className="flex-1">
                               <Label>
                                <span className="text-gray-400">Email *</span>
                                <Input className="mt-1" placeholder="" />
                                </Label>
                            </div>
                            <div className="flex-1">     
                                <Label>
                                <span className="text-gray-400">NPWP *</span>
                                <Input className="mt-1" placeholder="" />
                                </Label>
                            </div>
                        </div>
                        
                        <div className="flex flex-1 flex-col md:flex-row gap-2">
                            <div className="flex-1">
                            <Label >
                                <span className="text-gray-400">Provinsi*</span>
                                <Select className="mt-1">
                                    <option>$1,000</option>
                                    <option>$5,000</option>
                                </Select>
                            </Label>
                            </div>
                            <div className="flex-1">     
                            <Label >
                                <span className="text-gray-400">Kabupaten/ Kota*</span>
                                <Select className="mt-1">
                                    <option>$1,000</option>
                                    <option>$5,000</option>
                                </Select>
                            </Label>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col md:flex-row gap-2">
                            <div className="flex-1">
                            <Label >
                                <span className="text-gray-400">Kecamatan*</span>
                                <Select className="mt-1">
                                    <option>$1,000</option>
                                    <option>$5,000</option>
                                </Select>
                            </Label>
                            </div>
                            <div className="flex-1">     
                            <Label >
                                <span className="text-gray-400">Kelurahan*</span>
                                <Select className="mt-1">
                                    <option>$1,000</option>
                                    <option>$5,000</option>
                                </Select>
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
                                <span className="text-gray-400">Alamat Jalan *</span>
                                <Input className="mt-1" placeholder="" />
                                </Label>
                            </div>
                            <div className="flex-1">     
                                <Label>
                                <span className="text-gray-400">Keterangan *</span>
                                <Input className="mt-1" placeholder="" />
                                </Label>
                            </div>
                        </div>


            
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="hidden sm:block  flex-row">
                        <Button layout="outline" onClick={hideDetails}>
                            Cancel
            </Button>
                        <Button layout="outline" className="bg-blue-500 " onClick={hideDetails}>
                            Tambah
            </Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={hideDetails}>
                            Cancel
            </Button>
                        <Button block size="large" layout="outline" className="bg-blue-500 " onClick={hideDetails}>
                            Tambah
            </Button>

                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default StaffMadrasah

