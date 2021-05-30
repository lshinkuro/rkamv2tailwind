import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Input, Label } from "@windmill/react-ui";
import { Reg } from "../../services/auth";
import { Button1 } from "../../components";

function CreateAccount() {
  const location = useLocation();
  const data = location.state;
  const route = useHistory();

  //state hook
  const [namaKM, setNamaKM] = useState("");
  const [nikKM, setnikKM] = useState("");
  const [emailKM, setemailKM] = useState("");
  const [passKM, setpassKM] = useState("");
  const [namaBM, setNamaBM] = useState("");
  const [nikBM, setnikBM] = useState("");
  const [emailBM, setemailBM] = useState("");
  const [passBM, setpassBM] = useState("");
  const [Message, setMessage] = useState("");
  // console.log(data)

  const payload = {
    kode_registrasi: data.nsm,
    nama_kepala_madrasah: namaKM,
    nik_kepala_madrasah: nikKM,
    email_kepala_madrasah: emailKM,
    password_kepala_madrasah: passKM,
    nama_bendahara_madrasah: namaBM,
    nik_bendahara_madrasah: nikBM,
    email_bendahara_madrasah: emailBM,
    password_bendahara_madrasah: passBM,
  };

  const register = async () => {
    try {
      const res = await Reg(payload);
      console.log("yuhuu", res.return);
      route.push("/login");
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 400) {
        console.log('data', error.response.data);
        console.log('status', error.response.status);
        console.log('header', error.response.headers);
        setMessage(error.response.data.return);
        // setMessage("Kode Sudah Teregristrasi");
        // console.log()
      } else {
        setMessage(error.response.data.error);
      }
    }
    // console.log("pay", payload);
  };

  // console.log(data);
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-2 sm:p-12 md:w-1/2">
            <div className=" w-full md:p-6 p-3 bg-blue-600 rounded-lg shadow-md ">
              <div className="flex ">
                <div className="flex-1">
                  <p className="text-white font-bold md:font-medium">NPSN</p>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{data.npsn}</p>
                </div>
              </div>
              <div className="flex ">
                <div className="flex-1">
                  <p className="text-white font-bold md:font-medium">NSM</p>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{data.nsm}</p>
                </div>
              </div>
              <div className="flex ">
                <div className="flex-1 font-bold md:font-medium">
                  <p className="text-white">Madrasah</p>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{data.nama}</p>
                </div>
              </div>
              <div className="flex ">
                <div className="flex-1">
                  <p className="text-white font-bold md:font-medium">Status</p>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">
                    {(data.status === "s" && "Swasta") || "Negri"}
                  </p>
                </div>
              </div>
              <div className="flex ">
                <div className="flex-1">
                  <p className="text-white font-bold md:font-medium">Jenjang</p>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">
                    {(data.jenjang === "ra" && "Raudaltul Athfal") ||
                      (data.jenjang === "mi" && "Madrasah Ibtidaiyah") ||
                      (data.jenjang === "mts" && "Madrasah Tsanawiyah") ||
                      (data.jenjang === "ma" && "Madrasah Aliyah") ||
                      (data.jenjang === "mak" && "Madrasah Aliyah Kejuruan")}
                  </p>
                </div>
              </div>
            </div>
          </main>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <hr className="my-3" />
              <div className="relative h-5">
                <div className="absolute text-red-600 top-0">{Message}</div>
              </div>
              <p className="mt-3">
                <span className="my-3"> Kepala Madrasah</span>
              </p>
              <Label>
                <span className="text-sm">* Nama Kepala Madrasah</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder=""
                  onChange={(e) => setNamaKM(e.target.value)}
                />
              </Label>
              <Label>
                <span className="text-sm">* NIK Kepala Madrasah</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder=""
                  onChange={(e) => setnikKM(e.target.value)}
                />
              </Label>
              <Label>
                <span className="text-sm">* Email Kepala Madrasah</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder=""
                  onChange={(e) => setemailKM(e.target.value)}
                />
              </Label>
              <Label className="mt-4">
                <span className="text-sm">Password Kepala Madrasah </span>
                <Input
                  className="mt-1"
                  placeholder="***************"
                  type="password"
                  onChange={(e) => setpassKM(e.target.value)}
                />
              </Label>

              <hr className="my-3" />
              <p className="mt-3">
                <span className="my-3"> Bendahara Madrasah</span>
              </p>
              <Label>
                <span className="text-sm">* Nama Bendahara Madrasah</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder=""
                  onChange={(e) => setNamaBM(e.target.value)}
                />
              </Label>

              <Label>
                <span className="text-sm">* NIK Bendahara Madrasah</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder=""
                  onChange={(e) => setnikBM(e.target.value)}
                />
              </Label>

              <Label>
                <span className="text-sm">* Email BendaharaMadrasah</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder=""
                  onChange={(e) => setemailBM(e.target.value)}
                />
              </Label>

              <Label className="mt-4">
                <span className="text-sm">Password Bendahara Madrasah </span>
                <Input
                  className="mt-1"
                  placeholder="***************"
                  type="password"
                  onChange={(e) => setpassBM(e.target.value)}
                />
              </Label>
              <div className="w-full flex justify-center mt-4">
              <Button1 onClick={register} label="DAFTAR" />
              </div>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
