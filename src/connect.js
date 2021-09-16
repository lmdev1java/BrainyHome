import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

const Connect = ({ logged }) => {
  const [dispositivos, setDispositivos] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    fetch("/codes")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setDispositivos(res);
      });
  }, []);

  const refresh = () => {
    fetch("/codes")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setDispositivos(res);
      });
  };
  const anyadirHome = (disp, nombre) => {
    if (disp.deviceData.type === " louver") {
      disp.deviceData.logo =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzd0Iq7M2Dmf3Iey8LygBbF3Pnffwab50DouwpcLUjgMqy8-YJujSXtqbtlYxOt45sHqU&usqp=CAU";
    } else if (disp.deviceData.type === "light") {
      disp.deviceData.logo =
        "https://png.pngtree.com/png-vector/20190626/ourlarge/pngtree-bulb-logo-and-symbol-vector-ilustration-template-png-image_1513836.jpg";
    } else if (disp.deviceData.type === "sprinkle") {
      disp.deviceData.logo =
        "https://static.vecteezy.com/system/resources/thumbnails/002/698/000/small/irrigation-watering-crops-line-icon-for-web-vector.jpg";
    } else if (disp.deviceData.type === "electric underfloor heating") {
      disp.deviceData.logo =
        "https://st4.depositphotos.com/19232680/25102/v/450/depositphotos_251022014-stock-illustration-floor-heater-scheme-icon-flat.jpg";
    } else if (disp.deviceData.type === "garage door") {
      disp.deviceData.logo =
        "https://www.pngitem.com/pimgs/m/466-4663991_garage-garage-icon-png-transparent-png.png";
    } else if (disp.deviceData.type === "computer") {
      disp.deviceData.logo =
        "https://media.istockphoto.com/vectors/pc-icon-vector-sign-and-symbol-isolated-on-white-background-pc-logo-vector-id1029042002?k=6&m=1029042002&s=170667a&w=0&h=HoayMqzc4Vtsw9KmL6x_sLzrzrypaNjVP1mMtdQmMoI=";
    } else {
      disp.deviceData.logo =
        "https://images.emojiterra.com/mozilla/512px/2753.png";
    }

    fetch("/devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ disp, nombre }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    fetch("/codes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(disp),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    refresh();
  };

  const mapear = dispositivos.map((disp) => {
    return (
      <div id="card">
        <br />
        <h3>
          Código:
          <h5>
            <em>{disp.netCode}</em>
          </h5>
        </h3>

        <h3>
          Tipo:{" "}
          <h5>
            <em>{disp.deviceData.type}</em>
          </h5>
        </h3>
        <h6>
          Gasto mínimo: <em>{disp.deviceData.intake.min} W</em>
        </h6>
        <h6>
          Gasto máximo: <em>{disp.deviceData.intake.max} W</em>
        </h6>
        <h6>Asigna un nombre al dispositivo antes de añadirlo</h6>
        <input
          type="text"
          placeholder="ej: luz salon"
          onChange={(e) => setNombre(e.target.value)}
        />
        {/* <h6>
          Modo:
          <strong>
            <em>{disp.deviceData.mode}</em>
          </strong>
        </h6> */}
        <div>
          <Link to="/conectar">
            <button className="allButtons" onClick={() => anyadirHome(disp, nombre)}>+</button>
          </Link>
        </div>
      </div>
    );
  });

  if (logged) {
    return <div id="🏠">{mapear}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default Connect;
