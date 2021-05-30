import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ImageLight from "../../assets/img/create-account-office.jpeg";
import ImageDark from "../../assets/img/create-account-office-dark.jpeg";
import { Input, Label, Button } from "@windmill/react-ui";
import { KodeCek } from "../../services/auth";

function CodeRegister() {
  const [code, setCode] = useState("");
  const [Message, setMessage] = useState("");
  const route = useHistory();
  const payload = {
    kode_registrasi: code,
  };

  const kodeCek = async () => {
    try {
      const res = await KodeCek(payload);
      if (res.success) {
        route.push({
          pathname: "/create-account",
          state: res.return,
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.return);
      } else if (error.response.status === 404) {
        setMessage("Silahkan Isi Kode Registrasi");
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
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Kode Registrasi
              </h1>
              <div className="relative h-5">
                <div className="absolute text-red-600 top-0">{Message}</div>
              </div>
              <Label>
                <Input
                  className="mt-1"
                  type="number"
                  placeholder="kode registrasi"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 12);
                  }}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              </Label>
              <Button block className="mt-4" onClick={kodeCek}>
                Lanjut
              </Button>
              <hr className="my-8" />
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Sudah terdaftar ? Silahkan masuk
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CodeRegister;
