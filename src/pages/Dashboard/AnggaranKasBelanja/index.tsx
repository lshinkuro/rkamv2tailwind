import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import ChartCard from "../../../components/Chart/ChartCard";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import ChartLegend from "../../../components/Chart/ChartLegend";
import {
  getPusat,
  drillDownProv,
  drillDownKab,
  drillDownMad,
} from "../../../services/v2/usermanservice/organisasiservice";

const drill: any[] = [];
// let isRampung = false

const AnggaranKasBelanja = () => {
  const [Data, setData] = useState<any>([]);
  const [isRampung, setIsRampung] = useState<any>(false);
  const getPusatData = async () => {
    const res = await getPusat();
    const arrPusat = res.data.return;
    arrPusat.forEach((val: any, i: number) => {
      drill[i] = val;
      getProvData(val.id, i);
    });
    setData(arrPusat);
    // setIsRampung(true);
  };
  const getProvData = async (pusat: string, i: number) => {
    const res = await drillDownProv(pusat);
    const arrProv = res.data.return;
    let tmp0: any = [];
    arrProv.forEach((val: any, j: number) => {
      tmp0.push(val);
      drill[i].prov = tmp0;
      getKabData(pusat, val.id, i, j);
    });
    // setIsRampung(true);
  };
  const getKabData = async (
    pusat: string,
    prov: string,
    i: number,
    j: number
  ) => {
    const payl = {
      pusat,
      prov,
    };
    const res = await drillDownKab(payl);
    const arrKab = res.data.return;
    let tmp0: any = [];
    arrKab.forEach((val: any, k: number) => {
      tmp0.push(val);
      drill[i].prov[j].kab = tmp0;
      getMadData(pusat, prov, val.id, i, j, k);
    });
    // setIsRampung(true);
  };
  const getMadData = async (
    pusat: string,
    prov: string,
    kab: string,
    i: number,
    j: number,
    k: number
  ) => {
    const payl = {
      pusat,
      prov,
      kab,
    };
    const res = await drillDownMad(payl);
    const arrMad = res.data.return;
    let tmp0: any = [];
    arrMad.forEach((val: any) => {
      tmp0.push(val);
      // drill[j][k][l][i] = val;
      drill[i].prov[j].kab[k].mad = tmp0;
    });
    setIsRampung(true);
  };
  const role = JSON.parse(localStorage.getItem("auth")!);

  useEffect(() => {
    if (role.group_role === "pusat") {
      getPusatData();
    }
  }, []);

  const lineLegends = [
    { title: "Organic", color: "bg-teal-600" },
    { title: "Paid", color: "bg-purple-600" },
  ];

  const lineOptions = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Organic",
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#0694a2",
          borderColor: "#0694a2",
          data: [43, 48, 40, 54, 67, 73, 70],
          fill: false,
        },
        {
          label: "Paid",
          fill: false,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#7e3af2",
          borderColor: "#7e3af2",
          data: [24, 50, 64, 74, 52, 51, 65],
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      },
    },
    legend: {
      display: false,
    },
  };
  console.log("data drill :", Data);

  if (role.group_role === "pusat") {
    return isRampung ? (
      <div className="grid grid-cols-3 gap-4">
        <div style={{ maxHeight: 650, overflowY: "scroll" }}>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <TableCell colSpan={4} className="font-semibold text-center">Drilldown</TableCell>
              </TableHeader>
              <TableBody>
                {!isRampung ? (
                  <div></div>
                ) : (
                  drill.map((el: any) => {
                    return (
                      <div key={el.id}>
                        <TableRow>
                          <TableCell colSpan={4} className="border-solid hover:bg-gray-200 w-full">
                            <span className="text-sm"> {el.nama}</span>
                          </TableCell>
                        </TableRow>
                        {!el.prov
                          ? null
                          : el.prov.map((el1: any) => {
                              return (
                                <div key={el1.id}>
                                  <TableRow>
                                    <TableCell className="bg-gray-400"></TableCell>
                                    <TableCell colSpan={3} className="border-solid hover:bg-gray-200 w-full">
                                      <span className="text-sm">
                                        {el1.nama}
                                      </span>
                                    </TableCell>
                                  </TableRow>
                                  {!el1.kab
                                    ? null
                                    : el1.kab.map((el2: any) => {
                                        return (
                                          <div key={el2.id}>
                                            <TableRow>
                                              <TableCell className="bg-gray-400"></TableCell>
                                              <TableCell className="bg-gray-400"></TableCell>
                                              <TableCell colSpan={2} className="border-solid hover:bg-gray-200 w-full">
                                                <span className="text-sm">
                                                  {el2.nama}
                                                </span>
                                              </TableCell>
                                            </TableRow>
                                            {!el2.mad
                                              ? null
                                              : el2.mad.map((el3: any) => {
                                                  return (
                                                    <div key={el3.id}>
                                                      <TableRow>
                                                        <TableCell className="bg-gray-400"></TableCell>
                                                        <TableCell className="bg-gray-400"></TableCell>
                                                        <TableCell className="bg-gray-400"></TableCell>
                                                        <TableCell className="border-solid hover:bg-gray-200 w-full">
                                                          <span className="text-sm">
                                                            {el3.nama}
                                                          </span>
                                                        </TableCell>
                                                      </TableRow>
                                                    </div>
                                                  );
                                                })}
                                          </div>
                                        );
                                      })}
                                </div>
                              );
                            })}
                      </div>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="col-span-2">
          <ChartCard title="Anggaran Kas Belanja">
            <Line {...lineOptions} />
            <ChartLegend legends={lineLegends} />
          </ChartCard>
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
};

export default AnggaranKasBelanja;
