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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

function RekeningMadrasah() {
  const item = ["Home", "Referensi", "Rekening Madrasah"];
  const [dataTable, setDataTable]: any = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState<boolean>(false);
  const [DataDetails, setDataDetails]: any = React.useState([]);
  const [modalData, setModalData] = React.useState<any>("");
  const [groupRole, setGroupRole] = React.useState<any>("");
  const [kodeRole, setKodeRole] = React.useState<any>("");

  const [totalResults, setTotalResults] = React.useState<number>(1);

  // setup data for every table
  const [resultsPerPage, setResultsPerPage] = React.useState<number>(5);
  const [pageTable, setPageTable] = React.useState<number>(2);
  const pathName = useLocation().pathname;
  let patenam: any = pathName.split("/").pop();

  React.useEffect(() => {
    // if (localStorage.getItem(patenam)) {
    setTotalResults(JSON.parse(localStorage.getItem(patenam)!).length || 1);
    setDataTable(
      JSON.parse(localStorage.getItem(patenam)!).slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
    // }
  }, [pageTable, localStorage.getItem(patenam)!]);

  React.useEffect(() => {
    setGroupRole(JSON.parse(localStorage.getItem("auth")!).group_role);
    setKodeRole(JSON.parse(localStorage.getItem("auth")!).kode_role);
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

  function UpdateData(data: any) {
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

  function seeDetails(params: any) {
    setIsDetailsOpen(true);
    setDataDetails(params);
  }

  const status = (sts: Number) => {
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

  return (
    <>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title="Rekening Madrasah" />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-end my-3">
          {kodeRole === "bendahara_madrasah" ||
          kodeRole === "kepala_madrasah" ? (
            <div
              className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
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
                  <TableCell>Tahun</TableCell>
                  <TableCell>Nama Madrasah</TableCell>
                  {/* <TableCell>Kode Bank</TableCell> */}
                  <TableCell>Nama Bank </TableCell>
                  <TableCell>Cabang</TableCell>
                  <TableCell>Nama No Rekening</TableCell>
                  <TableCell>No Rekening </TableCell>
                  {/* <TableCell>Kode Tipe Rekening</TableCell> */}
                  {/* <TableCell>Keterangan</TableCell> */}
                  <TableCell align="right">Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{user.tahun}</TableCell>
                    {/* <TableCell>{user.kode_bank}</TableCell> */}
                    <TableCell>{user.nama_madrasah}</TableCell>
                    {/* <TableCell>{user.kode_bank}</TableCell> */}
                    <TableCell>{user.nama_bank}</TableCell>
                    <TableCell>{user.cabang_bank}</TableCell>
                    <TableCell>{user.no_rekening_nama}</TableCell>
                    <TableCell>{user.no_rekening}</TableCell>
                    {/* <TableCell>{user.kode_tipe_rekening}</TableCell> */}
                    {/* <TableCell>{user.keterangan}</TableCell> */}
                    <TableCell>
                      <div className="flex items-center justify-end text-white">
                        {(groupRole === "madrasah" && (
                          <>
                            <a href="#details">
                              <div
                                // layout="link"
                                className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1 rounded-md cursor-pointer"
                                aria-label="details"
                                title="Lihat Detail"
                                onClick={() => {
                                  seeDetails(user);
                                }}
                              >
                                <FontAwesomeIcon icon={faEye} size="sm" />
                              </div>
                            </a>
                            <div
                              // layout="link"
                              className="bg-yellow-300 hover:bg-yellow-400 mx-0 px-2 py-1 cursor-pointer"
                              aria-label="Edit"
                              title="Edit"
                              onClick={() => {
                                UpdateData(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faPencilAlt} size="sm" />
                            </div>
                            <div
                              // layout="link"
                              className="bg-red-500 hover:bg-red-600 mx-0 px-2 py-1 rounded-r-md cursor-pointer"
                              aria-label="details"
                              title="hapus"
                              onClick={() => {
                                deleteData(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                            </div>
                          </>
                        )) || (
                          <a href="#details">
                            <div
                              // layout="link"
                              className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1 rounded-md cursor-pointer"
                              aria-label="details"
                              title="Lihat Detail"
                              onClick={() => {
                                seeDetails(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faEye} size="sm" />
                            </div>
                          </a>
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
      <DetailsCard data={DataDetails} active={isDetailsOpen} />
    </>
  );
}

const DetailsCard = ({ data, active }: any) => {
  // const [isActive, setisActive] = React.useState<boolean>(active);
  if (active) {
    return (
      <div id="details" className="m-5 p-5 bg-white shadow-md rounded">
        <b className="text-xl">
          Detail Rekening Madrasah {data.nama_madrasah}
        </b>
        <div className="flex flex-col mt-4">
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">Cabang Bank</div>
            <div className="flex-1">: {data.cabang_bank}</div>
          </div>
          {/* <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">copas</div>
            <div className="flex-1">: {data.created_by}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">copas</div>
            <div className="flex-1">: {data.id}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">copas</div>
            <div className="flex-1">: {data.kantor_kabkota_id}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">copas</div>
            <div className="flex-1">: {data.kantor_provinsi_id}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">copas</div>
            <div className="flex-1">: {data.kantor_pusat_id}</div>
          </div> */}
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">Kode Bank</div>
            <div className="flex-1">: {data.kode_bank}</div>
          </div>
          {/* <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold"></div>
            <div className="flex-1">: {data.kode_kabkota}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">copas</div>
            <div className="flex-1">: {data.kode_provinsi}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">copas</div>
            <div className="flex-1">: {data.kode_tipe_rekening}</div>
          </div> */}
          {/* <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">copas</div>
            <div className="flex-1">: {data.madrasah_id}</div>
          </div> */}
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">Nama Bank</div>
            <div className="flex-1">: {data.nama_bank}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">Nama Madrasah</div>
            <div className="flex-1">: {data.nama_madrasah}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">No Rekeninf</div>
            <div className="flex-1">: {data.no_rekening}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">No Rekening Nama</div>
            <div className="flex-1">: {data.no_rekening_nama}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">Tahun</div>
            <div className="flex-1">: {data.tahun}</div>
          </div>
          <div className="flex flex-row mt-3">
            <div className="w-56 font-semibold">Keterangan</div>
            <div className="flex-1">: {data.keterangan}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default RekeningMadrasah;
