import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../../components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
  Pagination,
} from "@windmill/react-ui";
import InputModal from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>("");
  const [kodeRole, setKodeRole] = useState<any>("");

  const route = useHistory();
  const [totalResults, setTotalResults] = useState<number>(1);

  // setup data for every table
  const [dataTable, setDataTable] = useState<any>([]);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);

  const [pageTable, setPageTable] = useState<number>(2);
  const pathName = useLocation().pathname;
  let patenam: any = pathName.split("/").pop();
  useEffect(() => {
    let tmpAuth: any = JSON.parse(localStorage.getItem("auth")!);
    setKodeRole(tmpAuth.kode_role);
    setTotalResults(JSON.parse(localStorage.getItem(patenam)!).length || 1);
    setDataTable(
      JSON.parse(localStorage.getItem(patenam)!).slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
    // }
  }, [pageTable]);

  useEffect(() => {
    // if (localStorage.getItem(patenam)) {
    setTotalResults(JSON.parse(localStorage.getItem(patenam)!).length || 1);
    setDataTable(
      JSON.parse(localStorage.getItem(patenam)!).slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
    // }
  }, [localStorage.getItem(patenam)!]);

  function showDetails(data: any) {
    setIsModalOpen(true);
    setModalData(data);
  }
  function showDetail() {
    setIsModalOpen(true);
  }

  function hideDetails() {
    setModalData("");
    setIsModalOpen(false);
  }
  function deleteData(data: any) {
    let tmp0: any = [];
    tmp0.push({
      id: data?.id,
      kode: data.kode,
      nama: data.nama,
      tahun: data.tahun,
      isDeleted: "deleted",
    });
    setIsModalOpen(true);
    setModalData(tmp0[0]);
  }

  function onPageChangeTable(p: number) {
    setPageTable(p);
  }
  function goToKegiatan(kode: any) {
    route.push("/referensi/kegiatan/" + kode);
  }

  const item = ["Home", "Referensi", "SNP"];
  return (
    <>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title="Standar Nasional Pendidikan" />
      <div className="m-5 p-5 bg-white shadow-md ">
        {kodeRole === "admin_pusat" || kodeRole === "super_admin_pusat" ? (
          <div className="flex flex-row justify-end my-3">
            <div
              className="bg-blue-500 p-3  text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={showDetail}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader className="bg-blue-500">
                <tr className="text-white">
                  <TableCell width={5}>Kode</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell width={15}>Tahun</TableCell>
                  <TableCell width={150} align="center">
                    Actions
                  </TableCell>
                </tr>
              </TableHeader>
              <TableBody className="text-sm cursor-pointer">
                {dataTable.map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell
                      onClick={() => {
                        goToKegiatan(user.kode);
                      }}
                    >
                      {user.kode}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        goToKegiatan(user.kode);
                      }}
                    >
                      {user.nama}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        goToKegiatan(user.kode);
                      }}
                    >
                      {user.tahun}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center text-white">
                        <div
                          // layout="link"
                          className="bg-blue-500 hover:bg-blue-600 mx-0 px-2 py-1  cursor-pointer"
                          aria-label="details"
                          title="Lihat Detail"
                          onClick={() => {
                            goToKegiatan(user.kode);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} size="sm" />
                        </div>
                        {kodeRole === "admin_pusat" ||
                        kodeRole === "super_admin_pusat" ? (
                          <>
                            <div
                              // layout="link"
                              className="bg-yellow-300 hover:bg-yellow-400 mx-0 px-2 py-1 cursor-pointer"
                              aria-label="edit"
                              title="Edit"
                              onClick={() => {
                                showDetails(user);
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
                        ) : (
                          ""
                        )}
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
    </>
  );
}

export default Index;
