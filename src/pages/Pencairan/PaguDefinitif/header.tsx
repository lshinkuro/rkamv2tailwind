import React, { useState } from "react";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatRupiah, getBulan } from "../../../utils/helper";
import { Main } from "./style";


const Header: any = (passing: any) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [paguDefinitif, setPaguDefinitif] = useState<any[]>(JSON.parse
    (localStorage.getItem("pagu-definitif")!) || [])
  const [totalPagu, setTotalPagu] = useState<number>(paguDefinitif.reduce((a, b) => a + b.nilai_pagu, 0) || 0);
  const [totalRealisasi, setTotalRealisasi] = useState<number>(3000000);
  let data: any = passing?.passing;
  return (
    <div>
      <Main>
        <div className="bg-white  shadow-sm rounded-sm  flex flex-col">
          <div
            className="h-48 bg-white shadow-sm w-full rounded-sm cursor-pointer flex hover:bg-gray-100 transform hover:scale-y-105"
          >
            <div className="mt-5 flex-1 flex items-center pl-4 justify-between">
              <div className="w-2/6">
                <p>Sumber Pagu</p>
                <p>BOS / NON BOS</p>
              </div>
              <div className="w-2/6">
                <p>Total Pagu</p>
                <p>{formatRupiah(totalPagu)}</p>
              </div>
              <div className="w-2/6">
                <p>Total Realisasi</p>
                <p>{formatRupiah(totalRealisasi)}</p>
              </div>
              <div className="w-2/6">
                <p>Sisa</p>
                <p>{formatRupiah(totalPagu - totalRealisasi)}</p>
              </div>
            </div>
          </div>

        </div>
      </Main>
    </div>
  );
};

export default Header;
