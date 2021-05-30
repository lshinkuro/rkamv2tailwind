import React from "react";
import { OutlinePersonIcon, OutlineCogIcon, MailIcon } from "../../icons";
import Breadcrumb from "../../components/BreadCrumb";
import { Button1 } from "../../components";
import * as profileservice from "../../services/v2/usermanservice/profileservice";
import { useHistory } from "react-router";
import logo from "../../assets/img/user-profile.png";

let madrasah = "";
const Profile = () => {
  const route = useHistory();
  const [provinsi, setProvinsi] = React.useState<any>([]);
  const [kabupaten, setKabupaten] = React.useState<any>([]);
  const [dataUser, setdataUser] = React.useState<any>([]);
  const getProfile = async () => {
    const myProfile = await profileservice.getMyProfile();
    setdataUser(myProfile.data.return);
    console.log("data profile", myProfile);
  };

  React.useEffect(() => {
    let dataprovinsi: any =
      JSON.parse(localStorage.getItem("provdropdown")!) || [];
    let datakabupaten: any =
      JSON.parse(localStorage.getItem("kabkotadropdown")!) || [];
    setProvinsi(dataprovinsi);
    setKabupaten(datakabupaten);
    getProfile();
  }, []);

  // console.log("data profile :", dataUser.profile);

  let tmp0 = JSON.parse(localStorage.getItem("auth")!);
  // console.log(tmp0);
  let nama = dataUser.profile?.nama;
  let email = dataUser.profile?.user?.email;
  let nik = dataUser.profile?.user?.username;
  let kode_role = dataUser?.kode_role;
  let kode_provinsi = dataUser?.profile?.kode_provinsi;
  let kode_kabkota = dataUser?.profile?.kode_kabkota;
  let kode_kecamatan = dataUser?.profile?.kode_kecamatan;
  let alamat_jalan = dataUser?.profile?.alamat_jalan;
  let desa_kelurahan = dataUser?.profile?.desa_kelurahan;
  let rt = dataUser?.profile?.rt;
  let rw = dataUser?.profile?.rw;
  if (dataUser?.madrasah) {
    madrasah =
      dataUser?.madrasah?.nama === null ? "" : dataUser?.madrasah?.nama;
  }
  let role = dataUser?.kode_role;

  const item = [
    "Profile",
    `Akun ${
      (kode_role === "super_admin_pusat" && "Super Admin Pusat") ||
      (kode_role === "admin_pusat" && "Admin Pusat") ||
      (kode_role === "pengarah_pusat" && "Pengarah Pusat") ||
      (kode_role === "penanggung_jawab_umum_pusat" &&
        "Penanggung Jawab Umum Pusat") ||
      (kode_role === "penanggung_jawab_teknis_pusat" &&
        "Penaggung Jawab Teknis Pusat") ||
      (kode_role === "pembuat_kebijakan_pusat" && "Pembuat Kebijakan Pusat") ||
      (kode_role === "auditor_pusat" && "Auditor Pusat") ||
      (kode_role === "admin_provinsi" && "Admin Kanwil") ||
      (kode_role === "pengarah_provinsi" && "Pengarah Kanwil") ||
      (kode_role === "penanggung_jawab_umum_provinsi" &&
        "Penanggung Jawab Umum Kanwil") ||
      (kode_role === "penanggung_jawab_teknis_provinsi" &&
        "Penanggung Jawab Teknis Kanwil") ||
      (kode_role === "pembuat_kebijakan_provinsi" &&
        "Pembuat Kebijakan Kanwil") ||
      (kode_role === "auditor_provinsi" && "Auditor Kanwil") ||
      (kode_role === "admin_kabkota" && "Admin Kankemenag") ||
      (kode_role === "pengarah_kabkota" && "Pengarah Kankemenag") ||
      (kode_role === "auditor_kabkota_external" && "Auditor Kankemenag") ||
      (kode_role === "penanggung_jawab_umum_kabkota" &&
        "Penanggung Jawab Umum Kankemenag") ||
      (kode_role === "penanggung_jawab_teknis_kabkota" &&
        "Penanggung jawab Teknis Kankemenag") ||
      (kode_role === "pembuat_kebijakan_kabkota" &&
        "Pembuat Kebijakan Kankemenag") ||
      (kode_role === "auditor_kabkota" && "Auditor Kankemenag") ||
      (kode_role === "kepala_madrasah" && "Kepala Madrasah") ||
      (kode_role === "bendahara_madrasah" && "Bendahara Madrasah") ||
      (kode_role === "staff_madrasah" && "Staff Madrasah")
    }`,
  ];

  return (
    <div>
      <Breadcrumb data={item} title="User Profile" />
      <div className="flex flex-col sm:flex-row gap-2 mx-4 my-6 ">
        <div className="card  flex flex-col bg-white m-2 mx-4 rounded-sm shadow-md h-auto">
          <div className="  card__media--aside mx-10"></div>
          <div className="flex items-center p-4 pt-10 ">
            <div className="flex flex-col items-center w-full">
              <div className="h-64  w-64 md rounded-full ">
                <img
                  className="h-full w-full md rounded-full"
                  src={logo}
                  alt="logo"
                  style={{ objectFit: "cover" }}
                />
                {/* <div className="absolute"></div> */}
              </div>
              <div className="flex flex-col space-y-1 justify-center items-center mt-5 w-full">
                <span className="text-md whitespace-nowrap text-gray-800 font-semibold">
                  {nama}
                </span>
                <span className="text-md whitespace-nowrap text-gray-600">
                  {(kode_role === "super_admin_pusat" && "Super Admin Pusat") ||
                    (kode_role === "admin_pusat" && "Admin Pusat") ||
                    (kode_role === "pengarah_pusat" && "Pengarah Pusat") ||
                    (kode_role === "penanggung_jawab_umum_pusat" &&
                      "Penanggung Jawab Umum Pusat") ||
                    (kode_role === "penanggung_jawab_teknis_pusat" &&
                      "Penaggung Jawab Teknis Pusat") ||
                    (kode_role === "pembuat_kebijakan_pusat" &&
                      "Pembuat Kebijakan Pusat") ||
                    (kode_role === "auditor_pusat" && "Auditor Pusat") ||
                    (kode_role === "admin_provinsi" && "Admin Kanwil") ||
                    (kode_role === "pengarah_provinsi" && "Pengarah Kanwil") ||
                    (kode_role === "penanggung_jawab_umum_provinsi" &&
                      "Penanggung Jawab Umum Kanwil") ||
                    (kode_role === "penanggung_jawab_teknis_provinsi" &&
                      "Penanggung Jawab Teknis Kanwil") ||
                    (kode_role === "pembuat_kebijakan_provinsi" &&
                      "Pembuat Kebijakan Kanwil") ||
                    (kode_role === "auditor_provinsi" && "Auditor Kanwil") ||
                    (kode_role === "admin_kabkota" && "Admin Kankemenag") ||
                    (kode_role === "pengarah_kabkota" &&
                      "Pengarah Kankemenag") ||
                    (kode_role === "auditor_kabkota_external" &&
                      "Auditor Kankemenag") ||
                    (kode_role === "penanggung_jawab_umum_kabkota" &&
                      "Penanggung Jawab Umum Kankemenag") ||
                    (kode_role === "penanggung_jawab_teknis_kabkota" &&
                      "Penanggung jawab Teknis Kankemenag") ||
                    (kode_role === "pembuat_kebijakan_kabkota" &&
                      "Pembuat Kebijakan Kankemenag") ||
                    (kode_role === "auditor_kabkota" && "Auditor Kankemenag") ||
                    (kode_role === "kepala_madrasah" && "Kepala Madrasah") ||
                    (kode_role === "bendahara_madrasah" &&
                      "Bendahara Madrasah") ||
                    (kode_role === "staff_madrasah" && "Staff Madrasah")}
                </span>
              </div>
              <div className="flex flex-col space-y-1 justify-start  mt-5 w-full">
                <p className="flex justify-start items-center text-sm text-gray-600">
                  <td>
                    <OutlinePersonIcon
                      className="h-4"
                      aria-hidden="true"
                      title="Lihat Detail"
                    />
                  </td>
                  <td>&nbsp; {nama}</td>
                </p>
                <p className="flex justify-start items-center text-sm text-gray-600">
                  <td>
                    <MailIcon
                      className="h-4"
                      aria-hidden="true"
                      title="Lihat Detail"
                    />
                  </td>
                  <td>&nbsp; {email}</td>
                </p>

                <p className="flex justify-start items-center text-sm text-gray-600">
                  <td>
                    <OutlineCogIcon
                      className="h-4"
                      aria-hidden="true"
                      title="Lihat Detail"
                    />
                  </td>
                  <td> &nbsp; {role}</td>
                </p>
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-start">
            <div className="p-5">
              <Button1
                label="Edit"
                onClick={() => route.push("/profil/edit")}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white m-2 mx-4 h-auto  rounded-sm shadow-md">
          <div className="justify-end mt-3 p-4">
            <p>Profil</p>
          </div>
          <hr className="my-3" />
          <div className="flex flex-row flex-wrap w-full m-0 p-4">
            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    Nama <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  <p className="  text-gray-600 text-sm ">{nama}</p>
                </div>
              </div>
            </div>
            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    NIK <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  <p className="  text-gray-600 text-sm ">{nik}</p>
                </div>
              </div>
            </div>
            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    Email <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  <p className="  text-gray-600 text-sm ">{email}</p>
                </div>
              </div>
            </div>
            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    Provinsi <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  {provinsi
                    ? provinsi.map(
                        (idz: any, key: any) =>
                          kode_provinsi === idz.kode && (
                            <p
                              key={idz.kode}
                              className=" text-gray-600 text-sm"
                            >
                              {idz.nama}
                            </p>
                          )
                      )
                    : ""}
                </div>
              </div>
            </div>
            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    Kabupaten <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  {kabupaten
                    ? kabupaten.map(
                        (idz: any, key: any) =>
                          kode_kabkota === idz.kode && (
                            <p
                              key={idz.kode}
                              className=" text-gray-600 text-sm"
                            >
                              {idz.nama}
                            </p>
                          )
                      )
                    : ""}
                </div>
              </div>
            </div>
            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    Kecamatan <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  <p className="  text-gray-600 text-sm ">{kode_kecamatan}</p>
                </div>
              </div>
            </div>

            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    Kelurahan <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  <p className="  text-gray-600 text-sm ">{desa_kelurahan}</p>
                </div>
              </div>
            </div>
            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    Rt <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  <p className="  text-gray-600 text-sm ">{rt}</p>
                </div>
              </div>
            </div>
            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    Rw <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  <p className="  text-gray-600 text-sm ">{rw}</p>
                </div>
              </div>
            </div>
            <div className="my-3 w-full md:w-full lg:w-full xl:w-1/2">
              <div className="flex mb-4">
                <div className="w-24">
                  <p className="  text-gray-600 text-xs font-semibold flex justify-between">
                    Alamat Jalan <span className="mr-2">:</span>{" "}
                  </p>
                </div>
                <div className="">
                  <p className="  text-gray-600 text-sm ">{alamat_jalan}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
