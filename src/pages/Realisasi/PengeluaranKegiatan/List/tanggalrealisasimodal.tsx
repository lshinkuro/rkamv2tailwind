import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Select,
  Textarea
} from "@windmill/react-ui";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const TanggalModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [tanggalRealisasi, setTanggalRealisasi] = useState<any>("");
  const [noReferensi, setNoReferensi] = useState<any>("1231");
  const [logErr, setLogErr] = useState<any>("");

  let submitData = async () => {
      console.log(noReferensi)
  };

  let hapusData = async () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full px-6 py-4 mx-2  bg-white  dark:bg-gray-800  sm:m-4 xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md" >
      <ModalHeader>set Tanggal Realisasi Nota Pendapatan </ModalHeader>
      <ModalBody>
        <div >
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
                <InputWithSelectLabel 
                    label="Tanggal Realisasi" 
                    inputOnChange={(e)=>{}}
                    inputPlaceholder="halooooo"
                    datamap={["m","n","o"]}
                />
            </div>
            <div className="flex-1">
                <InputWithLabel           
                    label="No Referensi" 
                    inputOnChange={(e)=>{setNoReferensi(e.currentTarget.value)}}
                    inputValue={noReferensi}
                    inputPlaceholder=""
                />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1 text-gray-400">No Nota :</div>
              <div className="flex-1 mt-1 text-gray-400">INV/PENDAPATAN/APBN_BOS/TUNAI/2021/1</div>              
            </div>
            <div className="flex-1">
              <div className="flex-1 text-gray-400">Tanggal Nota :</div>
              <div className="flex-1 mt-1 text-gray-400">Sabtu, 9 Januari 2021 00.05.05</div>       
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1  text-gray-400">No Referensi :</div>
              <div className="flex-1 mt-1 text-gray-400">INV/PENDAPATAN/APBN_BOS/TUNAI/2021/1</div>              
            </div>
            <div className="flex-1">
              <div className="flex-1 text-gray-400">Tanggal Realisasi :</div>
              <div className="flex-1 mt-1 text-gray-400">Sabtu, 9 Januari 2021 00.05.05</div>       
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1 text-gray-400">Sumber Dana :</div>
              <div className="flex-1 mt-1 text-gray-400">APBN BOS</div>              
            </div>
            <div className="flex-1">
              <div className="flex-1 text-gray-400">Tipe Kas :</div>
              <div className="flex-1 mt-1 text-gray-400">Tunai</div>       
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1 text-gray-400">No Rekening :</div>
              <div className="flex-1 mt-1 text-gray-400">492317104734</div>              
            </div>
            <div className="flex-1">
              <div className="flex-1 text-gray-400">Rekening Atas Nama:</div>
              <div className="flex-1 mt-1 text-gray-400">Pegi</div>       
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1 text-gray-400">Nama Bank :</div>
              <div className="flex-1 mt-1 text-gray-400">-</div>              
            </div>
            <div className="flex-1">
              <div className="flex-1 text-gray-400">Tipe Pendapatan :</div>
              <div className="flex-1 mt-1 text-gray-400">-</div>       
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4 ">
            <div className="flex-1 ">
              <div className="flex-1 text-gray-400">Keterangan :</div>
              <div className="flex-1 mt-1 text-gray-400">-</div>              
            </div>
            <div className="flex-1">
              
            </div>
          </div>

        </div>
      </ModalBody>
      <ModalFooter>
        <div className="">
          <Button layout="outline" onClick={onClose}>
            Tutup
          </Button>
          &nbsp;
          <Button onClick={submitData}>
            Simpan
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default TanggalModal;



const WithLabel = Component => {
  return props => (
    <Label>
      <span className="text-gray-400">
        {" "}
        <span className="text-red-500">*</span>{props.label}
      </span>
      <Component {...props} />
    </Label>
  );
};

const MyInput = props => (
  <Input
    className="mt-1"
    placeholder={props.inputPlaceholder}
    defaultValue={props.inputValue}
    onChange={props.inputOnChange}
  />
);

const MySelectLabel =props => (
    <Select
      className="mt-1"
      onChange={props.inputOnChange} {...props}>
      {
        props.datamap.map((item,index)=>{
          return(<option key={index}>{item}</option>)
        })
      }
    </Select>
)

const InputWithLabel = WithLabel(MyInput);
const InputWithSelectLabel = WithLabel(MySelectLabel);


