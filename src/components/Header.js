/* eslint-disable import/first */
import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import {
  // SearchIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
  SyncIcon,
  SpinnerIcon,
} from "../icons";
import {
  Alert,
  Badge,
  Dropdown,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";
import { Button1 } from ".";
import { useHistory } from "react-router-dom";
import * as paguDefinitifService from "../services/v2/realizationservice/pagudefinitif";
import * as rService from "../services/reference";
import * as kbService from "../services/v2/referenceservice/komponenbiaya";
import * as satuanService from "../services/v2/referenceservice/satuam";
import * as uService from "../services/users";
import * as rkService from "../services/v2/planningservice/rencanakegiatan";
import * as plService from "../services/v2/planningservice/index";
import * as kelompoksasaranService from "../services/v2/referenceservice/kelompoksasaran";
import * as realizationService from "../services/v2/realizationservice"
import * as pService from "../services/v2/planningservice/usulanservice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const getOnLineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;

const useNavigatorOnLine = () => {
  const [status, setStatus] = React.useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  React.useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return status;
};

function Header() {
  // const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const route = useHistory();

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isSinkronOpen, setIsSinkronOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isFail, setisFail] = useState(false);

  const isOnline = useNavigatorOnLine();
  const tahunTmp = 2021

  useEffect(() => {
    if (isOnline) {
    handleSinkron();
    }
  }, [isOnline]);

  const logOut = async () => {
    try {
      await uService.deletUser();
      localStorage.clear();
      route.push("/login");
    } catch {
      console.log("err");
    }
  };

  const handleSinkron = async () => {
    let tmpAuth = JSON.parse(localStorage.getItem("auth")) || "";
    let role = tmpAuth.group_role || "";
    try {
      setIsLoading(true);
      if (role === "madrasah") {
        await paguDefinitifService.browse({ activated: ["1"], tahun: [2021], groupRole: "madrasah" })
        await plService.saveOffline(null, "rencana-pendapatan", "offline");
        await plService.saveOffline(null, "rencana/kegiatan", "offline");
        await plService.saveOffline(
          null,
          "rencana-rincian-kegiatan",
          "offline",
          "rencana/rincian"
        );
        await rkService.postRencanaKegiatan(null);
        await pService.saveOffline(null, "usulankegiatan1", "offline");
        await pService.saveOffline(null, "usulanKomponen", "offline");
        await pService.saveOffline(null, "usulanSubKegiatan", "offline");
        await uService.getUser("madrasah");
        await uService.getRoleS("madrasah");
        await uService.getMadrasah();
        await rService.getReferensiKegiatan();
        await rService.getBank();
        await rService.getRekeningBelanja();
        await rService.getLokasi("kabkota");
        await rService.getLokasi("prov");
        await rService.getPenggunaanBos();
        await rService.getKegiatanBop();
        await rService.getSnp();
        await rService.getRef("kegiatan-snp", tahunTmp, "kegiatan-snp");
        await rService.getRef("kegiatan-snp", tahunTmp, "kegiatan-snp");
        await rService.getRef("jenis-belanja", tahunTmp, "jenis-belanja");
        await rService.getRef("kategori-belanja", tahunTmp, "kategori-belanja");
        await rService.getRef("jenis-belanja", tahunTmp, "kbiaya/jenis");
        await rService.getRef("pajak", tahunTmp, "kbiaya/pajak");
        await rService.getRef("rencana-rincian-kegiatan-dropdown", tahunTmp, "kbiaya/dropdown");
        await rService.getReferensiSumberDana();
        await plService.getPlanning("rencana-rincian-kegiatan", tahunTmp, "rencana/rincian");
        await plService.getPlanning("rencana-rekap-sumber-dana-belanja", tahunTmp, "rencana/rincian/rekapsumberdana");

        await plService.getPlanning(
          "rencana-pendapatan",
          tahunTmp,
          "rencana-pendapatan"
        );

        await pService.getUsulans("usulan", 1, "usulankegiatan1");
        await pService.getUsulans("usulan", 2, "usulanSubKegiatan");
        await pService.getUsulans("usulan", 3, "usulanKomponen");
      } else if (role === "kabkota") {
        await uService.getUser("madrasah");
        await uService.getRoleS("madrasah");
        await rService.getLokasi("kabkota");
        await uService.getRoleS("kabkota");
        await uService.getUser("kabkota");
        await rService.getRekeningBelanja();
        await rService.getReferensiKegiatan();
        await rService.getLokasi("kabkota");
        await rService.getLokasi("prov");

        await rService.getRef("kategori-belanja", tahunTmp, "kategori-belanja");
        await rService.getRef("jenis-belanja", tahunTmp, "jenis-belanja");
        await plService.getPlanning("rencana-tanggal", tahunTmp, "rencana-tanggal");
      } else if (role === "prov") {
        await uService.getUser("madrasah");
        await uService.getRoleS("madrasah");
        await rService.getLokasi("prov");
        await uService.getRoleS("prov");
        await uService.getUser("prov");
        await rService.getReferensiKegiatan();
        await rService.getLokasi("kabkota");
        await rService.getLokasi("prov");

        await rService.getRef("kategori-belanja", tahunTmp, "kategori-belanja");
        await rService.getRef("jenis-belanja", tahunTmp, "jenis-belanja");
      } else {
        await pService.getUsulans("usulan", 1, "usulankegiatan1");

        await rService.getKegiatanBop();
        await rService.getSnp();
        await rService.getBank();
        await rService.getRekeningBelanja();
        await rService.getReferensiKegiatan();
        await rService.getReferensiAlokasiCostBost();
        await rService.getReferensiSubKegiatan();
        await rService.getReferensiSumberDana();
        await rService.getRef("pagu-indikatif", tahunTmp, "pagu-indikatif");
        await rService.getLokasi("kabkota");
        await rService.getLokasi("prov");
        await rService.getRef("komponen-biaya", tahunTmp, "komponen-biaya");
        await uService.getRoleS("pusat");
        await uService.getUser("pusat");
        await uService.getUser("madrasah");
        await uService.getRoleS("madrasah");
        await uService.getRoleS("kabkota");
        await uService.getUser("kabkota");
        await uService.getRoleS("prov");
        await uService.getUser("prov");

        await rService.getRef("jenis-belanja", tahunTmp, "jenis-belanja");
        await rService.getRef("kategori-belanja", tahunTmp, "kategori-belanja");
        await rService.getRef("satuan", tahunTmp, "satuan");
      }
      await plService.getPlanning("rencana/kegiatan", tahunTmp, "rencana/kegiatan");
      await rService.getTahun();

      await rkService.getRencanaKegiatan();
      await rService.getSnp();
      await rService.getRef("penggunaan-bos", tahunTmp, "pbos");
      await rService.getRef("kegiatan-snp", tahunTmp, "kegiatan-snp");
      await rService.getRef("sub-kegiatan", tahunTmp, "sub-kegiatan");
      await kelompoksasaranService.getKelompokSasaran();
      await satuanService.getSatuan();
      await rService.getRef("kategori-belanja", tahunTmp, "komponenbiaya/jenis");
      await kbService.getKatKomBiaya();

      await rService.getReferensiKomponenBiaya();

      await uService.getMadrasah();
      await realizationService.paguDefinitifService.browse({ activated: ["1"], tahun: [tahunTmp] });
      await realizationService.pencairanPaguDefinitifService.browse({ activated: ["1"], tahun: [tahunTmp], groupRole: role });

      setisSuccess(true);
      setisFail(false);
      setIsLoading(false);
      setIsSinkronOpen(false);
    } catch (error) {
      setisSuccess(false);
      setisFail(true);
      setIsLoading(false);
      setIsSinkronOpen(false);
    }
  };

  const toProfile = () => {
    setIsProfileMenuOpen(false);
    route.push("/profil/akun");
  };
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleSinkronClick() {
    setIsSinkronOpen(!isSinkronOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  return (
    <header className="relative z-40 h-16 py-4 bg-blue-500 shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 md:px-2 mx-auto text-white dark:text-blue-500">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          {/* <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div> */}
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          {/* <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li> */}
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Notifikasi</span>
                <Badge type="danger">13</Badge>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Approval</span>
                <Badge type="danger">2</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert("Alerts!")}>
                <span>Aktivitas</span>
              </DropdownItem>
            </Dropdown>
          </li>
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleSinkronClick}
              aria-label="Sync Data"
              aria-haspopup="true"
            >
              <SyncIcon className="w-5 h-5" aria-hidden="true" />
            </button>

            <Dropdown
              align="right"
              isOpen={isSinkronOpen}
              onClose={() => setIsSinkronOpen(false)}
              className="z-50"
            >
              <DropdownItem tag="a" onClick={handleSinkron}>
                <span className="p-2">Sinkronisasi Data</span>
                {isLoading ? (
                  <SpinnerIcon className="w-10 h-10 m-0" aria-hidden="true" />
                ) : (
                  ""
                )}
              </DropdownItem>
            </Dropdown>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <OutlinePersonIcon className="w-6 h-6" aria-hidden="true" />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#" onClick={toProfile}>
                <OutlinePersonIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Profil</span>
              </DropdownItem>
              <DropdownItem tag="a" onClick={() => route.push("/profil/edit")}>
                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Pengaturan</span>
              </DropdownItem>
              <DropdownItem onClick={openModal}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Keluar</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Yakin Ingin Keluar?</ModalHeader>
        <ModalBody>
          Jika keluar, semua data yang tersimpan dilokal perangkat Anda akan
          otomatis hilang.
        </ModalBody>
        <ModalFooter>
          <Button1 label="Keluar" onClick={logOut} negative />
          <Button1 label="Tetap Di Aplikasi" onClick={closeModal} />
        </ModalFooter>
      </Modal>
      <div className="flex flex-col justify-center items-center font-semibold mt-4 absolute w-full bg-transparent xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md max-w-full z-10">
        {!isOnline ? <Alert type="warning">Anda sedang offline</Alert> : null}
        {isLoading ? (
          <Alert type="info">
            Sedang Sinkrosnisasi Data{" "}
            <FontAwesomeIcon className="ml-2" icon={faSync} spin size="sm" />
          </Alert>
        ) : null}
        {isSuccess ? (
          <Alert
            type="success"
            onClose={() => {
              setisSuccess(false);
            }}
          >
            Data Berhasil Tersinkronkan
          </Alert>
        ) : null}
        {isFail ? (
          <Alert
            type="danger"
            onClose={() => {
              setisFail(false);
            }}
          >
            Gagal sinkron, silahkan sinkron secara manual atau refresh halaman
          </Alert>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
