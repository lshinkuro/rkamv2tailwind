import React, { useState, useEffect } from "react";
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

import { useLocation, useHistory } from "react-router-dom";
import { ExportToExcel } from "../../../components/Export/ExportToExcel";
import InputModal from "./inputmodal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFileExport,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function JenisBelanja() {
  const item = ["Home", "Referensi", "Jenis Belanja"];
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");
  const [groupRole, setGroupRole] = React.useState<any>("");
  const [SortUp, setSortUp] = useState<boolean>(false);
  const [kodeRole, setKodeRole] = useState<any>("");

  const route = useHistory();
  const [totalResults, setTotalResults] = useState<number>(1);

  // setup data for every table
  const [dataTable, setDataTable] = useState<any>([]);
  const [toExport, setToExport] = React.useState<any>(dataTable);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);

  const [pageTable, setPageTable] = useState<number>(2);
  const pathName = useLocation().pathname;

  // let patenam: any = pathName.split("/").pop();
  let patenam = "kategori-belanja";
  useEffect(() => {
    let tmpAuth: any = JSON.parse(localStorage.getItem("auth")!);
    setKodeRole(tmpAuth.kode_role);

    setGroupRole(JSON.parse(localStorage.getItem("auth")!).group_role);
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

  const exportToXlsx = (apiData: any, fileName: any) => {
    let tmp0: any = [];
    apiData.forEach((el0) => {
      tmp0.push({
        kode: el0.kode,
        nama: el0.nama,
      });
    });

    ExportToExcel(tmp0, fileName);
  };

  function addJenisBelanja() {
    setIsModalOpen(true);
  }
  function editJenisBelanja(data: any) {
    setIsModalOpen(true);
    setModalData(data);
  }

  function hideDetails() {
    setModalData("");
    setIsModalOpen(false);
  }
  function deleteData(data: any) {
    let tmp0: any = [];
    tmp0.push({
      id: data.id,
      isDeleted: "deleted",
    });
    setIsModalOpen(true);
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
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title="Kategori Jenis Belanja" />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-end my-3">
          <div
            className="bg-blue-600 p-3  text-white cursor-pointer hover:bg-blue-700 flex items-center justify-start"
            onClick={() => {
              exportToXlsx(dataTable, "jenis-belanja");
            }}
          >
            <FontAwesomeIcon icon={faFileExport} size="sm" />
          </div>
          {kodeRole === "super_admin_pusat" || kodeRole === "admin_pusat" || kodeRole === "admin_kabkota" ? (
            <div
              className="bg-blue-500 p-3  mr-1 text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={addJenisBelanja}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader className="bg-blue-600">
                <tr className="text-white">
                  <TableCell
                    className="cursor-pointer hover:bg-blue-700"
                    onClick={() => {
                      if (SortUp) {
                        dataTable.sort((a, b) => {
                          return a.kode > b.kode ? 1 : -1;
                        });
                      } else {
                        dataTable.sort((a, b) => {
                          return a.kode < b.kode ? 1 : -1;
                        });
                      }
                      setSortUp(!SortUp);
                    }}
                  >
                    Kode{" "}
                  </TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell width={100} align="center">
                    Actions
                  </TableCell>
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell
                      onClick={() => {
                        route.push({
                          pathname: "jenis-belanja/" + user.kode,
                          state: { kode: user.kode, nama: user.nama },
                        });
                      }}
                    >
                      {user.kode}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        const state = {
                          kode: user.kode,
                          nama: user.nama,
                        };
                        route.push({
                          pathname: `jenis-belanja/${user.kode}`,
                          state,
                        });
                      }}
                    >
                      {user.nama}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center text-white">
                        <div
                          // layout="link"
                          className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1 cursor-pointer"
                          aria-label="details"
                          title="Lihat Detail"
                          onClick={() => {
                            const state = {
                              kode: user.kode,
                              nama: user.nama,
                            };
                            route.push({
                              pathname: `jenis-belanja/${user.kode}`,
                              state,
                            });
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
                                editJenisBelanja(user);
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
    </>
  );
}

export default JenisBelanja;
