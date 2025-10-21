import { axiosInstance } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function LineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get("plan-cuentas/estadisticas/saldos");
      setData(res.data);
    };

    fetch();
  }, []);

  console.log("data: ", data);

  const chartData = {
    labels: data.map((c) => c.label),
    datasets: [
      {
        label: "Saldos",
        data: data.map((c) => c.data),
        backgroundColor: "rgba(144, 144, 144, 0.8)", // azul transparente
        borderColor: "rgba(0 , 0, 0, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10000 },
      },
    },
    backgroundColor: "red",
  };

  return (
    <>
      <Bar data={chartData} options={options} width="" />
    </>
  );
}

export default LineChart;
