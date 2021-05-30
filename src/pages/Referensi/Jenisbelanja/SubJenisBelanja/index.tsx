import React, { useState, useEffect } from "react";
import { BreadCrumb } from "../../../../components";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
  Pagination,
} from "@windmill/react-ui";

import { useLocation, useHistory, Router } from "react-router-dom";
import { ExportToExcel } from "../../../../components/Export/ExportToExcel";
import InputModal from "./inputmodal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faFileExport,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function JenisBelanja() {
  const item = ["Home", "Referensi", "Sub Jenis Belanja"];
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isInputModalOpen, setIsInputModalOpen] = React.useState<boolean>(
    false
  );
  const [modalData, setModalData] = React.useState<any>("");
  const [groupRole, setGroupRole] = React.useState<any>("");
  const [kodeRole, setKodeRole] = useState<any>("");


  const location = useLocation();
  const passing: any = location.state;
  console.log("", passing);

  const route = useHistory();
  const [totalResults, setTotalResults] = useState<number>(1);

  // setup data for every table
  const [dataTable, setDataTable] = useState<any>([]);
  const [toExport, setToExport] = React.useState<any>(dataTable);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);

  const [pageTable, setPageTable] = useState<number>(2);
  const pathName = useLocation().pathname;
  const pathnenam = pathName !== undefined ? pathName.split("/").pop() : "";
  console.log("path", pathnenam);

  // let patenam: any = pathName.split("/").pop();
  let patenam = "jenis-belanja";
  useEffect(() => {
    let tmpAuth: any = JSON.parse(localStorage.getItem("auth")!);
    setKodeRole(tmpAuth.kode_role);
    setGroupRole(JSON.parse(localStorage.getItem("auth")!).group_role);
    let dataTmp: any = JSON.parse(localStorage.getItem(patenam)!);

    let tmp2 = dataTmp.filter((obj: any) => {
      return obj.kode_kategori === pathnenam;
    });

    console.log("filter", tmp2);

    setTotalResults(JSON.parse(localStorage.getItem(patenam)!).length || 1);
    setDataTable(
      tmp2.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)
    );
    // }
  }, [pageTable, localStorage.getItem(patenam)!]);

  useEffect(() => {
    let dataTmp: any = JSON.parse(localStorage.getItem(patenam)!);

    let tmp2 = dataTmp.filter((obj: any) => {
      return obj.kode_kategori === pathnenam;
    });

    console.log("filter", tmp2);

    setTotalResults(JSON.parse(localStorage.getItem(patenam)!).length || 1);
    setDataTable(
      tmp2.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)
    );
    // }
  }, [localStorage.getItem(patenam)!]);

  const exportToXlsx = (apiData: any, fileName: any) => {
    let tmp1: any = null;
    tmp1 = apiData.filter((obj: any) => {
      return obj.id !== obj.id;
    });

    ExportToExcel(tmp1, fileName);
  };

  function showDetails(data: any) {
    setIsModalOpen(true);
    setModalData(data);
  }
  function showInputModal(data: any) {
    setIsInputModalOpen(true);
    setModalData(data);
  }
  function addModal() {
    setIsInputModalOpen(true);
    setModalData({ kode_kategori: passing.kode });
  }

  function hideDetails() {
    setModalData("");
    setIsModalOpen(false);
    setIsInputModalOpen(false);
  }
  function deleteData(data: any) {
    let tmp0: any = [];
    tmp0.push({
      id: data.id,
      isDeleted: "deleted",
    });
    setIsInputModalOpen(true);
    setModalData(tmp0[0]);
  }

  const status = (sts: number) => {
    if (sts === 1) {
      return "active";
    } else if (sts === 0) {
      return "waiting";
    }
  };
  const color = (sts: number) => {
    if (sts === 1) {
      return "success";
    } else if (sts === 0) {
      return "warning";
    }
  };

  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  return (
    <>
      <InputModal
        onClose={hideDetails}
        isOpen={isInputModalOpen}
        data={modalData}
      />
      <BreadCrumb data={item} title="Sub Jenis Belanja" />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-between my-3">
          <div className="text-xl font-semibold text-gray-500">
            {passing ? passing.kode : ""}. {passing ? passing.nama : ""}
          </div>
          <div className="flex flex-col md:flex-row">
          {kodeRole === "super_admin_pusat" || kodeRole === "admin_pusat" || kodeRole === "admin_kabkota" ? (
          <div
            className="bg-blue-500 p-3  mr-1 text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
            onClick={addModal}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </div>

          ):""}
          <div
            className="bg-yellow-300 p-3  text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
            onClick={() => {
              exportToXlsx(toExport, "jenis-belanja");
            }}
          >
            <FontAwesomeIcon icon={faFileExport} size="sm" />
          </div>
          </div>
        </div>
        <div>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader className="bg-blue-600">
                <tr className="text-white">
                  <TableCell>Kode </TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell
                      onClick={() => {
                        showDetails(user);
                      }}
                    >
                      {user.kode}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        showDetails(user);
                      }}
                    >
                      {user.nama}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-white">
                        <div
                          // layout="link"
                          className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1 cursor-pointer"
                          aria-label="details"
                          title="Lihat Detail"
                          onClick={() => {
                            showDetails(user);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} size="sm" />
                        </div>
                        {(groupRole == "pusat" || groupRole == "kabkota" && (
                          <>
                            <div
                              // layout="link"
                              className="bg-yellow-300 hover:bg-yellow-400 mx-0 px-2 py-1 cursor-pointer"
                              aria-label="details"
                              title="Setujui"
                              onClick={() => {
                                showInputModal(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faPencilAlt} size="sm" />
                            </div>
                            <div
                              // layout="link"
                              className="bg-red-500 hover:bg-red-600 mx-0 px-2 py-1  cursor-pointer"
                              aria-label="details"
                              title="hapus"
                              onClick={() => {
                                deleteData(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                            </div>
                          </>
                        )) ||
                          null}
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
      {/* modal is open */}
      <Modal isOpen={isModalOpen} onClose={hideDetails}>
        <ModalHeader>{modalData.nama} :</ModalHeader>
        <ModalBody>
          <div className="flex flex-col p-2 border-t-2">
            <div className="flex-1">{modalData.deskripsi}</div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={hideDetails}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={hideDetails}>
              Cancel
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default JenisBelanja;
