import React, { useEffect, useState } from "react";

import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";

const Dashboard = () => {
  
  const doughnutLegends = [
    { title: "Shirts", color: "bg-blue-500" },
    { title: "Shoes", color: "bg-teal-600" },
    { title: "Bags", color: "bg-purple-600" },
  ];
  const lineLegends = [
    { title: "Organic", color: "bg-teal-600" },
    { title: "Paid", color: "bg-purple-600" },
  ];
  const barLegends = [
    { title: "Shoes", color: "bg-teal-600" },
    { title: "Bags", color: "bg-purple-600" },
  ];
  const doughnutOptions = {
    data: {
      datasets: [
        {
          data: [33, 33, 33],
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
          label: "Dataset 1",
        },
      ],
      labels: ["Shoes", "Shirts", "Bags"],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };
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
  const barOptions = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Shoes",
          backgroundColor: "#0694a2",
          // borderColor: window.chartColors.red,
          borderWidth: 1,
          data: [-3, 14, 52, 74, 33, 90, 70],
        },
        {
          label: "Bags",
          backgroundColor: "#7e3af2",
          // borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [66, 33, 43, 12, 54, 62, 84],
        },
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  };

  return (
    <div className="px-6">
      <PageTitle>Dashboard</PageTitle>

      <PageTitle>Pendapatan Dan Kegiatan</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Pendapatan Dan Kegiatan">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
        <ChartCard title="Pendapatan">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Anggaran Kas Belanja">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;
