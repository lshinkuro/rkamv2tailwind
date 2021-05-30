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
} from "@windmill/react-ui";
import {
  delKatJenisBelanja,
  postKatJenisBelanja,
} from "../../../services/v2/referenceservice/jenisbelanja";
import { getRef } from "../../../services/reference";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const InputModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [kode, setKode] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [Message, setMessage] = useState<string>("");

  const postData = async () => {
    let payload = {
      kode,
      nama,
    };
    // console.log(payload)
    try {
      await postKatJenisBelanja(payload);
      await getRef("kategori-belanja", 2021, "kategori-belanja");
      localStorage.getItem("kategori-belanja");
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
    };
    // console.log(payload)
    try {
      await postKatJenisBelanja(payload);
      await getRef("kategori-belanja", 2021, "kategori-belanja");
      localStorage.getItem("kategori-belanja");
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
      await delKatJenisBelanja(data.id);
      await getRef("kategori-belanja", 2021, "kategori-belanja");
      localStorage.getItem("kategori-belanja");
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
  if (data) {
    console.log(data);
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Edit Kategori Jenis Belanja</ModalHeader>
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
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block ">
            <Button layout="outline" onClick={onClose}>
              Batal
            </Button>
            <Button onClick={() => putData(data.id)}>Simpan</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={onClose}>
              Batal
            </Button>
            <Button block size="large" onClick={() => putData(data.id)}>
              Simpan
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Tambah Kategori Janis Belanja</ModalHeader>
      <ModalBody>
        <div className="flex flex-col p-2 ">
          {Message ? (
            <Alert type="danger">{Message}</Alert>
          ) : (
            <div className="h-12"></div>
          )}
          <div className="w-auto">
            <Label>
              <span className="text-gray-400">Kode *</span>
              <Input
                className="mt-1"
                placeholder=""
                onChange={(e: any) => setKode(e.target.value)}
              />
            </Label>
            <Label>
              <span className="text-gray-400 ">Nama Kategori *</span>
              <Input
                className="mt-1"
                placeholder=""
                onChange={(e: any) => setNama(e.target.value)}
              />
            </Label>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block ">
          <Button layout="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={postData}>Simpan</Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={onClose}>
            Batal
          </Button>
          <Button block size="large" onClick={postData}>
            Simpan
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
