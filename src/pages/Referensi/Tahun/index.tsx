import React from "react";
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
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faPlus,
  faPowerOff,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function Tahun() {
  const item = ["Home", "Referensi", "Tahun"];
  const [dataTable, setDataTable]: any = React.useState<any>([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");
  const [totalResults, setTotalResults] = React.useState<number>(1);

  // setup data for every table
  const [resultsPerPage, setResultsPerPage] = React.useState<number>(5);
  const [pageTable, setPageTable] = React.useState<number>(2);
  const pathName = useLocation().pathname;
  let patenam: any = pathName.split("/").pop();

  const [userRole, setUserRole] = React.useState<any>(null);

  React.useEffect(() => {
    const tmp0 = JSON.parse(localStorage.getItem("auth")!) || "";
    setUserRole(tmp0.kode_role || "");
    if (localStorage.getItem(patenam)) {
      let tmpData = JSON.parse(localStorage.getItem(patenam)!) || 1;
      setTotalResults(tmpData.length || 1);
      setDataTable(
        tmpData.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
      );
    }
  }, [pageTable]);

  React.useEffect(() => {
    if (localStorage.getItem(patenam)) {
      let tmpData = JSON.parse(localStorage.getItem(patenam)!) || 1;
      setTotalResults(tmpData.length || 1);
      setDataTable(
        tmpData.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
      );
    }
  }, [localStorage.getItem(patenam)!]);

  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  function deleteData(data: any) {
    // let tmp0: any = [];
    // tmp0.push({
    //   id: data.id,
    //   nama: data.nama,
    //   tahun: data.tahun,
    //   isDeleted: "deleted",
    // });
    data["isDeleted"] = "deleted";
    console.log(data);
    setIsModalOpen(true);
    setModalData(data);
  }

  function showDetails(data: any) {
    data["isDeleted"] = "";
    console.log(data);
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

  const status = (sts: Number) => {
    if (sts === 1) {
      return "Aktif";
    } else if (sts === 0) {
      return "Tidak Aktif";
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
      <BreadCrumb data={item} title="Tahun" />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-end my-3">
          {userRole === "super_admin_pusat" || userRole === "admin_pusat" ? (
            <div
              className="bg-blue-500 p-3  text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={showDetail}
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
                  <TableCell>Nama </TableCell>
                  <TableCell>Tahun</TableCell>
                  <TableCell width={5}>Status</TableCell>

                  {userRole === "super_admin_pusat" ||
                  userRole === "admin_pusat" ? (
                    <TableCell width={5}>Aksi</TableCell>
                  ) : (
                    ""
                  )}
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell width={10}>{user.nama}</TableCell>
                    <TableCell>{user.tahun}</TableCell>
                    <TableCell>
                      <Badge type={color(Number(user.activated))}>
                        {status(Number(user.activated))}
                      </Badge>{" "}
                    </TableCell>
                    {userRole === "super_admin_pusat" ||
                    userRole === "admin_pusat" ? (
                      <TableCell>
                        <div className="flex items-center text-white">
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
                          {user.activated === "1" ? (
                            <div
                              // layout="link"
                              className="bg-red-600 hover:bg-red-700 mx-0 px-2 py-1  cursor-pointer"
                              aria-label="details"
                              title="non-aktifkan"
                              onClick={() => {
                                deleteData(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faPowerOff} size="sm" />
                            </div>
                          ) : (
                            <div
                              // layout="link"
                              className="bg-green-500 hover:bg-green-600 mx-0 px-2 py-1 cursor-pointer"
                              aria-label="details"
                              title="aktifkan"
                              onClick={() => {
                                deleteData(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faPowerOff} size="sm" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                    ) : (
                      ""
                    )}
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

export default Tahun;
