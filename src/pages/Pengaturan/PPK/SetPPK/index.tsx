import { Button, Label, Select } from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { BreadCrumb } from "../../../../components";
import * as pV2Service from "../../../../services/v2/pengaturan/levelPPK";

const SetPPK = () => {
  const item = ["Home", "Pengaturan", "PPK", "Set PPK"];
  const [data, setData] = useState<any>([{}]);
  const [PPKlv, setPPKlv] = useState<string>("");
  const [PPKlvOptions, setPPKlvOptions] = useState<any>([{}]);
  const location = useLocation();
  const route = useHistory();
  const getData = (p) => {
    pV2Service.getMadrasahPPK(p)?.then((res) => {
      console.log(res.kode_level_ppk);
      setPPKlv(res.kode_level_ppk);
      setData(res);
    });
    pV2Service.getLvPPK(p)?.then((res) => {
      console.log("gasmin", res);
      setPPKlvOptions(res);
    });
  };
  let id = location.pathname.split("/pengaturan/ppk/set-ppk/").pop();
  useEffect(() => {
    console.log(id);
    getData(id);
  }, []);

  const UpdatePPK = async () => {
    let payload = {
      kode_level_ppk: PPKlv,
      id,
    };
    try {
      const res = await pV2Service.putMadrasahPPK(payload);
      console.log(res);
      alert(
        `Berhasil set PPK madrasah ${res.nama} menjadi ${res.kode_level_ppk}`
      );
    } catch (err) {
      console.log(err);
    }
    // console.log(payload);
  };
  return (
    <>
      <BreadCrumb data={item} title="Set Pejabat Pembuat Komitmen" />
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div className="flex md:flex-row md:text-base text-xs flex-col">
          <div className="md:w-1/2 w-full">
            <table>
              <tr>
                <td>Nama Madrasah</td>
                <td className="px-5"> : </td>
                <td>{data.nama}</td>
              </tr>
              <tr>
                <td>NSM</td>
                <td className="px-5"> : </td>
                <td>{data.nsm}</td>
              </tr>
              <tr>
                <td>NPSN</td>
                <td className="px-5"> : </td>
                <td>{data.npsn}</td>
              </tr>
            </table>
          </div>
          <div className="flex justify-between md:w-1/2 w-full">
            <Label className="mt-4 mr-4 w-full">
              <span>Level PPK</span>
              <Select
                value={PPKlv}
                className="mt-1"
                onChange={(e: any) => setPPKlv(e.target.value)}
              >
                <option selected hidden>Pilih level PPK</option>
                {PPKlvOptions.map(x => (
                  <option value={x.kode}>{x.nama}</option>
                  ))}
                  {/* <option value="madrasah">Madrasah</option>
                <option value="kankemenag">Kankemenag</option>
                <option value="kanwil">Kanwil</option> */}
              </Select>
            </Label>
            <div style={{ marginBottom: 0, marginTop: "auto" }}>
              <Button onClick={UpdatePPK}>Simpan</Button>
            </div>
            <div style={{ marginBottom: 0, marginTop: "auto", marginLeft: 4 }}>
              <Button onClick={() => route.goBack()}>Kembali</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetPPK;
