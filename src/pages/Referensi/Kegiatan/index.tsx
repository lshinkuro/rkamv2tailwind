import React, { useState, useEffect } from "react";
import { BreadCrumb } from "../../../components";
import {
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
import InputModal from "./inputmodal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";

let item: any = [];
let title: string = "";
function Kegiatan() {
  const [groupRole, setGroupRole] = React.useState<any>("");
  const [snp, setSnp] = React.useState<any>("");
  const [dataTable, setDataTable]: any = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");
  const refSnp: any[] = JSON.parse(localStorage.getItem("snp")!) || [];

  // setup data for every table
  const [resultsPerPage, setResultsPerPage] = React.useState<number>(10);
  const [totalResults, setTotalResults] = React.useState<number>(1);
  const [pageTable, setPageTable] = React.useState<number>(2);
  const [userRole, setUserRole] = React.useState<any>(null);
  const route = useHistory();
  const pathName = useLocation().pathname;
  const patenam = "kegiatan-snp";
  console.log(pathName);
  const pathnenam = pathName !== undefined ? pathName.split("/").pop() : "";

  React.useEffect(() => {
    // if (data) {
    let tmpSnp = refSnp.filter((obj: any) => {
      return obj.kode === pathnenam;
    });
    setSnp(tmpSnp[0]);
    // }
    setGroupRole(JSON.parse(localStorage.getItem("auth")!).group_role);
    const tmp0 = JSON.parse(localStorage.getItem("auth")!);
    setUserRole(tmp0.kode_role);
    const dataTmp: any = JSON.parse(localStorage.getItem(patenam)!);
    let tmp2: any = [];

    let tmpIdx: any = pathnenam ? pathnenam.length : 0;
    if (tmpIdx <= 6) {
      tmp2 = dataTmp.filter((obj: any) => {
        return obj.kode_snp == pathnenam;
      });
    } else {
      tmp2 = dataTmp;
    }
    setTotalResults(tmp2.length || 1);
    setDataTable(
      tmp2.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)
    );
  }, [pageTable]);

  React.useEffect(() => {
    const dataTmp: any = JSON.parse(localStorage.getItem(patenam)!);
    let tmp2: any = [];

    let tmpIdx: any = pathnenam ? pathnenam.length : 0;
    if (tmpIdx <= 6) {
      tmp2 = dataTmp.filter((obj: any) => {
        return obj.kode_snp == pathnenam;
      });
    } else {
      tmp2 = dataTmp;
    }

    setTotalResults(tmp2.length || 1);
    setDataTable(
      tmp2.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)
    );
  }, [localStorage.getItem(patenam)!]);

  function onPageChangeTable(p: number) {
    setPageTable(p);
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

  const status = (sts: number) => {
    if (sts === 1) {
      return "Ya";
    } else if (sts === 0) {
      return "Tidak";
    }
  };
  const color = (sts: number) => {
    if (sts === 1) {
      return "success";
    } else if (sts === 0) {
      return "warning";
    }
  };
  function goToKegiatan(kode: any, user?: any) {
    route.push({
      pathname: "/referensi/sub-kegiatan/" + kode,
      state: { kegiatan: user.kegiatan.nama, nama: user.kegiatan.kode },
    });
  }

  if (snp) {
    item = ["Home", "Referensi", "SNP", "Detail SNP"];
    title = "Detail Standar Nasional Pendidikan";
  } else {
    item = ["Home", "Referensi", "Kegiatan"];
    title = "Kegiatan";
  }

  return (
    <>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title={title} />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-end my-3">
          {(groupRole === "pusat" && (
            <div
              className="bg-blue-500 p-3  text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={showDetail}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </div>
          )) ||
            null}
        </div>
        <div className="text-md font-semibold text-gray-500">
          {snp ? <span>SNP :{snp?.kode + " - " + snp?.nama}</span> : ""}
        </div>
        <br />
        <div>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader className="bg-blue-500">
                <tr className="text-white">
                  <TableCell width={5}>Tahun</TableCell>
                  <TableCell width={5}>Kode</TableCell>
                  <TableCell>Nama Kegiatan</TableCell>
                  <TableCell>Madrasah </TableCell>
                  <TableCell>Ra</TableCell>
                  <TableCell width={5}>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell
                      onClick={() => {
                        goToKegiatan(
                          user.kode_snp + "." + user.kode_kegiatan,
                          user
                        );
                      }}
                    >
                      {user.kegiatan.tahun}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        goToKegiatan(
                          user.kode_snp + "." + user.kode_kegiatan,
                          user
                        );
                      }}
                    >
                      {user.kegiatan.kode}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        goToKegiatan(
                          user.kode_snp + "." + user.kode_kegiatan,
                          user
                        );
                      }}
                    >
                      {user.kegiatan.nama}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        goToKegiatan(
                          user.kode_snp + "." + user.kode_kegiatan,
                          user
                        );
                      }}
                    >
                      <Badge type={color(parseInt(user.status))}>
                        {status(Number(user.kegiatan.madrasah))}
                      </Badge>{" "}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        goToKegiatan(
                          user.kode_snp + "." + user.kode_kegiatan,
                          user
                        );
                      }}
                    >
                      <Badge type={color(user.status)}>
                        {status(Number(user.kegiatan.ra))}
                      </Badge>{" "}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-white">
                        <div
                          // layout="link"
                          className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1 cursor-pointer"
                          aria-label="details"
                          title="Lihat Detail"
                          onClick={() => {
                            goToKegiatan(
                              user.kode_snp + "." + user.kode_kegiatan,
                              user
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} size="sm" />
                        </div>
                        {groupRole === "pusat" && (
                          <>
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
                            || null
                          </>
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

export default Kegiatan;
