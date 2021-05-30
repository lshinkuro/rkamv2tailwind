import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../../components";
import {
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
  Pagination,
} from "@windmill/react-ui";
import InputModal from "../../../components/ModalMPengguna/modal";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>("");

  const [totalResults, setTotalResults] = useState<number>(1);

  // setup data for every table
  const [dataTable, setDataTable] = useState<any>([]);
  const [resultsPerPage, setResultsPerPage] = useState<number>(5);

  const [pageTable, setPageTable] = useState<number>(2);
  const pathName = useLocation().pathname;
  let patenam: any = pathName.split("/").pop();
  function getTable() {
    let data: any = JSON.parse(localStorage.getItem(patenam)!) || [];
    setTotalResults(data.length || 1);
    setDataTable(
      data.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)
    );
  }
  useEffect(() => {
    getTable();
  }, [localStorage.getItem(patenam)]);

  useEffect(() => {
    getTable();
  }, [pageTable]);

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

  const status = (sts: any) => {
    // return sts
    if (sts === 1) {
      return "Aktif";
    } else if (sts === 0) {
      return "Tidak Aktif";
    }
  };
  const color = (sts: any) => {
    if (sts === 1) {
      return "success";
    } else if (sts === 0) {
      return "warning";
    }
  };
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  const item = ["Home", "Pengaturan", "managemen User", patenam];
  return (
    <>
      <InputModal
        isRole={patenam}
        onClose={hideDetails}
        isOpen={isModalOpen}
        data={modalData}
      />

      <BreadCrumb
        data={item}
        title={patenam.charAt(0).toUpperCase() + patenam.slice(1)}
      />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-end my-3">
          <div
            className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
            onClick={showDetail}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </div>
        </div>
        <div>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader className="bg-blue-600">
                <tr className="text-white">
                  <TableCell>Nama</TableCell>
                  <TableCell>NIK</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Aksi</TableCell>
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.length > 0
                  ? dataTable.map((user: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell>{user ? user.profile?.nama : ""}</TableCell>
                        <TableCell>{user ? user.profile?.nik : ""}</TableCell>
                        <TableCell>
                          {user ? user.profile?.user.email : ""}
                        </TableCell>
                        <TableCell>{user ? user.role?.nama : ""}</TableCell>
                        <TableCell>
                          <Badge type={color(1)}>{status(1)}</Badge>{" "}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-white">
                            <div
                              // layout="link"
                              className="bg-yellow-300 hover:bg-yellow-400 mx-0 px-2 py-1 cursor-pointer"
                              aria-label="details"
                              title="Setujui"
                              onClick={() => {
                                showDetails(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faPencilAlt} size="sm" />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : "sinkron"}
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
