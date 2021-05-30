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
} from "@windmill/react-ui";
import InputModal from "./inputmodal";
import response from "./response";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function AlokasiBop() {
  const item = ["Home", "Referensi", "Alokasi BOP"];
  const [dataTable, setDataTable]: any = React.useState(response);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>("");

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
      <BreadCrumb data={item} title="Alokasi BOP" />
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
                  <TableCell>Jenjang</TableCell>
                  <TableCell>Status Sekolah</TableCell>
                  <TableCell width={10}>Satuan Kerja Madrasah</TableCell>
                  <TableCell width={5}>Kab Kota</TableCell>
                  <TableCell width={5}>Provinsi</TableCell>
                  <TableCell width={5}>Pusat</TableCell>
                  <TableCell width={5}>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody className="text-sm">
                {dataTable.map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{user.jenjang}</TableCell>
                    <TableCell>{user.statusSekolah}</TableCell>
                    <TableCell align="center">{user.satkerMadrasah}</TableCell>
                    <TableCell align="center">{user.kabkota}</TableCell>
                    <TableCell align="center">{user.provinsi}</TableCell>
                    <TableCell align="center">{user.pusat}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-white">
                        <div
                          // layout="link"
                          className="bg-blue-500 hover:bg-blue-700 mx-0 px-2 py-1 rounded-l-md cursor-pointer"
                          aria-label="details"
                          title="Lihat Detail"
                          onClick={() => {
                            // goToKegiatan(user.kode);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} size="sm" />
                        </div>
                        <div
                          // layout="link"
                          className="bg-yellow-300 hover:bg-yellow-400 mx-0 px-2 py-1 cursor-pointer"
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
                          className="bg-red-500 hover:bg-red-600 mx-0 px-2 py-1 rounded-r-md cursor-pointer"
                          aria-label="details"
                          title="hapus"
                          onClick={() => {
                            // deleteData(user);
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
            <TableFooter></TableFooter>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default AlokasiBop;
