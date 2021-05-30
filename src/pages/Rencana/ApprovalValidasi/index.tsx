import {
  Badge,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BreadCrumb from "../../../components/BreadCrumb";
import { EyeIcon } from "../../../icons";
import * as rencanakegiatan from "../../../services/v2/planningservice/rencanakegiatan";
import { usulanKegiatanStatus } from "../../../utils/helper";
import CustomModal from "./modal";
import { ExportToExcel } from "../../../components/Export/ExportToExcel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  faEye,
  faPencilAlt,
  faFileExport,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function ApprovalValidasi() {
  const item = ["Home", "Approval dan Validasi Kegiatan Madrasah", "List"];
  const localItems = "rencanakegiatan";
  const [pageTable, setPageTable] = useState<number>(1);

  const [totalResults, setTotalResults] = useState<number>(1);
  const [dataTable, setDataTable] = useState<any>([]);
  const [toExport, setToExport] = useState<any>([]);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});
  const [kodeRole, setKodeRole] = useState<any>("");

  const route = useHistory();

  const toggleModal = (data?: any, approve?: any) => {
    if (isModalOpen === false) setModalData(data);
    setIsModalOpen(!isModalOpen);
  };
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }
  const settingNotif: any = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const onApproveOrReject = async (
    isApprove: number,
    inputKomentar: string
  ) => {
    let params: any = modalData || {};
    // params.komentar = inputKomentar;
    // params.is_approve = isApprove;
    //   {
    //     "id": "c3c3bc59-80dc-4ffd-aa6d-79b89a15226e",
    //     "tahun": 2021,
    //     "madrasah_id": "e6a9fa05-bfd8-495b-881a-d4de06268f85",
    //     "komentar": "",
    //     "is_approve": 2
    // }
    let tmp0: any = {
      id: params.id,
      is_approve: isApprove,
      tahun: 2021,
      marasah_id: params.madrasah_id,
      isNew: true,
      komentar: inputKomentar,
    };
    console.log(params.id);
    console.log(params.id);
    try {
      await rencanakegiatan.setApproveOrReject(
        tmp0,
        params.id,
        "/kegiatan/change-status"
      );
      toggleModal();
      toast.success("Approve", settingNotif);
    } catch (error) {
      toast.error(error.response.data.return, settingNotif);
    }
  };

  const generateTableData = () => {
    if (localStorage.getItem(localItems)) {
      setTotalResults(
        JSON.parse(localStorage.getItem(localItems)!)?.length || 1
      );
      setDataTable(
        JSON.parse(localStorage.getItem(localItems)!)?.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
      );

      let toFor: any = JSON.parse(localStorage.getItem(localItems)!)
        ? JSON.parse(localStorage.getItem(localItems)!)
        : [];
      let tmp0: any = [];
      toFor.forEach((el0: any) => {
        tmp0.push({
          kode: el0.no_tiket,
          pengusul: el0.pengusul,
          usulan: el0.nama_kegiatan,
          kamadrasah:
            el0.kepala_madrasah_approved === 0
              ? "Menunggu"
              : el0.kepala_madrasah_approved === 1
              ? "Disetujui"
              : "Ditolak",
          kankemenag:
            el0.kabkota_approved === 0
              ? "Menunggu"
              : el0.kabkota_approved === 1
              ? "Disetujui"
              : "Ditolak",
          kanwil:
            el0.provinsi_approved === 0
              ? "Menunggu"
              : el0.provinsi_approved === 1
              ? "Disetujui"
              : "Ditolak",
          pusat:
            el0.provinsi_approved === 0
              ? "Menunggu"
              : el0.provinsi_approved === 1
              ? "Disetujui"
              : "Ditolak",
        });
      });
      setToExport(tmp0);
    }
  };

  useEffect(() => {
    let tmpAuth: any = JSON.parse(localStorage.getItem("auth")!);
    setKodeRole(tmpAuth.kode_role);

    generateTableData();
  }, [localStorage.getItem(localItems)!]);

  useEffect(() => {
    generateTableData();
  }, [pageTable]);

  const tooltip = (sts: any, tgl: string) => {
    if (sts === 1) {
      return tgl;
    } else if (sts === 0) {
      return tgl;
    } else {
      return "";
    }
  };

  const exportToXlsx = (apiData: any, fileName: any) => {
    ExportToExcel(apiData, fileName);
  };

  return (
    <div>
      <BreadCrumb data={item} title="Approval dan Validasi Kegiatan Madrasah" />
      <div className="m-5 p-5 bg-white shadow-md rounded">
        <div className="flex flex-row justify-end my-3">
          <div
            className="bg-blue-500 p-3 rounded-md text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"
            onClick={() => {
              exportToXlsx(toExport, "data-approval");
            }}
          >
            <FontAwesomeIcon icon={faFileExport} size="sm" />
          </div>
        </div>
        <div >
          <TableContainer className="mb-8 ">
            <Table className="w-full  max-w-full overflow-x-scroll">
              <TableHeader className="bg-blue-500">
                <tr className="text-white">
                  <TableCell>Madrasah</TableCell>
                  {kodeRole === "admin_kabkota" ? (
                    <TableCell>Total Rincian</TableCell>
                  ) : (
                    <TableCell>Nama Kegiatan</TableCell>
                  )}
                  {kodeRole === "admin_kabkota" ? (
                    ""
                  ) : (
                    <TableCell>Nama Sub Kegiatan</TableCell>
                  )}
                  <TableCell>Kamad</TableCell>
                  <TableCell>Kankemenag</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {dataTable
                  ? dataTable.map((data: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell>{data.nama_madrasah}</TableCell>
                        {kodeRole === "admin_kabkota" ? (
                          <TableCell>{data.total_kegiatan}</TableCell>
                        ) : (
                          <TableCell>{data.nama_kegiatan}</TableCell>
                        )}
                        {kodeRole === "admin_kabkota" ? (
                          ""
                        ) : (
                          <TableCell>{data.nama_sub_kegiatan}</TableCell>
                        )}
                        <TableCell>
                          <Badge
                            title={tooltip(
                              data.kepala_madrasah_approved_date,
                              "18-04-2021"
                            )}
                            type={
                              usulanKegiatanStatus(
                                data.kepala_madrasah_approved!
                              ).color
                            }
                          >
                            {
                              usulanKegiatanStatus(
                                data.kepala_madrasah_approved!
                              ).text
                            }
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            title={tooltip(
                              data.kabkota_approved_date,
                              "18-04-2021"
                            )}
                            type={
                              usulanKegiatanStatus(data.kabkota_approved!).color
                            }
                          >
                            {usulanKegiatanStatus(data.kabkota_approved!).text}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-4">
                            {kodeRole !== "bendahara_madrasah" &&
                            kodeRole !== "staf_madrasah" ? (
                              <div
                                onClick={() => toggleModal(data, "approve")}
                                className="flex justify-between text-sm py-2 px-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                              >
                                <span>Approval</span>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : "Silahkan sinkrokan"}
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
      {/* Modals View */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <CustomModal
        isModalOpen={isModalOpen}
        modalData={modalData}
        toggleModal={toggleModal}
        onApproveOrReject={onApproveOrReject}
      ></CustomModal>
    </div>
  );
}

export default ApprovalValidasi;
