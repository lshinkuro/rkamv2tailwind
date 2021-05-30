import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Select,
  Input,
  HelperText,
} from "@windmill/react-ui";
import * as uService from "../../services/users";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as mService from "../../services/refmadrasah";
type PageHeaderProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isRole: any;
};

const InputModal: React.FC<any> = ({ isRole, isOpen, onClose, data }) => {
  const [groupRole, setGroupRole] = React.useState<any>("");
  const [kodeRole, setKodeRole] = React.useState<any>("");
  const [provAuth, setProvAuth] = React.useState<any>("");
  const [kabkotaAuth, setKabkotaAuth] = React.useState<any>("");
  const [madrasahId, setMadrasahId] = React.useState<any>("");
  const [nama, setNama] = useState<any>("");
  const [nik, setNik] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [role, setRole] = useState<any>([]);
  const [prov, setProv] = useState<any>([]);
  const [kabkota, setKabkota] = useState<any>([]);
  const [password, setPassword] = useState<any>("");
  const [isChecked, setIsChecked] = useState<any>(false);
  const [provDOption, setProvDOption] = useState<any>(null);

  const [madrasah, setMadrasah] = useState<any>([]);
  const [madrasahOption, setMadrasahOption] = useState<any>([]);

  const [kabDOption, setKabDOption] = useState<any>([]);
  const [roleOption, setRoleOption] = useState<any>([]);
  const [provLock, setProvLock] = useState<any>(null);
  const [kabKotaLock, setKabKotaLock] = useState<any>("");
  const [optionKabKotaLock, setOptionKabKotaLock] = useState<any>("");
  const [logErr, setLogErr] = useState<any>("");

  useEffect(() => {
    let tmpAuth: any = JSON.parse(localStorage.getItem("auth")!);
    setGroupRole(tmpAuth.group_role);
    setKodeRole(tmpAuth.kode_role);
    setProvAuth(tmpAuth.kantor_provinsi?.kode_provinsi || "");
    setKabkotaAuth(tmpAuth.kantor_kabkota?.kode_kabkota || "");

    setMadrasahId(tmpAuth.madrasah?.id || null);
    if (tmpAuth) {
      let kodeLock = tmpAuth.kantor_provinsi
        ? tmpAuth.kantor_provinsi.kode_provinsi
        : "";
      let provTmp: any =
        JSON.parse(localStorage.getItem("provdropdown")!) || [];
      let tmpProv = provTmp.filter((obj: any) => {
        return obj.kode === kodeLock;
      });
      setProvLock(kodeLock ? tmpProv[0].nama : "");
      let kabKotaTmp: any =
        JSON.parse(localStorage.getItem("kabkotadropdown")!) || [];
      let tmpKabKota: any = kabKotaTmp.filter((obj: any) => {
        return obj.kode_provinsi === kodeLock;
      });
      setOptionKabKotaLock(tmpKabKota);
    }
    setProvDOption(JSON.parse(localStorage.getItem("provdropdown")!));
    const roleOp: any =
      JSON.parse(localStorage.getItem(isRole + "role")!) || [];
    if (tmpAuth.kode_role === "kepala_madrasah") {
      let tmpRoles: any = roleOp.filter((obj: any) => {
        return obj.kode !== "kepala_madrasah";
      });
      setRoleOption(tmpRoles);
    } else {
      setRoleOption(roleOp);
    }
  }, [0]);
  const settingNotif: any = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  let clearForm = async () => {
    setNik("");
    setNama("");
    setEmail("");
    setRole([]);
    setProv([]);
    setKabkota([]);
    setKabkota([]);
    setMadrasah([]);
    setPassword([]);
    setLogErr("");
    if (isRole === "prov") {
      await uService.getUser("prov");
    } else if (isRole === "kabkota") {
      await uService.getUser("kabkota");
    } else if (isRole === "madrasah") {
      await uService.getUser("madrasah");
    }
    await toast.success("Berhasil", settingNotif);
    setTimeout(() => onClose(), 1000);
  };
  let submitData = async (status: any) => {
    console.log(kabkota.length);
    let nikTmp: any = nik ? nik : data ? data?.nik || data.profile?.nik : "";
    let namaTmp: any = nama
      ? nama
      : data
      ? data?.nama || data.profile?.nama
      : "";
    let emailTmp: any = email
      ? email
      : data
      ? data.email || data.profile?.user.email
      : "";
    let roleTmp: any = role
      ? role
      : status === "edit"
      ? data?.kode_role || data?.role.kode
      : "tes";
    // role.length > 0 ? role : data?.kode_role || data?.role.kode || roleOption[0]?.kode
    //      ;
    // : ;

    let provTmp: any = provLock
      ? null
      : prov.length > 0
      ? prov
      : status === "edit"
      ? data?.kode_provinsi || data?.kantor_provinsi.kode_provinsi
      : provDOption[0]?.kode || "tes";
    let kabkotaTmp: any =
      kabKotaLock ||
      data?.kode_kabkota ||
      data.kantor_kabkota?.kode_kabkota ||
      "";

    let remailTmp: any = isChecked ? 1 : 0;
    let idTmp: any = data ? data.id : null;

    let tmp0: any = {
      id: idTmp,
      email: emailTmp,
      kode_role: role.length === 0 ? roleOption[0]?.kode : roleTmp,
      nama: namaTmp,
      nik: nikTmp,
      require_email: remailTmp,
      password: password,
      kode_provinsi:
        isRole === "prov" || kodeRole === "admin_provinsi" ? provAuth : provTmp,
      kode_kabkota:
        kabkota.length > 0
          ? kabkota
          : isRole === "kabkota" || kodeRole === "admin_kabkota"
          ? kabkotaAuth
          : kabkotaTmp,
      madrasah_id: madrasah.length === 0 ? madrasahId : madrasah,
    };
    if (status === "edit") {
      delete tmp0["password"];
      delete tmp0["require_email"];
      delete tmp0["kode_provinsi"];
      delete tmp0["kode_kabkota"];
      delete tmp0["madrasah_id"];
    } else {
      delete tmp0["id"];
    }
    if (isRole === "pusat") {
      delete tmp0["kode_provinsi"];
      delete tmp0["kode_kabkota"];
      delete tmp0["madrasah_id"];
    } else if (isRole === "prov") {
      delete tmp0["madrasah_id"];
    } else if (isRole === "kabkota") {
      delete tmp0["madrasah_id"];
    }
    if (status === "edit") {
      try {
        await uService.createUser(tmp0, isRole, status);
        await toast.success("Berhasil", settingNotif);
        setTimeout(() => onClose(), 1500);
        clearForm();
      } catch (error) {
        setLogErr(error.response.data.return);
      }
    } else {
      try {
        if (nik.length === 0) {
          setLogErr("nik tidak boleh kosong");
        } else if (email.length === 0) {
          setLogErr("email tidak boleh kosong");
        } else if (nama.length === 0) {
          setLogErr("nama tidak boleh kosong");
        } else if (!isChecked && password.length < 8) {
          // if (password.length < 8) {
          setLogErr("password minimal 8 karakter");
          // }
        } else {
          await uService.createUser(tmp0, isRole, status);
          clearForm();
        }
      } catch (error) {
        setLogErr(error.response.data.return);
        console.log(error);
      }
    }
  };
  let handleProvinsiChange = async (idh: any) => {
    setProv(idh);
    let tmp0 = JSON.parse(localStorage.getItem("kabkotadropdown")!);
    let tmp1 = tmp0.filter((obj: any) => {
      return obj.kode_provinsi == idh;
    });
    setKabDOption(tmp1);
  };

  let handleKabKota = async (idh: any) => {
    setKabkota(idh);
    // let [before0, after0] = idh.toString().split(".");
    let tmp2 = await mService.getMyMadrasah(idh);
    setMadrasahOption(tmp2);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        // hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalHeader>
        {" "}
        {data ? "Edit" : "Tambah"} {isRole.toUpperCase()}{" "}
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col p-2 ">
          <div className="w-auto ">
            <span className="text-red-500 align-middle">{logErr}</span>
            <Label>
              <span className="text-gray-400 ">
                <span className="text-red-500">*</span>NIK{" "}
              </span>
              {data ? (
                <Input
                  disabled
                  defaultValue={data ? data?.nik || data.profile?.nik : ""}
                ></Input>
              ) : (
                <Input
                  type="number"
                  onChange={(e: any) => setNik(e.currentTarget.value)}
                  defaultValue={data ? data.nik || data.profile.nik : ""}
                  valid={nik.length === 16 ? true : logErr ? false : true}
                  onInput={(e) => {
                    e.currentTarget.value = Math.max(
                      0,
                      parseInt(e.currentTarget.value)
                    )
                      .toString()
                      .slice(0, 16);
                  }}
                />
              )}
              <HelperText className="text-red-500">
                {nik.length === 0
                  ? ""
                  : nik.length !== 16
                  ? "NIK hanya 16 digit"
                  : ""}
              </HelperText>
            </Label>
            <div className="gap-2 space-x-4">
              <td>
                <Label>
                  <span className="text-gray-400">
                    <span className="text-red-500">*</span>Email{" "}
                  </span>
                  <Input
                    onChange={(e: any) => setEmail(e.currentTarget.value)}
                    className="mt-1"
                    placeholder=""
                    id="emails"
                    defaultValue={
                      data ? data.email || data.profile.user.email : ""
                    }
                    valid={
                      email.match(
                        "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"
                      )
                        ? true
                        : email.length !== 0
                        ? false
                        : logErr
                        ? false
                        : true
                    }
                  />
                  <HelperText className="text-red-500">
                    {email.length === 0
                      ? true
                      : email.match(
                          "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"
                        )
                      ? ""
                      : "Email tidak valid"}
                  </HelperText>
                </Label>
              </td>
              <td>
                <Label className="ml-2">
                  <span className="text-gray-400 ">
                    <span className="text-red-500">*</span>Nama{" "}
                  </span>
                  <br />
                  <Input
                    id="namas"
                    onChange={(e: any) => setNama(e.currentTarget.value)}
                    className="mt-1"
                    placeholder=""
                    defaultValue={data ? data.nama || data.profile.nama : ""}
                    valid={nama.length !== 0 ? true : logErr ? false : true}
                  />
                </Label>
              </td>
            </div>
            <Label>
              {" "}
              <span className="text-gray-400 ">
                <span className="text-red-500">*</span>Role{" "}
              </span>
              <br />
              <Select
                className="mt-1"
                onChange={(e: any) => {
                  setRole(e.currentTarget.value);
                }}
                id="roles"
                defaultValue={data ? data.kode_role || data.role.kode : ""}
                valid={role.length !== 0 ? true : logErr ? false : true}
              >
                {roleOption
                  ? roleOption.map((idz: any, key: any) => (
                      <option key={idz.kode} value={idz.kode}>
                        {idz.nama}
                      </option>
                    ))
                  : "Silahkan Sinkrokan Data"}
              </Select>
            </Label>
            {groupRole !== "madrasah" && kodeRole !== "admin_kabkota" ? (
              <div>
                <td>
                  {isRole !== "pusat" ? (
                    data ? (
                      ""
                    ) : (
                      <Label className="ml-1">
                        {" "}
                        <span className="text-gray-400 ">
                          <span className="text-red-500">*</span>Provinsi{" "}
                        </span>
                        <br />
                        {provLock ? (
                          <Input
                            className="mt-1"
                            placeholder=""
                            defaultValue={provLock}
                            disabled
                          />
                        ) : (
                          <Select
                            id="provinsis"
                            className="mt-1"
                            onChange={(e: any) => {
                              handleProvinsiChange(e.currentTarget.value);
                            }}
                            defaultValue={
                              data
                                ? data.kode_provinsi ||
                                  data.kantor_provinsi.kode_provinsi
                                : null
                            }
                            // valid={data ? true : prov.length === 0 ? false : true}
                            valid={
                              prov.length !== 0 ? true : logErr ? false : true
                            }
                          >
                            {provDOption
                              ? provDOption.map((idz: any, key: any) => (
                                  <option key={idz.kode} value={idz.kode}>
                                    {idz.nama}
                                  </option>
                                ))
                              : "Silahkan Sinkrokan Data"}
                          </Select>
                        )}
                      </Label>
                    )
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {isRole !== "pusat" ? (
                    data ? (
                      ""
                    ) : (
                      <Label className="ml-1">
                        {" "}
                        <span className="text-gray-400 ">
                          <span className="text-red-500">*</span>Kab Kota{" "}
                        </span>
                        <br />
                        {provLock ? (
                          <Select
                            id="kabkotas"
                            className="mt-1"
                            onChange={(e: any) => {
                              handleKabKota(e.currentTarget.value);
                            }}
                            defaultValue={
                              data
                                ? data.kode_kabkota ||
                                  data.kantor_kabkota.kode_kabkota
                                : ""
                            }
                            valid={
                              kabkota.length !== 0
                                ? true
                                : logErr
                                ? false
                                : true
                            }
                          >
                            {optionKabKotaLock
                              ? optionKabKotaLock.map((idz: any, key: any) => (
                                  <option key={idz.kode} value={idz.kode}>
                                    {idz.nama}
                                  </option>
                                ))
                              : "Silahkan Sinkrokan Data"}
                          </Select>
                        ) : (
                          <Select
                            className="mt-1"
                            onChange={(e: any) => {
                              handleKabKota(e.currentTarget.value);
                            }}
                            id="kabkotas"
                            defaultValue={
                              data
                                ? data.kode_kabkota ||
                                  data.kantor_kabkota.kode_kabkota
                                : ""
                            }
                            valid={
                              kabkota.length !== 0
                                ? true
                                : logErr
                                ? false
                                : true
                            }
                          >
                            {kabDOption
                              ? kabDOption.map((idz: any, key: any) => (
                                  <option key={idz.kode} value={idz.kode}>
                                    {idz.nama}
                                  </option>
                                ))
                              : "Silahkan Sinkrokan Data"}
                          </Select>
                        )}
                      </Label>
                    )
                  ) : (
                    ""
                  )}
                </td>

                <td>
                  {isRole === "madrasah" ? (
                    data ? (
                      ""
                    ) : (
                      <Label className="ml-1">
                        {" "}
                        <span className="text-gray-400 ">
                          <span className="text-red-500">*</span>Madrasah{" "}
                        </span>
                        <br />
                        <Select
                          id="madrasah"
                          className="mt-1"
                          onChange={(e: any) => {
                            setMadrasah(e.currentTarget.value);
                          }}
                          valid={
                            madrasah.length !== 0 ? true : logErr ? false : true
                          }
                        >
                          {madrasahOption
                            ? madrasahOption.map((idz: any, key: any) => (
                                <option key={idz.id} value={idz.id}>
                                  {idz.nama}
                                </option>
                              ))
                            : "Silahkan Sinkrokan Data"}
                        </Select>
                      </Label>
                    )
                  ) : (
                    ""
                  )}
                </td>
              </div>
            ) : (
              ""
            )}
            {!data ? (
              <div>
                <Label check>
                  <input
                    id="isEmail"
                    type="checkbox"
                    defaultChecked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <span className="ml-2">Memerlukan email valid?</span>
                  {isChecked}
                </Label>
              </div>
            ) : (
              ""
            )}
            {isChecked || data! ? (
              ""
            ) : (
              <Label className="ml-1">
                <span className="text-gray-400 ">
                  <span className="text-red-500">*</span>Password{" "}
                </span>
                <Input
                  id="passwords"
                  type="password"
                  onChange={(e: any) => setPassword(e.currentTarget.value)}
                  valid={password.length > 8 ? true : logErr ? false : true}
                  defaultValue={data ? data.nik || data.profile.nik : ""}
                />
                <HelperText className="text-red-500">
                  {password.length === 0
                    ? ""
                    : password.length < 8
                    ? "password minimal 8 karakter"
                    : ""}
                </HelperText>
              </Label>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="">
          <Button layout="outline" onClick={onClose}>
            Batal
          </Button>
          &nbsp;
          {data ? (
            <Button onClick={(e: any) => submitData("edit")}> Simpan</Button>
          ) : (
            <Button onClick={(e: any) => submitData("tambah")}> Simpan</Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default InputModal;
