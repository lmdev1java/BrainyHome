import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Tiempo = () => {
  const [miTiempo, setMiTiempo] = useState({});
  let user = sessionStorage.getItem("user");
  let fecha = new Date();
  let hora = fecha.getHours();
  let horasdehoy = 24 - hora;

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
            let horashoyApi =
              res.pronostico.hoy.temperatura.length + 1 - horasdehoy;
            /* setHorashoyApi(res.pronostico.hoy.temperatura.length - horasdehoy); */
            let horario = hora;
            for (
              let i = horashoyApi;
              i < res.pronostico.hoy.temperatura.length;
              i++
            ) {
              horario++;
              tiempodehoy.push({
                hora: horario,
                t: res.pronostico.hoy.temperatura[i],
                h: res.pronostico.hoy.humedad_relativa[i],
              });
              horas.push(horario);
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
          {/* <h1>Tiempo actual</h1> */}
          <h2>
            <em>{miTiempo.municipio.NOMBRE}</em>
          </h2>
          <h3>
            <em>({miTiempo.municipio.NOMBRE_PROVINCIA})</em>
          </h3>
          <div id="🌤">
            <h2>Temperatura: {miTiempo.temperatura_actual}ºC</h2>
            <h2>Humedad: {miTiempo.humedad}%</h2>
          </div>
        </div>

        {/* <p>Máxima: {miTiempo.temperaturas.max}ºC</p> 
      <p>Mínima: {miTiempo.temperaturas.min}ºC</p> */}
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
            title: { text: "hoy", display: true },
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

export default Tiempo;
