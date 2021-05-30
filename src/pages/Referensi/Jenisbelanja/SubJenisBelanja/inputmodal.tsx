import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Select,
  Input,
  Alert,
  Textarea,
} from "@windmill/react-ui";
import {
  delJenisBelanja,
  postJenisBelanja,
} from "../../../../services/v2/referenceservice/jenisbelanja";
import { getRef } from "../../../../services/reference";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [kode, setKode] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [Message, setMessage] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");

  const postData = async () => {
    let payload = {
      kode,
      nama,
      deskripsi,
      kode_kategori: data.kode_kategori,
    };
    // console.log(payload);
    try {
      await postJenisBelanja(payload);
      await getRef("jenis-belanja", 2021, "jenis-belanja");
      localStorage.getItem("jenis-belanja");
      setKode("");
      setNama("");
      onClose();
    } catch (err) {
      setMessage(`${err.response.data.return}`);
      //   console.log(err);
    }
  };

  const putData = async (id: any) => {
    let payload = {
      id,
      kode,
      nama,
      deskripsi,
      kode_kategori: data.kode_kategori,
    };
    // console.log(payload)
    try {
      await postJenisBelanja(payload);
      await getRef("jenis-belanja", 2021, "jenis-belanja");
      localStorage.getItem("jenis-belanja");
      setKode("");
      setNama("");
      onClose();
    } catch (err) {
      //   console.log(err.response.data.return);
      setMessage(`${err.response.data.return}`);
    }
  };

  const hapusData = async () => {
    try {
      await delJenisBelanja(data.id);
      await getRef("jenis-belanja", 2021, "jenis-belanja");
      localStorage.getItem("jenis-belanja");
      onClose();
    } catch (err) {
      setMessage(`${err.response.data.return}`);
    }
  };

  if (data.isDeleted === "deleted") {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Hapus Data</ModalHeader>
        <ModalBody>
          <div>Yakin Hapus Data?</div>
          {Message ? (
            <Alert type="danger">{Message}</Alert>
          ) : (
            <div className="h-12"></div>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block ">
            <Button layout="outline" onClick={onClose}>
              Cancel
            </Button>
            &nbsp;
            <Button onClick={hapusData}>Hapus Data</Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }

  // console.log(data)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{data.id ? "Edit" : "Tambah"} Sub Jenis Belanja</ModalHeader>
      <ModalBody>
        <div className="flex flex-col p-2 ">
          {Message ? (
            <Alert type="danger">{Message}</Alert>
          ) : (
            <div className="h-12"></div>
          )}
          <div className="w-auto">
            <Label>
              <span className="text-gray-400">kode *</span>
              <Input
                className="mt-1"
                placeholder=""
                defaultValue={data.kode}
                onChange={(e: any) => setKode(e.target.value)}
              />
            </Label>
            <Label>
              <span className="text-gray-400">Nama *</span>
              <Input
                className="mt-1"
                placeholder=""
                defaultValue={data.nama}
                onChange={(e: any) => setNama(e.target.value)}
              />
            </Label>
            <Label>
              <span className="text-gray-400">Deskripsi *</span>
              <Textarea
                className="mt-1"
                placeholder=""
                defaultValue={data.deskripsi}
                onChange={(e: any) => setDeskripsi(e.target.value)}
              />
            </Label>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block ">
          <Button layout="outline" onClick={onClose}>
            Batal
          </Button>&nbsp;
          {data.id ? (
            <Button onClick={() => putData(data.id)}>
              Simpan
            </Button>
          ) : (
            <Button onClick={postData}>
              Simpan
            </Button>
          )}
        </div>
        <div className="block w-full sm:hidden">
          <Button layout="outline" onClick={onClose}>
            Batal
          </Button>
          &nbsp;
          {data.id ? (
            <Button onClick={() => putData(data.id)}>
              Simpan
            </Button>
          ) : (
            <Button onClick={postData}>
              Simpan
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
