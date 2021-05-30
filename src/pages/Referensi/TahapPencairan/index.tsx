import {
    faEye,
  faPencilAlt,
  faPlus,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import React from "react";
import { BreadCrumb } from "../../../components";
import ModalForm from "./ModalForm";

const TahapPencairan = () => {
  const item = ["Home", "Referensi", "Tahap Pencairan"];
  const [totalResults, setTotalResults] = React.useState<number>(1);  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");
  const [resultsPerPage, setResultsPerPage] = React.useState<number>(5);
  const [pageTable, setPageTable] = React.useState<number>(2);
  const dataTable = [{
    id: "1",
    tahun: "2021",
    tgl_start: "11/10/2021",
    tgl_end: "11/10/2021",
    activated: 0,
  }];

  function onPageChangeTable(p: number) {
    setPageTable(p);
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
  function hideModal() {
    setModalData("");
    setIsModalOpen(false);
  }
  function addData() {
    setIsModalOpen(true);
  }
  function activatedData(data: any) {
    data["action"] = "activated";
    console.log(data);
    setIsModalOpen(true);
    setModalData(data);
  }
  return (
    <>
      <ModalForm onClose={hideModal} isOpen={isModalOpen} data={modalData} />
      <BreadCrumb data={item} title="Tahap Pencairan" />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-end my-3">
          <div
            className="bg-blue-500 p-3  text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
              onClick={addData}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </div>
        </div>
        <div>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader className="bg-blue-600">
                <tr className="text-white">
                  <TableCell>ID </TableCell>
                  <TableCell>Tahun</TableCell>
                  <TableCell>Tgl.Mulai</TableCell>
                  <TableCell>Tgl.Berakhir</TableCell>
                  <TableCell width={5}>Status</TableCell>
                  <TableCell width={5}>Aksi</TableCell>
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.map((data: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell width={10}>{data.id}</TableCell>
                    <TableCell>{data.tahun}</TableCell>
                    <TableCell>{data.tgl_start}</TableCell>
                    <TableCell>{data.tgl_end}</TableCell>
                    <TableCell>
                      <Badge type={color(Number(data.activated))}>
                        {status(Number(data.activated))}
                      </Badge>{" "}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-white">
                      <div
                          // layout="link"
                          className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1  cursor-pointer"
                          aria-label="Details"
                          title="Details"
                          onClick={() => {
                            //   showDetails(data);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} size="sm" />
                        </div>
                        <div
                          // layout="link"
                          className="bg-yellow-300 hover:bg-yellow-400 mx-0 px-2 py-1 cursor-pointer"
                          aria-label="edit"
                          title="Edit"
                          onClick={() => {
                            //   showDetails(data);
                          }}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} size="sm" />
                        </div>
                        {data.activated === "1" ? (
                          <div
                            className="bg-red-600 hover:bg-red-700 mx-0 px-2 py-1  cursor-pointer"
                            aria-label="details"
                            title="non-aktifkan"
                            onClick={() => {
                              activatedData(data);
                            }}
                          >
                            <FontAwesomeIcon icon={faPowerOff} size="sm" />
                          </div>
                        ) : (
                          <div
                            // layout="link"
                            className="bg-green-500 hover:bg-green-600 mx-0 px-2 py-1  cursor-pointer"
                            aria-label="details"
                            title="aktifkan"
                            onClick={() => {
                              activatedData(data);
                            }}
                          >
                            <FontAwesomeIcon icon={faPowerOff} size="sm" />
                          </div>
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
};

export default TahapPencairan;
