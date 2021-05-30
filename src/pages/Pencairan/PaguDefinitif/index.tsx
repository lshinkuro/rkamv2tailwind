import React from "react";
import { BreadCrumb } from "../../../components";
import "react-data-table-component-extensions/dist/index.css";
import Headers from "./header";
import PaguDefinitifList from "./list";

function PaguDefinitif() {
  const item = ["Home", "Pencairan", "Pagu Definitif", "List"];
  const groupRole = JSON.parse(localStorage.getItem("auth")!).group_role || "";

  return (
    <>
      <BreadCrumb data={item} title="Pagu Definitif " />
      {groupRole !== "pusat" ? <Headers /> : null}
      <PaguDefinitifList />
    </>
  );
}

export default PaguDefinitif;
