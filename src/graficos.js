import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

const Graficos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetch("/devices")
      .then((res) => res.json())
      .then((res) => {
        console.log({ mensaje: "consumo unitario", res });
        setAllData(res);
        setIsLoading(false);
      });
  }, []);

  /*  let nombres = [];
  let gastos = [];
  let newGastos = [];
  let setsData = []; */
  let numTotal1 = Math.floor(Math.random()*(255-0))+0
  let numTotal2 = Math.floor(Math.random()*(255-0))+0
  let numTotal3 = Math.floor(Math.random()*(255-0))+0
  let datosTotal = [
    {
      label: "gasto total diario",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      backgroundColor: [`rgba(${numTotal1},${numTotal2},${numTotal3}, 1)`],
      borderWidth: 3,
    },
  ];

  const lista = allData.map((lista) => {
    /* nombres.push(lista.nombre);
    gastos.push(lista.deviceData.record); */
    let gastoTotal = [];
    for (let i = 0; i < lista.deviceData.record.length; i++) {
      gastoTotal.push(lista.deviceData.record[i].total);
    }
    for (let i = 0; i < gastoTotal.length; i++) {
      datosTotal[0].data[i] += gastoTotal[i]
    }

    let num1 = Math.floor(Math.random() * (255 - 0)) + 0;
    let num2 = Math.floor(Math.random() * (255 - 0)) + 0;
    let num3 = Math.floor(Math.random() * (255 - 0)) + 0;

    datosTotal.push({
      label: lista.nombre,
      data: gastoTotal,
      backgroundColor: [`rgba(${num1},${num2},${num3}, 1)`],
      borderWidth: 3,
    });

    return (
      <div id="🔑" className="graficos">
        <h3>{lista.nombre}</h3>
        {/* <h4>{lista.deviceData.type}</h4> */}
        <div>
          <Grafico gasto={lista.deviceData.record} isLoading={isLoading} />
        </div>
      </div>
    );
  });

  // estos dos FOR son para generar cada objeto del array "datasets" en GraficoTotal

  /*  for (let i = 0; i < gastos.length; i++) {
    newGastos.push(gastos[i]);
    console.log({ mensaje: "esto", data: gastos[i] });
  }
  console.log(newGastos);

  for (let i = 0; i < nombres.length; i++) {
    setsData.push({
      label: nombres[i],
      data: newGastos[i].total,
      backgroundColor: ["rgba(212,154,78,1)"],
      borderWidth: 3,
    });
  } */

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <div id="🔑" className="graficos">
          <h2>Gasto conjunto de tus electrodomésticos (W/día)</h2>
          <GraficoTotal
            datosTotal={datosTotal}
            isLoading={isLoading}
            style={{ height: 700 }}
          />
        </div>
        <div>{lista}</div>
      </div>
    );
  }
};

const Grafico = ({ gasto, isLoading }) => {
  let newGasto = [];
  for (let i = 0; i < gasto.length; i++) {
    newGasto.push(gasto[i].total);
  }

  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25,
      ],
      datasets: [
        {
          label: "consumo total (W/día)",
          data: newGasto /* gasto */ /* [1,6465,12654,31,654,1,66,131,6,1,3136,61,31,3513,51] */,
          backgroundColor: ["rgba(212,154,78,1)"],
          borderWidth: 3,
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, [gasto]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <div id="📉">
        <Bar
          data={chartData}
          option={{
            responsive: true,
            title: { text: "prueba grafica", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
};

const GraficoTotal = ({ datosTotal, isLoading }) => {
  const [chartData, setChartData] = useState({});
  console.log({ mensaje: "setsdata", data: datosTotal });
  const chart = () => {
    setChartData({
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25,
      ],
      datasets: datosTotal,
    });
  };
  useEffect(() => {
    chart();
  }, [datosTotal]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  } else {
    return (
      <div id="📉">
        <Line
          data={chartData}
          option={{
            responsive: true,
            title: { text: "prueba grafica", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
};

export default Graficos;
