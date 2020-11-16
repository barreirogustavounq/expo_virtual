import React, { useState, useEffect} from "react";
import "../../styles/Singin.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import logo from "../../images/logo.png"
const Login = () => {
  const history = useHistory();
  const [dni, setdni] = useState(null);

  const PostData = () => {
       
    if (dni < 1000000) {
      M.toast({ html: "DNI Invalido", classes: "#c62828 red darken-3" });
    } else {
      fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          dni,
        }),
      })
        .then((res) => {
          if(!res.ok){
          M.toast({ html:"datos invalidos o el usuario no existe", classes: "#c62828 red darken-3" });
        }else{
          M.toast({
            html: "Loggeado exitosamente",
            classes: "#388e3c green darken-2",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <div className="mycard">
      <div id="fondoTarjetaLogin"  className="card auth-card input-field">
         <img alt="logo" className="logo-login" src={logo}/>
        <input
          type="number"
          id='inputLogin'
          placeholder="Ingrese su DNI"
          value={dni}
          onChange={(e) => setdni(e.target.value)}
        />
        <button
        id="botonLogin"
          className="btn waves-effect waves-light #64b5f6 red darken-1"
          onClick={() => PostData()}
        >
          Singin
        </button>
        <h5 id="H5Register">
          <Link id="linkRegister" to="/login/admin">Logearse como usuario</Link>
          <tr/>
          <Link id="linkRegister" to="/register">Registrate acá</Link>
        </h5>
      </div>
    </div>)
  }

export default Login;
