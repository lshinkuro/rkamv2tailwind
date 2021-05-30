import React, { useState, useEffect } from "react";
import { BreadCrumb, Button1 } from "../../../components";
import {
  Badge,
  Button,
  Modal,
  Label,
  Input,
  Dropdown,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import { TrashIcon, EditIcon } from "../../../icons";
import response from "../../../utils/demo/dataStafMadrasah";
import {getroleuser} from "../../../services/roleuser"


function StaffMadrasah() {

  const item = ["Pengaturan", "Staff Madrasah"];
  const [pageTable, setPageTable] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>("");
  const [dataTable, setDataTable] = useState<any>([]);

  const authJson: any = localStorage.getItem("auth");
  const authStore = JSON.parse(authJson);


  //pagination setup
  const resultsPerPage = 10;
  const totalResults = dataTable.length;

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }
  console.log("table", dataTable);

  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
  }, [pageTable]);
 

  useEffect(()=>{
    getroleuser(authStore.group_role)
    .then((data)=>{         
     
    })
  },[])



  function showDetails() {
    setIsModalOpen(true);
  }

  function hideDetails() {
    setIsModalOpen(false);
  }

  // setup data for every table


  // const status = (sts: number) => {
  //   if (sts === 1) {
  //     return "setuju"
  //   } else if (sts === 0) {
  //     return  "reject"
  //   } else {
  //     return "waiting"
  //   }
  // };

  const bdg = (sts: number) => {
    if (sts === 1) {
      return "success";
    } else if (sts === 0) {
      return "danger";
    } else {
      return "warning";
    }
  };

  const tooltip = (sts: number, tgl: string) => {
    if (sts === 1) {
      return tgl;
    } else if (sts === 0) {
      return tgl;
    } else {
      return "";
    }
  };

  return (
    <div>
      <BreadCrumb data={item} title="Staff Madrasah" />
      <div className="px-6">
        <div className="max-w-auto pt-4 pb-10 px-8 bg-white dark:bg-gray-900 shadow-sm rounded-sm my-3">
          <div className="flex flex-col md:flex-row justify-start ">
            <h1 className="px-3 text-teal-700 mr-5" style={{ fontSize: 20 }}>
              Staff Madrasah
            </h1>
            <Button1 onClick={showDetails} label="tambah" />
          </div>
          <div>
            <div className="px-3 py-4 flex justify-center">
              <TableContainer className="mb-8">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell>NIK</TableCell>
                      <TableCell>Nama</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {dataTable.map((user: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="dark:text-white-400">
                          {user.nik}
                        </TableCell>
                        <TableCell>{user.nama}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          {user.status === "1" ? (
                            <Badge
                              title={tooltip(Number(user.status), "18-04-2021")}
                              type={bdg(Number(user.status))}
                            >
                              active
                            </Badge>
                          ) : (
                            "not active"
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <Button
                              layout="link"
                              aria-label="details"
                              title="edit"
                            >
                              <EditIcon
                                className="w-4"
                                aria-hidden="true"
                                title="edit"
                              />
                            </Button>
                            <Button
                              layout="link"
                              aria-label="details"
                              title="hapus"
                            >
                              <TrashIcon
                                className="w-3"
                                aria-hidden="true"
                                title="hapus"
                              />
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
      <Modal isOpen={isModalOpen} onClose={hideDetails}>
        <ModalHeader>Tambah Staf Madrasah</ModalHeader>
        <ModalBody>
          <div className="flex flex-col p-2 ">
            <div className="w-auto">
              <Label>
                <span className="text-gray-400">Role *</span>
                <Input className="mt-1" placeholder="" />
              </Label>
              <Label>
                <span className="text-gray-400">Nama *</span>
                <Input className="mt-1" placeholder="" />
              </Label>
              <Label>
                <span className="text-gray-400 ">NIK *</span>
                <Input className="mt-1" placeholder="" />
              </Label>
              <Label>
                <span className="text-gray-400">Email *</span>
                <Input className="mt-1" placeholder="" />
              </Label>
              <Label>
                <span className="text-gray-400">Password *</span>
                <Input type="password" className="mt-1" placeholder="" />
              </Label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block  flex-row">
            <Button layout="outline" onClick={hideDetails}>
              Cancel
            </Button>
            <Button
              layout="outline"
              className="bg-blue-500 "
              onClick={hideDetails}
            >
              Tambah
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={hideDetails}>
              Cancel
            </Button>
            <Button
              block
              size="large"
              layout="outline"
              className="bg-blue-500 "
              onClick={hideDetails}
            >
              Tambah
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default StaffMadrasah;
