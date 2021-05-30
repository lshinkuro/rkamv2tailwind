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
  faFileExport,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ExportToExcel } from "../../../components/Export/ExportToExcel";

function Snp() {
  const item = ["Home", "Referensi", "Sumber Dana Madrasah"];
  const [dataTable, setDataTable]: any = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");

  // setup data for every table
  const [resultsPerPage, setResultsPerPage] = React.useState<number>(5);
  const [totalResults, setTotalResults] = React.useState<number>(1);
  const [pageTable, setPageTable] = React.useState<number>(2);
  const [userRole, setUserRole] = React.useState<any>(null);

  const patenam = "referensi-sumberdana";

  React.useEffect(() => {
    const tmp0 = JSON.parse(localStorage.getItem("auth")!);
    setUserRole(tmp0.kode_role);

    // if (localStorage.getItem(patenam)) {
    setTotalResults(JSON.parse(localStorage.getItem(patenam)!).length || 1);
    setDataTable(
      JSON.parse(localStorage.getItem(patenam)!).slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    );
    // }
  }, [pageTable]);

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
    setModalData(data);
    setIsModalOpen(true);
  }
  function showDetail() {
    setIsModalOpen(true);
  }

  function hideDetails() {
    setModalData({});
    setIsModalOpen(false);
  }

  const statusJenjang = (sts: string) => {
    if (sts === "1") {
      return "Ya";
    } else if (sts === "0") {
      return "Tidak";
    }
  };
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
  const exportToXlsx = (apiData: any, fileName: any) => {
    let tmp0: any = [];
    apiData.forEach((el0: any) => {
      tmp0.push({
        kode: el0.kode,
        tahun: el0.tahun,
        nama: el0.nama,
        ra: el0.ra,
        madrasah_n: el0.madrasah_n,
        madrasah_s: el0.madrasah_s,
      });
    });

    ExportToExcel(tmp0, fileName);
  };

  return (
    <>
      <InputModal onClose={hideDetails} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title="Sumber Dana Madrasah" />
      {/* <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-col  md:flex-row gap-2 ">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Provinsi*</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Provinsi"
              >
                <option>Aceh</option>
                <option>Sumatra Selatan</option>
              </Select>
            </Label>
          </div>
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Kab/Kota*</span>
              <Select
                className="mt-1 text-gray-500"
                placeholder="semua Kab/Kota"
              >
                <option>Aceh Selatan</option>
                <option>Aceh Utara</option>
              </Select>
            </Label>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row gap-2 ">
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Kategori Komponen Biaya*</span>
              <Select className="mt-1 text-gray-500">
                <option>Standar 1</option>
                <option>Standar 2</option>
              </Select>
            </Label>
          </div>
          <div className="flex-1">
            <Label>
              <span className="text-gray-400">Jenis Belanja*</span>
              <Select className="mt-1 text-gray-500">
                <option>Standar 1</option>
                <option>Standar 2</option>
              </Select>
            </Label>
          </div>
        </div>
      </div> */}
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex flex-row justify-between my-3 space-x-2">
          <div
            onClick={() => {
              exportToXlsx(dataTable, "sumber-dana-madrasah");
            }}
            className="bg-blue-500 p-3  text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faFileExport} />
          </div>
          <div
            onClick={showDetail}
            className="flex text-white justify-center items-center bg-blue-500 hover:bg-blue-700 cursor-pointer p-3 "
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader className="bg-blue-600">
                <tr className="text-white">
                  <TableCell>Kode</TableCell>
                  <TableCell width={5}>Tahun</TableCell>
                  <TableCell>Sumber Dana</TableCell>
                  <TableCell width={5}>Madrasah Negeri</TableCell>
                  <TableCell width={5}>Madrasah Swasta</TableCell>
                  <TableCell width={5}>RA</TableCell>
                  <TableCell width={5}>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{user.kode}</TableCell>
                    <TableCell align="center">{user.tahun}</TableCell>
                    <TableCell>{user.nama}</TableCell>
                    <TableCell align="center">
                      {statusJenjang(user.madrasah_n)}
                    </TableCell>
                    <TableCell align="center">
                      {statusJenjang(user.madrasah_s)}
                    </TableCell>
                    <TableCell align="center">
                      {statusJenjang(user.ra)}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center text-white">
                        {/* <div
                          // layout="link"
                          className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1 rounded-l-md cursor-pointer"
                          aria-label="details"
                          title="Lihat Detail"
                          onClick={() => {
                            console.log(user)
                            // goToKegiatan(user.kode);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} size="sm" />
                        </div> */}
                        <div
                          // layout="link"
                          className="bg-yellow-300 hover:bg-yellow-400 mx-0 px-2 py-1  cursor-pointer"
                          aria-label="Edit"
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

export default Snp;
