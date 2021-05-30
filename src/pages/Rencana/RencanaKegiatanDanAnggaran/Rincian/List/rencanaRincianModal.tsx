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
  Badge,
} from "@windmill/react-ui";
import { Main, LogButton, HeadTable } from "./style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tabnav from "../../../../../components/Tabnav";


type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
};

const TanggalModal: React.FC<PageHeaderProps> = ({ isOpen, onClose, data }) => {
  const [tanggalRealisasi, setTanggalRealisasi] = useState<any>("");
  const tabs = ["Januari-Maret", "April-Juni", "Juli-September", "Oktober-Desember"];
  const [ActiveTab, setActiveTab] = useState("Januari-Maret");


  const handleTabs = (value: any) => {
    setActiveTab(value);
    console.log(value);
  };



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
      <ModalHeader>Lihat Rencana Rincian Kegiatan</ModalHeader>
      <ModalBody>
        <div>
          <p className="text-lg">
            Rincian Kegiatan
          </p>
        </div>
        <div >
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1 text-gray-400">Pendapatan :</div>
              <div className="flex-1 mt-1 text-gray-400">{data?.rencana_pendapatan_nama}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 text-gray-400">Jenis Belanja :</div>
              <div className="flex-1 mt-1 text-gray-400">{data?.jenis_belanja_nama}</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1  text-gray-400">Komponen biaya :</div>
              <div className="flex-1 mt-1 text-gray-400">{data?.komponen_biaya_nama}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 text-gray-400">Kuantitas :</div>
              <div className="flex-1 mt-1 text-gray-400">{data?.total_kuantitas}</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1 text-gray-400">Harga Satuan : {data.harga_satuan}</div>
              <div className="flex-1 mt-1 text-gray-400">{data?.harga_satuan}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 text-gray-400">Pajak : </div>
              <div className="flex-1 mt-1 text-gray-400">{data?.pajak}</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1 text-gray-400">Koefisien Persen Pajak : </div>
              <div className="flex-1 mt-1 text-gray-400">{data?.koef_persen_pajak}</div>
            </div>
            <div className="flex-1">
              <div className="flex-1 text-gray-400">Total Harga :</div>
              <div className="flex-1 mt-1 text-gray-400">{data?.total_rencana_belanja}</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex-1 ">
              <div className="flex-1 text-gray-400">Koefisien Perkalian :</div>
              <div className="flex-1 mt-1 text-gray-400">10 buah 10 orang</div>
            </div>
            <div className="flex-1">

            </div>
          </div>
          <div className="my-3">
            <Tabnav param={tabs} goFunction={handleTabs} />
            {(ActiveTab === "Januari-Maret" && (
              <div className="flex">
                <div className="flex-1 ">
                  <RincianMonth data={{ month: 'January', kuantitas: data?.jumlah_bulan1, harga: 0 }} />
                </div>
                <div className="flex-1">
                  <RincianMonth data={{ month: 'February', kuantitas: data?.jumlah_bulan2, harga: 0 }} />
                </div>
                <div className="flex-1">
                  <RincianMonth data={{ month: 'Maret', kuantitas: data?.jumlah_bulan3, harga: 0 }} />
                </div>
              </div>
            )) || (
                ActiveTab === "April-Juni" && (
                  <div className="flex">
                    <div className="flex-1 ">
                      <RincianMonth data={{ month: 'Maret', kuantitas: data?.jumlah_bulan4, harga: 0 }} />
                    </div>
                    <div className="flex-1">
                      <RincianMonth data={{ month: 'April', kuantitas: data?.jumlah_bulan5, harga: 0 }} />
                    </div>
                    <div className="flex-1">
                      <RincianMonth data={{ month: 'Mei', kuantitas: data?.jumlah_bulan6, harga: 0 }} />
                    </div>
                  </div>
                )
              )
              ||
              (
                ActiveTab === "Juli-September" && (
                  <div className="flex">
                    <div className="flex-1 ">
                      <RincianMonth data={{ month: 'Juli', kuantitas: data?.jumlah_bulan7, harga: 0 }} />
                    </div>
                    <div className="flex-1">
                      <RincianMonth data={{ month: 'Agustus', kuantitas: data?.jumlah_bulan8, harga: 0 }} />
                    </div>
                    <div className="flex-1">
                      <RincianMonth data={{ month: 'September', kuantitas: data?.jumlah_bulan9, harga: 0 }} />
                    </div>
                  </div>
                )
              )
              ||
              (
                ActiveTab === "Oktober-Desember" && (
                  <div className="flex">
                    <div className="flex-1 ">
                      <RincianMonth data={{ month: 'Oktober', kuantitas: data?.jumlah_bulan10, harga: 0 }} />
                    </div>
                    <div className="flex-1">
                      <RincianMonth data={{ month: 'November', kuantitas: data?.jumlah_bulan11, harga: 0 }} />
                    </div>
                    <div className="flex-1">
                      <RincianMonth data={{ month: 'Desember', kuantitas: data?.jumlah_bulan12, harga: 0 }} />
                    </div>
                  </div>
                )
              )


            }
          </div>

        </div>
      </ModalBody>
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

const MySelectLabel = props => (
  <Select
    className="mt-1"
    onChange={props.inputOnChange} {...props}>
    {
      props.datamap.map((item, index) => {
        return (<option key={index}>{item}</option>)
      })
    }
  </Select>
)

const InputWithLabel = WithLabel(MyInput);
const InputWithSelectLabel = WithLabel(MySelectLabel);

const RincianMonth = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 my-4 px-4">
      <div className="flex-1 ">
        <div className="flex-1 text-gray600 ">
          <p className="text-semibold md:text-lg text-sm">{data.month} </p>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row flex-1 mt-1 text-gray-400">
          <div className="flex-1">Kuantitas :</div>
          <div className="flex-1">{data.kuantitas}</div>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row flex-1 mt-1 text-gray-400">
          <div className="flex-1">Harga :</div>
          <div className="flex-1">{data.harga}</div>
        </div>
      </div>
    </div>
  )
}

