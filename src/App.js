import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import LogoBH from "./imgs/Logo.png";
import nameBH from "./imgs/Nombre web.png";

import Connect from "./connect";
import Home from "./home";
import TiempoGeneral from "./tiempogeneral";
import Login from "./login";
import SignUp from "./signup";
import Tiempo from "./tiempo";
import Grafico from "./gasto";
import Graficos from "./graficos";

function App() {
  const [logged, setLogged] = useState(
    JSON.parse(sessionStorage.getItem("logged"))
  );
  /* const [dispositivos, setDispositivos] = useState([]); */
  const [user, setUser] = useState("");

  

  /* useEffect(() => {
    fetch("/codes")
      .then((res) => res.json())
      .then((res) => {
        console.log({ mensaje: "principal", res });
        setDispositivos(res);
      });
  }, []); */

  const cerrar = () => {
    sessionStorage.setItem("logged", false);
    sessionStorage.setItem("user", null);
    setLogged(false);
  };

  if (logged) {
    return (
      <BrowserRouter>
        <Route exact path="/">
          {/* 
          <p>Hola! Bienvenido a BrainyHome</p> */}
          <Links cerrar={cerrar} />
          {/*  <Grafico /> */}
        </Route>
        <Route exact path="/conectar">
          <OpcionesSuperior cerrar={cerrar} />
          <Connect logged={logged} />{" "}
          {/* aparecerán los dispositivos sin conectar a la app */}
        </Route>
        <Route exact path="/BrainyHome">
          <OpcionesSuperior cerrar={cerrar} />
          <Home logged={logged} />{" "}
          {/* aparecerán los dispositivos ya añadidos a la app */}
        </Route>
        <Route exact path="/tiempo">
          <OpcionesSuperior cerrar={cerrar} />
          <Tiempo user={user} />
        </Route>
        <Route exact path="/tiempoES">
          <OpcionesSuperior cerrar={cerrar} />
          <TiempoGeneral logged={logged} />
        </Route>
        <Route exact path="/signup">
          <OpcionesSuperior cerrar={cerrar} />
          <SignUp logged={logged} />
        </Route>
        <Route exact path="/graficos">
          <OpcionesSuperior cerrar={cerrar} />
          <Graficos />
        </Route>
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>
        <div id="copyright">
          <div>
            <Link id="blanco">Preguntas frecuentes</Link>
            <br />
            <Link id="blanco">Contacto</Link>
          </div>
          <div>
            <h6>
              <em>BrainyHome&copy; 2021</em>
            </h6>
          </div>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Redirect to="/login" />
        <Route exact path="/login">
          <Login logged={logged} setLogged={setLogged} setUser={setUser} />
        </Route>
        <div id="copyright">
          <div>
            <Link>Preguntas frecuentes</Link>
            <br />
            <Link>Contacto</Link>
          </div>
          <div>
            <h6>
              <em>BrainyHome&copy; 2021</em>
            </h6>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const OpcionesSuperior = ({ cerrar }) => {
  return (
    <header id="⏫">
      <div id="Top">
        <Link className="💙" to="/">
          <img
            className="logoNombre"
            src={nameBH}
            alt="logo nombre BrainyHome"
          />
        </Link>
        <Link className="💙" to="/conectar">
          <em>Sin conectar</em>
        </Link>
        <Link className="💙" to="/BrainyHome">
          Tus Dispositivos
        </Link>
        <Link className="💙" to="/tiempo">
          Tu Tiempo Hoy
        </Link>
        <Link className="💙" to="/tiempoES">
          Previsión para Mañana
        </Link>
        <Link className="💙" to="/graficos">
          Consumo
        </Link>
        {/* <Link className="💙" >FAQs</Link> */}
      </div>
      <div id="CerrarSesion">
        <img
          onClick={cerrar}
          className="imgCerrar"
          src="https://image.flaticon.com/icons/png/512/25/25706.png"
          alt="cerrar sesion"
        />
      </div>
    </header>
  );
};

const Links = ({ cerrar }) => {
  return (
    <div id="container">
      <div id="🍱">
        <Link className="💙" to="/">
          <img
            id="logo"
            className="logoNombre"
            src={LogoBH}
            alt="logo BrainyHome"
          />
        </Link>
        <Link className="💙" to="/">
          <img className="logoNombre" src={nameBH} alt="nombre BrainyHome" />
        </Link>
        <Link className="💙" to="/conectar">
          <em>Sin conectar</em>
        </Link>
        <Link className="💙" to="/BrainyHome">
          Tus Dispositivos
        </Link>
        <Link className="💙" to="/tiempo">
          Tu Tiempo Hoy
        </Link>
        <Link className="💙" to="/tiempoES">
          El Tiempo Mañana
        </Link>
        <Link className="💙" to="/graficos">
          Consumo
        </Link>
        <button className="✔" onClick={cerrar}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default App;

// prueba con función filter()

/* const array = [1, 2, 3, 4, 5, 6]; 
  const newArray = array.filter((element) => {
    if (element === 2) {
      return false; // si el valor es 2, no lo introduce en newArray
    } else {
      return true; // si el valor NO es 2, SÍ lo introduce en newArray
    }
  }); console.log(newArray);*/
