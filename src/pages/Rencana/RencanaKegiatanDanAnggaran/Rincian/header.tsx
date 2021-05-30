import React, { useState } from "react";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBulan } from "../../../../utils/helper";
import { Main} from "./List/style";
const Header: any = (passing: any) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  let data: any = passing?.passing;
  return (
    <div>
      <Main>
        <div className="bg-white  shadow-sm rounded-sm  flex flex-col">
          <div
            className="h-48 bg-white shadow-sm w-full rounded-sm cursor-pointer flex hover:bg-gray-100 transform hover:scale-y-105"
            onClick={() => setIsExpand(!isExpand)}
          >
            <div className="w-10 h-full flex items-center justify-center text-gray-500">
              {!isExpand ? (
                <FontAwesomeIcon icon={faAngleRight} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} size="lg" />
              )}
            </div>
            <div className="mt-5 flex-1 flex items-center pl-4 justify-between">
              <div className="w-2/6">
                <p>Standar Nasional</p>
                <p>{data?.nama_snp || ""}</p>
              </div>
              <div className="w-2/6">
                <p>Kegiatan</p>
                <p>{data?.nama_kegiatan || ""}</p>
              </div>
              <div className="w-2/6">
                <p>Sub Kegiatan</p>
                <p>{data?.nama_sub_kegiatan || ""}</p>
              </div>
            </div>
          </div>
          {isExpand ? (
            <div className="my-4 mx-4 h-auto bg-white  cursor-pointer">
              <div className=" flex flex-col md:flex-row ">
                <div className="mt-5 flex-1 flex justify-between">
                  <div className="w-1/4">
                    <p>Pelaksanaan</p>
                    <p>
                      {getBulan(data?.bulan_pelaksanaan_start)} s/d{" "}
                      {getBulan(data?.bulan_pelaksanaan_end)}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex-1 flex justify-between">
                  <div className="w-1/4">
                    <p>sasaran</p>
                    <p>{ data ? data?.kelompok_sasaran.join(",") : "" }</p>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col md:flex-row ">
                <div className="mt-5 flex-1 flex justify-between">
                  <div className="w-1/4">
                    <p>Indikator Output</p>
                    <p>{data?.indikator_output}</p>
                  </div>
                </div>
                <div className="mt-5 flex-1 flex justify-between">
                  <div className="w-1/4">
                    <p>Indikator Hasil</p>
                    <p>{data?.indikator_hasil}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Main>
    </div>
  );
};

export default Header;
