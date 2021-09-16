import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const Home = ({ logged }) => {
  const [datos, setDatos] = useState([]);
  const [config, setConfig] = useState([]);
  const [saved, setSaved] = useState(true);

  useEffect(function () {
    fetch("/devices")
      .then((res) => res.json())
      .then((res) => {
        console.log({ mensaje: "hola", res });
        setDatos(res);
      });
  }, []);
  useEffect(function () {
    fetch("/userconfig")
      .then((res) => res.json())
      .then((res) => {
        console.log({ mensaje: "hola config", res });
        setConfig(res);
      });
  }, []);
  useEffect(() => {
    if (datos === config) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [setConfig]);

  const onOff = (casa) => {
    let cambiarDatos = [];

    if (casa.deviceData.mode === "off") {
      casa.deviceData.mode = "on";
    } else {
      casa.deviceData.mode = "off";
    }
    fetch("/devices", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(casa),
    });
    for (let i = 0; i < datos.length; i++) {
      if (casa.netCode == datos[i].netCode) {
        cambiarDatos.push(casa);
      } else {
        cambiarDatos.push(datos[i]);
      }
    }
    setConfig(cambiarDatos);
    setSaved(false);
    reload();
  };

  let configHome = [];
  const mostrarCasa = datos.map((casa) => {
    configHome.push(casa);
    return (
      <div id="card" style={{backgroundColor:"rgb(255, 255,255)"}}>
        <img id="📌" src={casa.deviceData.logo} alt="logo" />
        <div /* id="container" */>
          <h3 id="name">{casa.nombre}</h3>
          {/* <h3>
            Código del dispositivo: <em>{casa.netCode}</em>
          </h3> */}
          {/* <h3>
          Tipo del dispositivo: <em>{casa.deviceData.type}</em>
        </h3> */}
          {/* <h6>
          Gasto mínimo:{" "}
          <em>
            {casa.deviceData.intake.min} {casa.deviceData.intake.unit}
          </em>
        </h6> */}
          <h6>
            Consumo:{" "}
            <em>
              {casa.deviceData.intake.max} {casa.deviceData.intake.unit}
            </em>
          </h6>
          <Boton casa={casa} onOff={onOff} />
          <button id="delete" onClick={() => desconectar(casa)}>Eliminar</button>
        </div>
      </div>
    );
  });

  const reload = () => {
    fetch("/devices")
      .then((res) => res.json())
      .then((res) => {
        console.log({ mensaje: "hola", res });
        setDatos(res);
      });
  };
  const desconectar = (casa) => {
    fetch("/devices", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(casa),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    fetch("/codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(casa),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    reload();
  };

  if (logged) {
    return (
      <div>
        {/* <h4>
          ¿Te gusta esta configuración para tu BrainyHome?{" "}
          <GuardarConfig
            saved={saved}
            setSaved={setSaved}
            config={config}
            reload={reload}
          />
        </h4> */}
        <div id="🏠">{mostrarCasa}</div>
      </div>
    );
  } else {
    <Redirect to="/" />;
  }
};

const Boton = ({ casa, onOff }) => {
  if (casa.deviceData.mode === "off") {
    if (casa.deviceData.type === "garage door") {
      return (
        <h6>
          <strong>
            <em style={{ color: "black", backgroundColor: "grey" }}>Cerrado</em>
          </strong>
          <button className="allButtons" id="on" onClick={() => onOff(casa)}><strong>Abrir</strong></button>
        </h6>
      );
    } else if (casa.deviceData.type === "louver") {
      return (
        <h6>
          <strong>
            <em style={{ color: "black", backgroundColor: "grey" }}>Bajado</em>
          </strong>
          <button className="allButtons" id="on" onClick={() => onOff(casa)}><strong>Subir</strong></button>
        </h6>
      );
    } else if (casa.deviceData.type === "light") {
      return (
        <>
          <input type="range" />
          <h6>
            <strong>
              <em style={{ color: "black", backgroundColor: "grey" }}>
                Apagado
              </em>
            </strong>
            <button className="allButtons" id="on" onClick={() => onOff(casa)}><strong>Encender</strong></button>
          </h6>
        </>
      );
    } else if (casa.deviceData.type === "sprinkle") {
      return (
        <>
          <input type="range" />
          <h6>
            <strong>
              <em style={{ color: "black", backgroundColor: "grey" }}>
                Apagado
              </em>
            </strong>
            <button className="allButtons" id="on" onClick={() => onOff(casa)}><strong>Encender</strong></button>
          </h6>
        </>
      );
    } else {
      return (
        <h6>
          <strong>
            <em style={{ color: "black", backgroundColor: "grey" }}>Apagado</em>
          </strong>
          <button className="allButtons" id="on" onClick={() => onOff(casa)}><strong>Encender</strong></button>
        </h6>
      );
    }
  } else {
    if (casa.deviceData.type === "garage door") {
      return (
        <h6>
          <strong>
            <em style={{ color: "black", backgroundColor: "springgreen" }}>
              Abierto
            </em>
          </strong>
          <button className="allButtons" id="off" onClick={() => onOff(casa)}><strong>Cerrar</strong></button>
        </h6>
      );
    } else if (casa.deviceData.type === "louver") {
      return (
        <h6>
          <strong>
            <em style={{ color: "black", backgroundColor: "springgreen" }}>
              Subido
            </em>
          </strong>
          <button className="allButtons" id="off" onClick={() => onOff(casa)}><strong>Bajar</strong></button>
        </h6>
      );
    } else if (casa.deviceData.type === "light") {
      return (
        <>
          <input type="range" />
          <h6>
            <strong>
              <em style={{ color: "black", backgroundColor: "springgreen" }}>
                Encendido
              </em>
            </strong>
            <button className="allButtons" id="off" onClick={() => onOff(casa)}><strong>Apagar</strong></button>
          </h6>
        </>
      );
    } else if (casa.deviceData.type === "sprinkle") {
      return (
        <>
          <input type="range" />
          <h6>
            <strong>
              <em style={{ color: "black", backgroundColor: "springgreen" }}>
                Encendido
              </em>
            </strong>
            <button className="allButtons" id="off" onClick={() => onOff(casa)}><strong>Apagar</strong></button>
          </h6>
        </>
      );
    } else {
      return (
        <h6>
          <strong>
            <em style={{ color: "black", backgroundColor: "springgreen" }}>
              Encendido
            </em>
          </strong>
          <button className="allButtons" id="off" onClick={() => onOff(casa)}><strong>Apagar</strong></button>
        </h6>
      );
    }
  }
};

const GuardarConfig = ({ datos, setSaved, config, reload }) => {
  const guardado = (config) => {
    console.log(config);

    fetch("/userconfig", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ mensaje: "res", res });
      });
    /* fetch("/userconfig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ msg: "a ver", res });
      }); */
    for (let i = 0; i < config.length; i++) {
      console.log(config[i]);
      fetch("/userconfig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config[i]),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    }
    reload();
  };
  if (datos == config) {
    return (
      <button id="saved" className="🎨">
        Guardado
      </button>
    );
  } else {
    return (
      <button id="tosave" className="🎨" onClick={() => guardado(config)}>
        Guardar
      </button>
    );
  }
};

export default Home;
