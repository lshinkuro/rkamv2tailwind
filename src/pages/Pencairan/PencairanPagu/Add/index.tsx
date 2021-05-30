import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../../../components";
import { Main } from "../style";
import { Input, Select, Label, Textarea, Button } from "@windmill/react-ui";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PDFviewer from "../../../../components/PDFviewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { formatRupiah } from "../../../../utils/helper";
import * as realizationservice from "../../../../services/v2/realizationservice/index";
import * as pCairPagu from "../../../../services/v2/pencairan/pencairanPagu";
import * as cPaguService from "../../../../services/v2/pencairan/pencairanPagu";
import { ToastContainer, toast } from "react-toastify";

function TambahPencairanPagu() {
  const [SumberPagu, setSumberPagu] = useState("");
  const [SumberDana, setSumberDana] = useState<any>([]);

  const item = ["Home", "Pencairan", "Pencairan Pagu", "Add"];
  const dataPaguDef = JSON.parse(localStorage.getItem("pagu-definitif")!);
  console.log(dataPaguDef);

  useEffect(() => {
    cPaguService
      .getSumberDana()
      .then((res) => {
        setSumberDana(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePostPagDef = () => {
    const payload = {
      nilai_pencairan_pagu:
        dataPaguDef[0].nilai_pagu * (dataPaguDef[0].termin_1 / 100),
      tahap: 1,
      pagu_definitif_id: dataPaguDef[0].id,
    };
    // console.log(payload)
    pCairPagu
      .postPencairanPagu(payload)
      .then((res) => {
        console.log("uhuy", res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <BreadCrumb data={item} title="Tambah Pencairan Pagu " />
      <Main>
        <Label>
          <span>Sumber Pagu</span>
          <Select
            defaultValue={SumberPagu}
            onChange={(e) => setSumberPagu(e.target.value)}
          >
            <option value="">Pilih Sumber Pagu</option>
            <option value="pagu_definitif">Pagu Definitif</option>
            <option value="other">Sumber Lain</option>
          </Select>
        </Label>
        {SumberPagu === "pagu_definitif" ? (
          <>
            {dataPaguDef ? (
              <span>
                <Label>
                  <span>Termin</span>
                  <Select
                  // onChange={(e) => setSumberPagu(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </Select>
                </Label>
                <Label>
                  <span>Sumber Dana</span>
                  <Input disabled defaultValue={dataPaguDef[0].sumber_dana} />
                </Label>
                <Label>
                  <span>Total Nilai Pagu</span>
                  <Input
                    disabled
                    defaultValue={`Rp ${indoNumber(
                      dataPaguDef[0].nilai_pagu
                    )} ,-`}
                  />
                </Label>
                <Label>
                  <span>Nilai Pencairan Pagu</span>
                  <Input
                    disabled
                    defaultValue={`Rp ${indoNumber(
                      dataPaguDef[0].nilai_pagu *
                        (dataPaguDef[0].termin_1 / 100)
                    )},-`}
                  />
                </Label>
                <div className="mt-5">
                  <Button onClick={handlePostPagDef}>Simpan</Button>
                </div>{" "}
              </span>
            ) : (
              "Pagu Definitif Kosong"
            )}
          </>
        ) : SumberPagu === "other" ? (
          <>
            <Label>
              <span>Sumber Dana</span>
              <Select defaultValue={SumberDana[0].kode}>
                {SumberDana.map((got: any) => {
                  return <option value={got.kode}>{got.nama}</option>;
                })}
              </Select>
              <Label>
                <span>Total Nilai</span>
                <Input />
              </Label>
              <Label>
                <span>Nilai Pencairan</span>
                <Input />
              </Label>
              <div className="mt-5">
                <Button>Simpan</Button>
              </div>
            </Label>
          </>
        ) : (
          <></>
        )}
      </Main>
    </>
  );
}

function indoNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default TambahPencairanPagu;
