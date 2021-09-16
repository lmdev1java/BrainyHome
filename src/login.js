import { useState } from "react";
import { Redirect, BrowserRouter, Route, Link } from "react-router-dom";

import LogoBH from "./imgs/Logo.png";
import nameBH from "./imgs/Nombre web.png";

import SignUp from "./signup";

const Login = ({ logged, setLogged, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correct, setCorrect] = useState(true);

  const login = (email, password) => {
    console.log(email, password);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ mensaje: "inicio de sesion", res });
        if (res.state) {
          setLogged(true);
          sessionStorage.setItem("logged", true);
          sessionStorage.setItem("user", email);
        } else {
          setCorrect(false);
        }
      });
  };

  const alerta = () => {
    window.alert(`
    Hola! Gracias por utilizar BrainyHome

    Esta app está en fase Beta, pronto habrá más actualizaciones, como, por ejemplo, un botón que te permita guardar tus configuraciones favoritas. Así, cuando estés en casa, sólo tendrás que tocar un botón para que todo esté como a ti te gusta
    
    Muchas gracias por utilizar nuestra app

                           Equipo BrainyHome`);
  };

  const iniciarSesion = (email, password) => {
    login(email, password);
    setUser(email);
    alerta()
  };

  if (logged) {
    return (
      <BrowserRouter>
        <Redirect to="/BrainyHome" />
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Route exact path="/login">
          <div id="container">
            <div id="🔑">
              <img className="logo" src={LogoBH} alt="logo BrainyHome" />
              <img
                className="logoNombre"
                src={nameBH}
                alt="logo nombre BrainyHome"
              />
              <p>Smart house. Smart life</p>
              <h3>
                <em>Identifícate</em>
              </h3>
              <input
                type="email"
                placeholder="  email o usuario"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="  password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="✔"
                onClick={() => iniciarSesion(email, password)}
              >
                <strong>Entrar</strong>
              </button>
              <Correct correct={correct} />
              <h5>
                <em>..o crea una cuenta nueva</em>
              </h5>
              <Link to="/signup">
                <button className="✔">
                  <strong>Crear</strong>
                </button>
              </Link>
            </div>
          </div>
        </Route>
        <Route exact path="/signup">
          <SignUp logged={logged} />
        </Route>
      </BrowserRouter>
    );
  }
};

const Correct = ({ correct }) => {
  if (!correct) {
    return <h6 className="📛"><em>Usuario o contraseña erróneos</em></h6>;
  } else {
    return (
      <div>
        <br />
      </div>
    );
  }
};

export default Login;
