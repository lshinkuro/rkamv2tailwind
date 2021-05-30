import React, { useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  Select,
  Textarea,
} from "@windmill/react-ui";
import PDFviewer from "../../../../components/PDFviewer";
import DataTable from "react-data-table-component";
import * as cPaguService from "../../../../services/v2/pencairan/pencairanPagu";
type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const ModalUpload: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [PDFelemet, setPDFelemet] = React.useState<any>([]);
  const [isUpload, setisUpload] = React.useState<boolean>(false);
  const [isView, setisView] = React.useState<boolean>(false);
  const [canUpload, setCanUpload] = React.useState<boolean>(false);
  const [SumberDana, setSumberDana] = React.useState([{}]);
  const [dataTable, setdataTable] = React.useState([{}]);
  const [NamaFile, setNamaFile] = React.useState<string>("");
  const [Keterangan, setKeterangan] = React.useState<string>("");
  const [Url, setUrl] = React.useState<string>("");
  const kodeRole = JSON.parse(localStorage.getItem("auth")!).kode_role || "";
  const grubRole = JSON.parse(localStorage.getItem("auth")!).group_role || "";
  const uploader = JSON.parse(localStorage.getItem("auth")!).user_id || "";
  const LvPPK: string =
    JSON.parse(localStorage.getItem("profile-madrasah")!)[0].kode_level_ppk ||
    "";
  const pdfHandler = (e: any) => {
    setPDFelemet(e.target.files);
    let files: any = e.target.files;
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };

  useEffect(() => {
    if (data.dokumen_pencairan_pagu_definitif) {
      setdataTable([{ no: 1, keterangan: "Bendahara Mengupload data" }]);
    } else {
      setdataTable(data.dokumen_pencairan_pagu_definitif);
    }
    cPaguService
      .getSumberDana()
      .then((res) => {
        setSumberDana(res);
      })
      .catch((err) => console.log(err));
  }, [data]);

  const postUpload = () => {
    const payload = {
      no: 1,
      nama_file: NamaFile,
      tgl: Date(),
      keterangan: Keterangan,
      upload_by: uploader,
      status: 1,
      path: Url,
    };
    console.log(payload);
    let tm0: Array<object> = data.dokumen_pencairan_pagu_definitif;
    tm0.push(payload);
    setdataTable(tm0);
    alert("berhasil upload" + NamaFile);
    onClose();
  };

  const columns = [
    {
      name: "No",
      selector: "no",
      sortable: true,
      width: "70px",
    },
    {
      name: "Nama File",
      selector: "nama_file",
      width: "200px",
      sortable: true,
    },
    {
      name: "TGL",
      selector: "tgl",
      sortable: true,
      width: "200px",
    },
    {
      name: "Upload By",
      selector: "upload_by",
      sortable: true,
      width: "150px",
    },
    {
      name: "Keterangan",
      selector: "keterangan",
      sortable: true,
      width: "220px",
    },
    {
      name: "Aksi",
      width: "120px",
      selector: "action",
      cell: (row) => {
        if (row.status === 0 || !row.status) {
          if (
            grubRole === LvPPK &&
            dataTable.length === 1 &&
            kodeRole === "bendahara_madrasah"
          ) {
            setCanUpload(true);
            return (
              <Button onClick={() => setisUpload(!isUpload)}> Upload </Button>
            );
          } else if (
            grubRole === LvPPK &&
            dataTable.length > 1 &&
            kodeRole !== "bendahara_madrasah"
          ) {
            setCanUpload(true);
            return (
              <Button onClick={() => setisUpload(!isUpload)}> Upload </Button>
            );
          } else {
            return "menunggu";
          }
        } else if (row.status === 1) {
          return <Button onClick={() => setisView(!isView)}> Lihat </Button>;
        }
      },
    },
  ];

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      className="w-full px-6 py-4 mx-2  bg-white  dark:bg-gray-800 sm:m-4 xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md"
    >
      <ModalHeader>Pencairan Dana Pagu</ModalHeader>
      <ModalBody>
        <div className="max-h-xl overflow-y-scroll">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                <span className="text-gray-400">
                  {" "}
                  <span className="text-red-500">*</span> Sumber Dana
                </span>
                {!data.pagu_definitif_id ? (
                  <Select>
                    {SumberDana.map((got: any) => {
                      return <option value={got.kode}>{got.nama}</option>;
                    })}
                  </Select>
                ) : (
                  <Select defaultValue={data.sumber_dana} disabled>
                    {SumberDana.map((got: any) => {
                      return <option value={got.kode}>{got.nama}</option>;
                    })}
                  </Select>
                )}
              </Label>
              <Label>
                <span className="text-gray-400">
                  {" "}
                  <span className="text-red-500">*</span> Nilai
                </span>
                <Input defaultValue={data.nilai_pencairan_pagu} disabled />
              </Label>
              <Label>
                <span className="text-gray-400">
                  {" "}
                  <span className="text-red-500">*</span> Termin
                </span>
                <Input defaultValue={data.tahap} disabled />
              </Label>
            </div>
            {kodeRole === "bendahara_madrasah" ? (
              <div>
                {data.pagu_definitif_id ? (
                  <Label>
                    <span className="text-gray-400">
                      {" "}
                      <span className="text-red-500">*</span> Tipe Pencairan
                    </span>
                    <Select defaultValue="rekening" disabled>
                      <option selected hidden>
                        Pilih Tipe Pencairan
                      </option>
                      <option value="rekening">Rekening</option>
                      <option value="">dummy</option>
                    </Select>
                  </Label>
                ) : (
                  <Label>
                    <span className="text-gray-400">
                      {" "}
                      <span className="text-red-500">*</span> Tipe Pencairan
                    </span>
                    <Select>
                      <option selected hidden>
                        Pilih Tipe Pencairan
                      </option>
                      <option value="">dummy</option>
                      <option value="">dummy</option>
                    </Select>
                  </Label>
                )}

                <Label>
                  <span className="text-gray-400">
                    {" "}
                    <span className="text-red-500">*</span> Rekening
                  </span>
                  <Select disabled>
                    <option selected>Rekening Default</option>
                    <option value="1">dummy</option>
                    <option value="23">dummy</option>
                    <option value="3">dummy</option>
                  </Select>
                </Label>
              </div>
            ) : (
              <div>
                <Label>
                  <span className="text-gray-400">
                    {" "}
                    <span className="text-red-500">*</span> Tipe Pencairan
                  </span>
                  <Select disabled>
                    <option selected hidden>
                      Pilih Tipe Pencairan
                    </option>
                    <option value="">dummy</option>
                    <option value="">dummy</option>
                    <option value="">dummy</option>
                  </Select>
                </Label>
                <Label>
                  <span className="text-gray-400">
                    {" "}
                    <span className="text-red-500">*</span> Rekening
                  </span>
                  <Select disabled>
                    <option selected hidden>
                      Rekening Default
                    </option>
                    <option value="">dummy</option>
                    <option value="">dummy</option>
                    <option value="">dummy</option>
                  </Select>
                </Label>
              </div>
            )}
          </div>
          <div>
            <DataTable
              className="z-0"
              columns={columns}
              data={dataTable}
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              //   pagination
              highlightOnHover
              //   customStyles={customStyles}
            />
          </div>
          {isUpload ? (
            <div>
              <input type="file" accept=".pdf" onChange={pdfHandler} />
              <PDFviewer element={PDFelemet} />
              <Label>
                <span>Nama File</span>
                <Input onChange={(e: any) => setNamaFile(e.target.value)} />
              </Label>
              <Label>
                <span>Keterangan</span>
                <Textarea
                  onChange={(e: any) => setKeterangan(e.target.value)}
                />
              </Label>
            </div>
          ) : null}
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block ">
          <Button layout="outline" onClick={onClose}>
            Cancel
          </Button>
          &nbsp;
          {canUpload ? <Button onClick={postUpload}>Upload</Button> : null}
        </div>
      </ModalFooter>
    </Modal>
  );
};

// const dataTable = [
//   {
//     no: 1,
//     nama_file: "File dr bendahara",
//     tgl: Date(),
//     keterangan: "bla bla bla",
//     upload_by: "Bendahara 1",
//     status: 1,
//   },
//   {
//     no: 2,
//     nama_file: "File dr PPK",
//     tgl: Date(),
//     keterangan: "bla bla bla",
//     upload_by: "PPK 1",
//     status: 1,
//   },
//   {
//     no: 3,
//     nama_file: "File dr PPSM",
//     tgl: Date(),
//     keterangan: "bla bla bla",
//     upload_by: "PPSM 1",
//     status: 1,
//   },
//   {
//     no: 4,
//     nama_file: "File dr huhu",
//     tgl: Date(),
//     keterangan: "bla bla bla",
//     upload_by: "PPK 1",
//     status: 0,
//   },
// ];

export default ModalUpload;
