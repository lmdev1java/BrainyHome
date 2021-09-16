import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const TiempoGeneral = () => {
  const [miTiempo, setMiTiempo] = useState({});
  let user = sessionStorage.getItem("user");
  /* let fecha = new Date(); */ //CON ESTAS 3 PODEMOS MOSTRAR LA FECHA
  /* let hora = fecha.getHours(); */
  /* let horasdehoy = 24 - hora; */

  const [tiempoGuardado, setTiempoGuardado] = useState([]);
  const [horas, setHoras] = useState([]);
  const [temperatura, setTemperatura] = useState([]);
  const [humedad, setHumedad] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let tiempodehoy = [];
    let horas = [];
    let temperatura = [];
    let humedad = [];
    fetch("/myuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((res) => {
        let pr = res[0].provincia;
        let lc = res[0].localidad;
        fetch(
          `https://www.el-tiempo.net/api/json/v2/provincias/${pr}/municipios/${lc}`
        )
          .then((res) => res.json())
          .then((res) => {
            console.log({ mensaje: "tu tiempo", res });
            setMiTiempo(res);
            for (let i = 0; i < res.pronostico.manana.temperatura.length; i++) {
              horas.push(i);
              temperatura.push(res.pronostico.manana.temperatura[i]);
              humedad.push(res.pronostico.manana.humedad_relativa[i]);
            }

            for (let i = 0; i < res.pronostico.manana.temperatura.length; i++) {
              tiempodehoy.push({
                hora: i,
                t: res.pronostico.manana.temperatura[i],
                h: res.pronostico.manana.humedad_relativa[i],
              });
              temperatura.push(res.pronostico.hoy.temperatura[i]);
              humedad.push(res.pronostico.hoy.humedad_relativa[i]);
            }
            console.log({ pr, lc });
            console.log({ msg: "tª de hoy", tiempodehoy });
            console.log("hey");
            setTiempoGuardado(tiempodehoy);
            console.log(tiempodehoy);
            setHoras(horas);
            setTemperatura(temperatura);
            setHumedad(humedad);
            console.log("horas:  " + horas);
            console.log("temperaturas:  " + temperatura);
            console.log("humedad:  " + humedad);
            setIsLoading(false);
          });
      });
  }, []);

  const arrayThoy = tiempoGuardado.map((horas) => {
    return (
      <li>
        <h4>
          {horas.hora}:00{" "}
          <div id="datos">
            <em>
              <h5 id="temperatura">{horas.t}ºC</h5>
              <h5 id="humedad">{horas.h}%</h5>
            </em>
          </div>
        </h4>
      </li>
    );
  });
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="🔑">
        <div>
          <h1>Previsión para mañana:</h1>
          <div id="🌤">
            <h2>
              Tª Máxima: {miTiempo.proximos_dias[0].temperatura.maxima}ºC{" "}
            </h2>
            <h2>Tª Mínima: {miTiempo.proximos_dias[0].temperatura.minima}ºC</h2>
            <h2>
              Humedad: {miTiempo.proximos_dias[0].humedad_relativa.maxima}% -{" "}
              {miTiempo.proximos_dias[0].humedad_relativa.minima}%
            </h2>
          </div>
        </div>

        <h3>Previsión para hoy:</h3>
        <Grafico
          horas={horas}
          temperatura={temperatura}
          humedad={humedad}
          isLoading={isLoading}
        />
        <ul>{arrayThoy}</ul>
      </div>
    );
  }
};

const Grafico = ({ horas, temperatura, humedad, isLoading }) => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: horas,
      datasets: [
        {
          label: "temperatura",
          data: temperatura,
          backgroundColor: ["rgba(240, 178, 98, 1)"],
          borderWidth: 4,
        },
        {
          label: "humedad",
          data: humedad,
          backgroundColor: ["rgba(0, 255, 255, 1)"],
          borderWidth: 3,
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, [horas, temperatura, humedad]);

  if (isLoading) {
    return <div>Loading..</div>;
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

export default TiempoGeneral;
