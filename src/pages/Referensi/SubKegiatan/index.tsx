import React from "react";
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
import InputModal from "./inputmodal";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function SubKegiatan() {
  const item = ["Home", "Referensi", "Sub Kegiatan"];
  const [groupRole, setGroupRole] = React.useState<any>("");

  const [dataTable, setDataTable]: any = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");
  const refSnp: any[] = JSON.parse(localStorage.getItem("snp")!) || [];
  const refKegiatan: any[] =
    JSON.parse(localStorage.getItem("kegiatan-snp")!) || [];
  // setup data for every table
  const [resultsPerPage, setResultsPerPage] = React.useState<number>(10);
  const [totalResults, setTotalResults] = React.useState<number>(1);
  const [pageTable, setPageTable] = React.useState<number>(2);
  const [userRole, setUserRole] = React.useState<any>(null);
  const [sn, setSn] = React.useState<any>("");
  const [snp, setSnp] = React.useState<any>("");
  const [snpKegiatan, setSnpKegiatan] = React.useState<any>("");
  const location = useLocation();
  const passing: any = location.state;

  const pathName = useLocation().pathname;
  const patenam = "sub-kegiatan";

  const pathnenam = pathName !== undefined ? pathName.split("/").pop() : "";

  React.useEffect(() => {
    let tmpSnp = refSnp.filter((obj: any) => {
      return obj.kode === pathnenam?.split(".")[0] || "";
    });
    setSnp(tmpSnp[0] || []);

    let tmpSnpKegiatan = refKegiatan.filter((obj: any) => {
      return (
        obj.kode_kegiatan === pathnenam?.split(".")[1] ||
        "" ||
        ("" && obj.kode_snp === pathnenam?.split(".")[0]) ||
        ""
      );
    });

    setSnpKegiatan(tmpSnpKegiatan[0]?.kegiatan || []);
    setGroupRole(JSON.parse(localStorage.getItem("auth")!).group_role);

    const tmp0 = JSON.parse(localStorage.getItem("auth")!);
    setUserRole(tmp0.kode_role);
    const dataTmp: any = JSON.parse(localStorage.getItem(patenam)!);
    let tmp2: any = [];

    let [before0, after0]: any = pathnenam
      ? pathnenam.toString().split(".")
      : "";
    let tmpIdx: any = pathnenam ? pathnenam.length : 0;
    if (tmpIdx <= 6) {
      tmp2 = dataTmp.filter((obj: any) => {
        return obj.kode_snp === before0 && obj.kode_kegiatan === after0;
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

    let [before0, after0]: any = pathnenam
      ? pathnenam.toString().split(".")
      : "";
    let tmpIdx: any = pathnenam ? pathnenam.length : 0;
    if (tmpIdx <= 6) {
      tmp2 = dataTmp.filter((obj: any) => {
        return obj.kode_snp === before0 && obj.kode_kegiatan === after0;
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
      return "Active";
    } else if (sts === 0) {
      return "Inactive";
    }
  };

  const color = (sts: number) => {
    if (sts === 1) {
      return "success";
    } else if (sts === 0) {
      return "warning";
    }
  };

  return (
    <>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title="Sub Kegiatan" />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-between my-3">
          <div className="text-md font-semibold text-gray-500">
            {snp?.kode !== undefined
              ? "SNP : " + snp?.kode + " - " + snp.nama
              : ""}
            <br />
            {snpKegiatan?.kode !== undefined
              ? "Kegiatan : " + snpKegiatan?.kode + " - " + snpKegiatan.nama
              : ""}
          </div>
          <div className="text-xl font-semibold text-gray-500"></div>
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
        <div>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader className="bg-blue-600">
                <tr className="text-white">
                  <TableCell width={10}>Tahun</TableCell>
                  <TableCell width={10}>Kode</TableCell>
                  <TableCell>Nama Sub Kegiatan</TableCell>
                  {groupRole === "pusat" ? (
                    <TableCell width={5}>Aksi</TableCell>
                  ) : (
                    ""
                  )}
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell align="center">{user.tahun}</TableCell>
                    <TableCell align="center">{user.kode}</TableCell>
                    <TableCell>{user.nama}</TableCell>
                    <TableCell align="center">
                      <div className="flex items-center text-white">
                        {groupRole === "pusat" && (
                          <>
                            <div
                              // layout="link"
                              className="bg-yellow-300 hover:bg-yellow-400 mx-0 px-2 py-1  cursor-pointer"
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

export default SubKegiatan;
