import React, { useContext, useEffect, useState } from "react";
import {
  admin_pusat,
  admin_provinsi,
  admin_kabkota,
  kepala_madrasah,
  bendahara_madrasah,
  staff_madrasah,
  super_admin_pusat,
  pengarah_pusat,
  penanggung_jawab_umum_pusat,
  penanggung_jawab_teknis_pusat,
  pembuat_kebijakan_pusat,
  auditor_pusat,
  auditor_pusat_external,
  pengarah_provinsi,
  penanggung_jawab_umum_provinsi,
  penanggung_jawab_teknis_provinsi,
  pembuat_kebijakan_provinsi,
  auditor_provinsi,
  auditor_provinsi_external,
  pengarah_kabkota,
  auditor_kabkota_external,
  penanggung_jawab_umum_kabkota,
  penanggung_jawab_teknis_kabkota,
  pembuat_kebijakan_kabkota,
  auditor_kabkota,
} from "../../routes/sidebar";
import { NavLink, Route, useHistory } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import eRKAMlogo from "../../assets/img/erkam_putih.png";
import * as profileservice from "../../services/v2/usermanservice/profileservice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { SidebarContext } from "../../context/SidebarContext";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  const [slide, setSlide] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let navbar = document.getElementById("navbar-div");
    navbar.addEventListener("scroll", handleScroll);

    return () => {
      let navbar = document.getElementById("navbar-div");
      navbar.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let navbar = document.getElementById("navbar-div");
    const currentScrollY = navbar.scrollY;

    if (currentScrollY > lastScrollY) {
      setSlide("-48px");
    } else {
      setSlide("0px");
    }
    setLastScrollY(currentScrollY);
  };

  const route = useHistory();
  const [routes, setroutes] = useState([]);
  const [dataUser, setdataUser] = React.useState([]);
  const [role_code, setdataRole] = React.useState("");

  const getProfile = async () => {
    const myProfile = await profileservice.getMyProfile();
    setdataUser(myProfile.data.return);
    setdataRole(myProfile.data.return.role.nama);
    console.log("data profile", myProfile);
  };
  React.useEffect(() => {
    getProfile();
  }, [localStorage.getItem("profile")]);

  let nama = dataUser.profile?.nama;
  let kode_role = dataUser?.role?.nama;

  // const [kodeRole, setKodeRole] = useState<any>("")
  // const [kodeRole, setKodeRole] = React.useState<any>("");
  const getToken = async () => {
    return await localStorage.getItem("auth");
  };

  useEffect(() => {
    getToken()
      .then((res) => {
        const data = JSON.parse(res);
        const role = data.kode_role;
        if (role === "admin_pusat") {
          setroutes(admin_pusat);
        } else if (role === "super_admin_pusat") {
          setroutes(super_admin_pusat);
        } else if (role === "pengarah_pusat") {
          setroutes(pengarah_pusat);
        } else if (role === "penanggung_jawab_umum_pusat") {
          setroutes(penanggung_jawab_umum_pusat);
        } else if (role === "penanggung_jawab_teknis_pusat") {
          setroutes(penanggung_jawab_teknis_pusat);
        } else if (role === "pembuat_kebijakan_pusat") {
          setroutes(pembuat_kebijakan_pusat);
        } else if (role === "auditor_pusat") {
          setroutes(auditor_pusat);
        } else if (role === "auditor_pusat_external") {
          setroutes(auditor_pusat_external);
        } else if (role === "admin_provinsi") {
          setroutes(admin_provinsi);
        } else if (role === "pengarah_provinsi") {
          setroutes(pengarah_provinsi);
        } else if (role === "penanggung_jawab_umum_provinsi") {
          setroutes(penanggung_jawab_umum_provinsi);
        } else if (role === "penanggung_jawab_teknis_provinsi") {
          setroutes(penanggung_jawab_teknis_provinsi);
        } else if (role === "pembuat_kebijakan_provinsi") {
          setroutes(pembuat_kebijakan_provinsi);
        } else if (role === "auditor_provinsi") {
          setroutes(auditor_provinsi);
        } else if (role === "auditor_provinsi_external") {
          setroutes(auditor_provinsi_external);
        } else if (role === "admin_kabkota") {
          setroutes(admin_kabkota);
        } else if (role === "pengarah_kabkota") {
          setroutes(pengarah_kabkota);
        } else if (role === "auditor_kabkota_external") {
          setroutes(auditor_kabkota_external);
        } else if (role === "penanggung_jawab_umum_kabkota") {
          setroutes(penanggung_jawab_umum_kabkota);
        } else if (role === "penanggung_jawab_teknis_kabkota") {
          setroutes(penanggung_jawab_teknis_kabkota);
        } else if (role === "pembuat_kebijakan_kabkota") {
          setroutes(pembuat_kebijakan_kabkota);
        } else if (role === "auditor_kabkota") {
          setroutes(auditor_kabkota);
        } else if (role === "kepala_madrasah") {
          setroutes(kepala_madrasah);
        } else if (role === "bendahara_madrasah") {
          setroutes(bendahara_madrasah);
        } else if (role === "staf_madrasah") {
          setroutes(staff_madrasah);
        }
      })
      .catch((err) => {
        route.push("/login");
      });
  }, []);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  return (
    <div className="z-60 overflow-y-hidden  p-0 m-0  text-gray-800 dark:text-gray-400" show={isSidebarOpen}>
      <div className="absolute w-64  pb-2 pt-0 pr-0 pl-0 z-50 bg-white">
        <img
          aria-hidden="true"
          className="w-full px-4 h-16 m-0 bg-blue-500"
          src={eRKAMlogo}
          alt="Office"
          onClick={closeSidebar}
        />
        <div className="px-6 mt-4">
          <div className="text-sm  text-gray-600">
            <FontAwesomeIcon icon={faUser} size="md" color="#2ca2ce"  />
            <span className="ml-4 text-md">{nama}</span>
          </div>
          <div className="text-sm my-2 text-gray-600">
            <FontAwesomeIcon icon={faAddressCard} size="md" color="#2ca2ce" />
            <span className="ml-4 text-md">{role_code}</span>
          </div>
        </div>
      </div>
      <div className="h-32" />
      <div className="mt-5 " id="navbar-div">
        <ul className="mt-3 ">
          {routes.map((route) =>
            route.routes ? (
              <SidebarSubmenu route={route} key={route.name} />
            ) : (
              <li className="relative px-6 py-3" key={route.name}>
                <NavLink
                  exact
                  to={route.path}
                  className="inline-flex items-center w-full text-md  transition-colors duration-150 hover:text-gray-900 dark:hover:text-gray-200"
                  activeClassName="text-gray-900 dark:text-gray-100"
                >
                  <Route path={route.path} exact={route.exact}>
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-yellow-300 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  </Route>
                  <Icon
                    stroke="#2ca2ce"
                    fill="none"
                    className="w-5 h-5  text-green-600"
                    aria-hidden="true"
                    icon={route.icon}
                  />
                  <span className="ml-4 text-md text-gray-600">{route.name}</span>
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default SidebarContent;
