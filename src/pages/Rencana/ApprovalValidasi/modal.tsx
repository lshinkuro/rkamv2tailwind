import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Textarea,
} from "@windmill/react-ui";
import "react-datepicker/dist/react-datepicker.css";
import { Button1 } from "../../../components";
import * as usulanService from "../../../services/v2/planningservice/usulanservice";
import { getBulan, usulanKegiatanStatus } from "../../../utils/helper";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

type AddModalProps = {
  isModalOpen: boolean;
  toggleModal: (data?: usulanService.UsulanKegiatanBody) => void;
  modalData: any;
  onApproveOrReject: (isApprove: number, inputKomentar: string) => void;
};

const InputModal: React.FC<AddModalProps> = ({
  isModalOpen,
  toggleModal,
  modalData,
  onApproveOrReject,
}) => {
  const [inputKomentar, setInputKomentar] = useState<any>("");
  const [kodeRole, setKodeRole] = useState<any>("");
  const [groupRole, setGroupRole] = useState<any>("");

  useEffect(() => {
    let tmpAuth: any = JSON.parse(localStorage.getItem("auth")!);
    setKodeRole(tmpAuth.kode_role);
    setGroupRole(tmpAuth.group_role);
  }, []);

  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: "#1b6fbb",
        textTransform: "uppercase",
        color: "white",
      },
    },
  };

  const columns: any = [
    {
      name: "Nama Snp",
      selector: "nama_snp",
      sortable: true,
      subHeader: true,
    },
    {
      name: "Kegiatan",
      selector: "nama_kegiatan",
      sortable: true,
    },
    {
      name: "Sub Kegiatan",
      selector: "nama_sub_kegiatan",
      sortable: true,
    },
    {
      name: "Mulai Pelaksanaan",
      selector: "bulan_pelaksanaan_start",
      sortable: true,
      cell: (row) => getBulan(row.bulan_pelaksanaan_start),
    },
    {
      name: "Akhir Pelaksanaan",
      selector: "bulan_pelaksanaan_end",
      sortable: true,
      cell: (row) => getBulan(row.bulan_pelaksanaan_end),
    },
    {
      name: "Kelompok Sasaran",
      selector: "kelompok_sasaran",
      sortable: true,
      // cell: d => <span>{d.kelompok_sasaran.join(', ') || ""}</span>,
    },
    {
      name: "Indikator Output",
      selector: "indikator_output",
      sortable: true,
    },

    {
      name: "Indikator Output Target",
      selector: "indikator_output_target",
      sortable: true,
    },

    {
      name: "Indikator Output Satuan",
      selector: "indikator_output_satuan",
      sortable: true,
    },

    {
      name: "Indikator Hasil",
      selector: "indikator_hasil",
      sortable: true,
    },

    {
      name: "Indikator Hasil Target",
      selector: "indikator_hasil_target",
      sortable: true,
    },
    {
      name: "Indikator Hasil Satuan",
      selector: "indikator_hasil_satuan",
      sortable: true,
    },
  ];
  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal}>
      <ModalHeader>Approval Kegiatan Madrasah</ModalHeader>
      <ModalBody>
        {kodeRole !== "admin_pusat" &&
        kodeRole !== "admin_kabkota" &&
        kodeRole !== "admin_provinsi" ? (
          <div>
            <div className="flex flex-col p-2 border-t-2">
              <div className="flex flex-row">
                <div className="w-40">Indikator Output</div>
                <div className="flex flex-row">
                  : {modalData?.indikator_output}
                </div>
              </div>
            </div>
            <div className="flex flex-col p-2 border-t-2">
              <div className="flex flex-row">
                <div className="w-40">Indikator Hasil</div>
                <div className="flex flex-row">
                  : {modalData?.indikator_output}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col p-2 border-t-2">
          <div className="flex flex-row">
            <div className="w-40">K.Madrasah</div>
            <div className="flex flex-row">
              :{" "}
              {
                usulanKegiatanStatus(modalData?.kepala_madrasah_approved || 0)
                  .text
              }
              , {modalData?.kepala_madrasah_komentar}
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 border-t-2">
          <div className="flex flex-row">
            <div className="w-40">Kabupaten</div>
            <div className="flex flex-row">
              : {usulanKegiatanStatus(modalData?.kabkota_approved || 0).text},{" "}
              {modalData?.kabkota_komentar}
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 border-t-2">
          <div className="flex flex-row">
            <div className="w-40">Provinsi</div>
            <div className="flex flex-row">
              : {usulanKegiatanStatus(modalData?.provinsi_approved || 0).text},{" "}
              {modalData?.provinsi_komentar}
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 border-t-2 border-b-2">
          <div className="flex flex-row">
            <div className="w-40">Pusat</div>
            <div className="flex flex-row">
              : {usulanKegiatanStatus(modalData?.pusat_approved || 0).text},{" "}
              {modalData?.pusat_komentar}
            </div>
          </div>
        </div>
        {groupRole === "madrasah" ? (
          <div className="main xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-lg w-full">
            <DataTableExtensions
              subHeader={columns}
              columns={columns}
              data={[modalData]}
              export={false}
            >
              <DataTable
                subHeader={false}
                columns={columns}
                data={[modalData]}
                noHeader
                responsive={true}
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
                customStyles={customStyles}
                overflowYOffset="hidden"
              />
            </DataTableExtensions>
          </div>
        ) : (
          ""
        )}

        {kodeRole === "super_admin_pusat" ||
        kodeRole === "admin_pusat" ||
        kodeRole === "admin_provinsi" ||
        kodeRole === "admin_kabkota" ||
        kodeRole === "kepala_madrasah" ? (
          <span>
            &nbsp;
            {(kodeRole === "kepala_madrasah" &&
              modalData?.kepala_madrasah_approved !== 9 &&
              modalData?.kepala_madrasah_approved !== 1) ||
            (kodeRole === "admin_kabkota" &&
              modalData?.kabkota_approved !== 9 &&
              modalData?.kabkota_approved !== 1) 
            ? (
              <Label className="mt-4">
                <span>Komentar</span>
                <Textarea
                  id="inputKomentar"
                  onChange={(e: any) => {
                    setInputKomentar(e.target.value);
                  }}
                  className="mt-1"
                  rows={3}
                  placeholder="Komentar ..."
                />
              </Label>
            ) : (
              ""
            )}
          </span>
        ) : (
          " "
        )}
      </ModalBody>
      <ModalFooter>
        {kodeRole === "super_admin_pusat" ||
        kodeRole === "admin_pusat" ||
        kodeRole === "admin_provinsi" ||
        kodeRole === "admin_kabkota" ||
        kodeRole === "kepala_madrasah" ? (
          <span>
            &nbsp;
            {(kodeRole === "kepala_madrasah" &&
              modalData?.kepala_madrasah_approved !== 9 &&
              modalData?.kepala_madrasah_approved !== 1) ||
            (kodeRole === "admin_kabkota" &&
              modalData?.kabkota_approved !== 9 &&
              modalData?.kabkota_approved !== 1) 
            ? (
              <span>
                <Button1
                  label="Tolak"
                  negative
                  onClick={() => {
                    onApproveOrReject(9, inputKomentar);
                  }}
                />
                &nbsp;
                <Button1
                  label="Setuju"
                  onClick={() => {
                    onApproveOrReject(1, inputKomentar);
                  }}
                />
              </span>
            ) : (
              ""
            )}
          </span>
        ) : (
          " "
        )}
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
