//API_KEY TIEMPO
// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob3JtaWdhaHVtYW5hQGdtYWlsLmNvbSIsImp0aSI6IjkyOWIxYTkwLTcxNGEtNGVlNS1hN2MyLTBkNDBhMzY1MTVkMyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjI0MjkxOTE4LCJ1c2VySWQiOiI5MjliMWE5MC03MTRhLTRlZTUtYTdjMi0wZDQwYTM2NTE1ZDMiLCJyb2xlIjoiIn0.jomo4TG6re4QNEtJFK15O76I5gLOlP6WXL-ttz_HtCw

import { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";

import LogoBH from "./imgs/Logo.png";
import nameBH from "./imgs/Nombre web.png";


const SignUp = ({ logged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombreUsuario] = useState("");
  const [prov, setProv] = useState("01");
  const [localidad, setLocalidad] = useState("01001");

  const signup = (email, password, nombre, prov, localidad) => {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        nombre,
        provincia: prov,
        localidad,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  const elegirProv = (e) => {
    setProv(e);
    console.log(e);
  };

  if (logged) {
    return <Redirect to="/" />;
  } else {
    return (
      <div id="🔑">
        <img src={LogoBH} alt="logo BrainyHome" />
        <img src={nameBH} alt="logo nombre BrainyHome" />
        <h3>Rellena los campos</h3>
        <input
          type="email"
          placeholder=" email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder=" contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder=" nombre"
          onChange={(e) => setNombreUsuario(e.target.value)}
        />
        <Provincia elegirProv={elegirProv} />
        <Localidad prov={prov} setLocalidad={setLocalidad} />
        <Link to="/login">
          <button className="✔"
            onClick={() => signup(email, password, nombre, prov, localidad)}
          >
            Registrarse
          </button>
        </Link>
        <p><em>¿Ya tienes cuenta?</em></p>
        <Link to="/login">
            <button className="✔">Iniciar sesión</button>
          </Link>
      </div>
    );
  }
};

const Provincia = ({ elegirProv }) => {
  const [provincias, setProvincias] = useState([]);

  useEffect(() => {
    fetch("https://www.el-tiempo.net/api/json/v2/provincias")
      .then((res) => res.json())
      .then((res) => {
        console.log({ mensaje: "todas las provincias", res });
        setProvincias(res.provincias);
      });
  }, []);

  const provOptions = provincias.map((prov) => {
    return <option value={prov.CODPROV}>{prov.NOMBRE_PROVINCIA}</option>;
  });
  return (
    <select onChange={(e) => elegirProv(e.target.value)}>{provOptions}</select>
  );
};

const Localidad = ({ prov, setLocalidad }) => {
  /* const [prueba, setPrueba] = useState("01"); */
  const [listaLoc, setListaLoc] = useState([]);

  console.log(prov);
  useEffect(() => {
    fetch(`https://www.el-tiempo.net/api/json/v1/provincias/${prov}/municipios`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (Array.isArray(res)) {
          setListaLoc(res);
        } else {
          let forin = [];
          for (const objetoTiempo in res) {
            forin.push(res[objetoTiempo]);
          }
          console.log(forin);
          setListaLoc(forin);
        }
        /* console.log({ mensaje: "estos son los municipios", res }); */
        /* setPrueba(prov); */
        /* console.log({ mensaje: "lista guardada", listaLoc }); */
      });
  }, [prov]);

  const elegirLoc = (e) => {
    setLocalidad(e);
    console.log({ codeMunicipio: e });
  };

  const locOptions = listaLoc.map((loc) => {
    return <option value={loc.ID_REL.substring(1, 6)}>{loc.NOMBRE}</option>;
  });
  return (
    <select onChange={(e) => elegirLoc(e.target.value)}>{locOptions}</select>
  );

  /* return (
      <select>{objetoTiempo}</select>
    ) */
};

export default SignUp;
