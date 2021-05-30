import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import ImageLight from "../../assets/img/logo-kemenag.png";
import ImageDark from "../../assets/img/logo-kemenag.png";
import { Label, Button, Select } from "@windmill/react-ui";

import { Login, Madrasah, Role, Tahun } from "../../services/auth";

const madrasah: any = [];

function Step2() {
  const authJson: any = localStorage.getItem("auth");
  const authStore = JSON.parse(authJson);
  const [role, setRole] = useState<any>([]);
  const [Kode_role, setKode_role] = useState<string>(authStore.kode_role);
  const [tahun, setTahun] = useState<any>([]);
  const [tahunChose, setTahunChose] = useState<any>("");
  const route = useHistory();
  const [Message, setMessage] = useState<string>("");
  const location = useLocation();
  const passing: any = location.state;

  const payload = {
    username: passing.user,
    password: passing.pass,
    kode_role: Kode_role,
    madrasah_id: passing.mId,
  };

  const getDataMd = async (param: string) => {
    const dataMadrasah = await Madrasah(payload);
    dataMadrasah.return.forEach((val: any, i: number) => {
      madrasah[i] = val;
    });
    if (payload["madrasah_id"] != "") {
      if (param) {
        payload["madrasah_id"] = param;
        const dataRole = await Role(payload);
        if (!Kode_role) {
          setKode_role(dataRole.return[0].kode);
        }
        setRole(dataRole.return);
      } else {
        const dataRole = await Role(payload);
        setRole(dataRole.return);
      }
      const dataTahun = await Tahun();
      let tmpTahun:any= dataTahun[0]
      if (!tahunChose) {
        setTahunChose(tmpTahun?.tahun || 2021);
      }
      
      setTahun(dataTahun.return);
    }
  };

  useEffect(() => {
    getDataMd(passing.mId);
    if (authStore) {
      if (authStore.isLogin) {
        route.push("/");
      }
    }
  }, [passing, route]);

  const login = async () => {
    try {
      const res = await Login(payload);
      const data: any = res.return;
      data["isLogin"] = true;
      data["tahun"] = tahunChose;
      const value = JSON.stringify(data);
      localStorage.setItem("isTahun", data.tahun || 2021)
      localStorage.setItem("auth", value);
      route.push("/");
    } catch (err) {
      if (err.response) {
        setMessage(`${err.response.data.return}`);
      } else {
        setMessage("Kombinasi Username dan Password salah");
      }
    }
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-fill w-6 md:w-auto dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-fill w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login Sebagai
              </h1>
              <span className="text-red-600">{Message}</span>
              <Label className="mt-4 hidden">
                <span>Madrasah</span>
                <Select
                  className="mt-1"
                  onClickCapture={(e: any) => {
                    // setMadrasahId(e.target.value);
                    getDataMd(e.target.value);
                  }}
                >
                  {madrasah.map((md: any, i: number) => (
                    <option key={i} value={md.id}>
                      {md.nama}
                    </option>
                  ))}
                </Select>
              </Label>

              <Label className="mt-4">
                <span>Role</span>
                <Select
                  defaultValue={Kode_role}
                  className="mt-1"
                  onClick={(e: any) => {
                    setKode_role(e.target.value);
                  }}
                >
                  {role.map((md: any, i: number) => (
                    <option key={i} value={md.kode}>
                      {md.nama}
                    </option>
                  ))}
                </Select>
              </Label>

              <Label className="mt-4">
                <span>Tahun</span>
                <Select
                  defaultValue={tahunChose}
                  className="mt-1"
                  onClick={(e: any) => {
                    setTahunChose(e.target.value);
                  }}
                >
                  {tahun.map((md: any, i: number) => (
                    <option key={i} value={md.tahun}>
                      {md.nama}
                    </option>
                  ))}
                </Select>
              </Label>

              <Button onClick={() => login()} className="mt-4" block>
                Masuk
              </Button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Step2;
