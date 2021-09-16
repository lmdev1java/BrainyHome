import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Grafico = () => {
  const [chartData, setChartData] = useState({});
  /* const [todo, setTodo] = useState([]); */
  const [diasT, setDiasT] = useState([]);
  /* const [gasto, setGasto] = useState([]); */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let dias = [];
    fetch("/devices")
      .then((res) => res.json())
      .then((res) => {
        console.log({ mensaje: "gasto", res });

        /* contar los días y recibir datos */
        for (let i = 1; i <= res[0].deviceData.record.length; i++) {
          dias.push(i);
        }
        /* gastos de cada dispositivo por día */
        /* for (let i = 0; i < res.length; i++) {
          arrays.push(res[i].deviceData.record);
        }
        console.log({ mensaje: "arrays", arrays }); */
        /* sumar gastos totales */
        /* let i;
        for (i = 0; i < arrays.length; i++) {
          i =
          for (let j = 0; j < arrays[i].length; i++) {
            arraysGasto.push(arrays[i][j]);
          }
        } */
        /* console.log(arraysGasto); */
        setDiasT(dias);
        console.log({ mensaje: "dias  ", dias });

        setIsLoading(false);
      });
  }, []);

  const chart = (diasT) => {
    setChartData({
      /* [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25] */
      labels: diasT,
      datasets: [
        {
          label: "Tu consumo diario este mes (KW/h)",
          data: [
            3400, 6541, 3165, 6446, 6561, 4501, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1033, 6413, 6431, 6789, 6458, 3123,
          ],
          backgroundColor: ["rgba(206, 49, 49, 0.712)"],
          borderWidth: 4,
        },
      ],
    });
  };
  useEffect(() => {
    if (!isLoading) {
      chart(diasT);
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
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

export default Grafico;
