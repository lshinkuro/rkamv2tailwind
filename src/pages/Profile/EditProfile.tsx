import { HelperText, Input, Label, Select, Textarea } from "@windmill/react-ui";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button1 } from "../../components";
import Tabnav from "../../components/Tabnav";
import * as uService from "../../services/users";
import * as profileservice from "../../services/v2/usermanservice/profileservice";
import SectionTitle from "../../components/Typography/SectionTitle";

const EditProfile = () => {
  const route = useHistory();
  const [ActiveTab, setActiveTab] = useState("Profile");
  const [newName, setnewName] = useState<string>("");
  const [newNIK, setnewNIK] = useState<string>("");
  const [NewPass, setNewPass] = useState<string>("");
  const [reNewPass, setReNewPass] = useState<string>("");
  const [OldPass, setOldPass] = useState<string>("");
  const [reOldPass, setReOldPass] = useState<string>("");
  const tabs = ["Profile", "Password"];
  const handleTabs = (value: any) => {
    setActiveTab(value);
    console.log(value);
  };
  const [dataUser, setdataUser] = React.useState<any>([]);
  const getProfile = async () => {
    const myProfile = await profileservice.getMyProfile();
    setdataUser(myProfile.data.return);
    console.log("data profile", myProfile.data.return?.profile.nama);
    console.log("data profile", myProfile.data.return?.profile.nik);
    // let nama = dataUser.profile?.nama;
    setnewName(myProfile.data.return?.profile.nama);
    setnewNIK(myProfile.data.return?.profile.nik);
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  let madrasah = "";
  let kode_role = dataUser?.kode_role;
  let kode_provinsi = dataUser?.profile?.kode_provinsi;
  let kode_kabkota = dataUser?.profile?.kode_kabkota;
  let kode_kecamatan = dataUser?.profile?.kode_kecamatan;
  let kode_kelurahan = dataUser?.profile?.kode_kelurahan;
  let alamat_jalan = dataUser?.profile?.alamat_jalan;
  let desa_kelurahan = dataUser?.profile?.desa_kelurahan;
  let rt = dataUser?.profile?.rt;
  let rw = dataUser?.profile?.rw;
  if (dataUser?.madrasah) {
    madrasah =
      dataUser?.madrasah?.nama === null ? "" : dataUser?.madrasah?.nama;
  }
  let role = dataUser?.kode_role;
  //   if (nama) {
  //       setnewName(nama)
  //   }
  const handleEditProfile = async () => {
    const payload = {
      nama: newName,
      kode_provinsi,
      kode_kabkota,
      kode_kecamatan,
      kode_kelurahan,
      rt,
      rw,
      alamat_jalan,
    };
    try {
      const res = await profileservice.editMyProfile(payload);
      console.log(res);
      alert("Berhasil Edit Profile");
      localStorage.setItem("profile", res.data.return);
      route.push("/profil/akun");
    } catch (err) {
      console.log("err", err.return);
      if (err.response) {
        alert(`${err.response.data.return}`);
      } else {
        alert("Error Edit Profil");
      }
    }
  };

  const handleChangePass = async () => {
    const payload = {
      password_lama: OldPass,
      password_baru: NewPass,
    };
    if (OldPass !== reOldPass) {
      alert("Password lama tidak match");
    } else if (NewPass !== reNewPass) {
      alert("Password baru tidak match");
    } else {
      try {
        await profileservice.editPass(payload);
        // console.log(res);
        alert("Berhasil Mengganti password");
        await uService.deletUser();
        localStorage.clear();
        route.push("/login");
      } catch (err) {
        if (err.response) {
          alert(`${err.response.data.return}`);
        } else {
          alert("Error Edit Profil");
        }
      }
    }
  };
  return (
    <div className="mx-8">
      <Tabnav param={tabs} goFunction={handleTabs} />
      {(ActiveTab === "Profile" && (
        <div className="w-full px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <SectionTitle>Profile</SectionTitle>
          <Label>
            <span>Nama</span>
            <Input
              className="mt-1"
              defaultValue={newName}
              onChange={(e: any) => setnewName(e.target.value)}
            />
          </Label>
          <div className="mt-4 flex w-full justify-end">
            <div className="mr-2 mt-4">
              <Button1
                label="Batal"
                negative
                onClick={() => route.push("/profil/akun")}
              />
            </div>
            <div className="mr-2 mt-4">
              <Button1 label="Simpan" onClick={handleEditProfile} />
            </div>
          </div>
        </div>
      )) ||
        (ActiveTab === "Password" && (
          <div className="w-full px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <SectionTitle>Ganti Password</SectionTitle>
            <Label>
              <span>Password Lama</span>
              <Input
                type="password"
                defaultValue={OldPass}
                className="mt-1"
                placeholder="Password lama"
                onChange={(e: any) => setOldPass(e.target.value)}
              />
              <Input
                type="password"
                defaultValue={reOldPass}
                className="mt-1"
                placeholder="Ulangi password lama"
                onChange={(e: any) => setReOldPass(e.target.value)}
                valid={
                  reOldPass === OldPass
                    ? true
                    : reOldPass !== OldPass
                    ? false
                    : true
                }
              />
              <HelperText className="text-red-500">
                {reOldPass === OldPass
                  ? ""
                  : reOldPass !== OldPass
                  ? "password harus sama"
                  : ""}
              </HelperText>
            </Label>
            <div className="mt-4" />
            <Label>
              <span>Password Baru</span>
              <Input
                type="password"
                defaultValue={NewPass}
                className="mt-1"
                placeholder="Password baru"
                onChange={(e: any) => setNewPass(e.target.value)}
              />
              <Input
                type="password"
                defaultValue={reNewPass}
                className="mt-1"
                placeholder="Ulangi password baru"
                onChange={(e: any) => setReNewPass(e.target.value)}
                valid={
                  reNewPass === NewPass
                    ? true
                    : reNewPass !== NewPass
                    ? false
                    : true
                }
              />
              <HelperText className="text-red-500">
                {reNewPass === NewPass
                  ? ""
                  : reNewPass !== NewPass
                  ? "password harus sama"
                  : ""}
              </HelperText>
            </Label>
            <div className="mt-4 flex w-full justify-end">
              <div className="mr-2 mt-4">
                <Button1
                  label="Batal"
                  negative
                  onClick={() => route.push("/profil/akun")}
                />
              </div>
              <div className="mr-2 mt-4">
                <Button1 label="Simpan" onClick={handleChangePass} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EditProfile;
