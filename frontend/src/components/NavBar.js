import React, {useContext, useState } from "react";
import {Link, useHistory} from 'react-router-dom'
import logo from '../images/logo.png'
import "../styles/Navbar.css"
import M from 'materialize-css'
import ShopContext from './context/shop-context'
import {userContext} from "../App"


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
});

const NavBar = () => {
    const [textsearch, setTextSearch ] = useState(null)
    const history = useHistory()
    const { state, dispatch } = useContext(userContext);
    const handleSubmit = event => {
        event.preventDefault();
        if(textsearch){
            history.push(`/resultsearch/${textsearch}`)
        }else{
            history.push("/resultsearch/ ")
        }
      };



      const renderButton = () => {
        if (state) {
            return(
        <button 
            id ="botonSesion"
            className="btn #c62828 red darken-3" 
            onClick={() => {
                            localStorage.clear();
                            dispatch({ type: "CLEAR" });
                            M.toast({
                                html: "Sesión cerrada exitosamente",
                                classes: "#388e3c green darken-2",
                              });
                              history.push("/");
                            }}
            >
                Cerrar sesión
        </button> )
        }else{
            return(
            <button 
                id ="botonSesion"
                className="btn #c62828 red darken-3" 
                onClick={() => {
                                history.push("/login");
                                }}
                >
                    Iniciar sesión
             </button> )
        }
    }

    const renderPanelAdmin = () => {
        if(state === "admin"){
            return(
            <Link to="/admin">
                <i className="small material-icons left" id="iconSearch">settings</i>
            </Link>)    
        }
    }




      return (
        <ShopContext.Consumer>
        {context => (
          <React.Fragment>
    
       <div className="NavBar"> 
           <div className="row">
               <div className="col s2" >
                <img alt="logo" id='imgLogo' src={logo}/>
               </div>
               <div className="col s5">
                   <form className="form-inline" onSubmit={handleSubmit}>
                       <input className="form-control sm-2" onKeyPress={event => event.key === 'Enter'   } onChange={(e)=> setTextSearch(e.target.value)} value = {textsearch} id='inputSearch' type="search" placeholder="Search" aria-label="Search"/>
                   </form>
               </div>
               <div className="col s1">
                   <Link to={textsearch ? `/resultsearch/${textsearch}` : "/resultsearch/ " }>
                       <i className="small material-icons left" id="iconSearch">search</i>
                   </Link>     
               </div>
               <div className="col s1">
                    {renderPanelAdmin()}
               </div>
               <div className="col s1">
                   <Link to="/myaccount">
                       <i className="small material-icons left" id="iconSearch">account_box</i>
                   </Link>     
               </div>
               <div className="col s1">
                   <Link to="/shoppingcart">
                       <div className='row'>
                           <div className='col s6'>
                            <p id='cantidadProductos'>
                                {context.cart.reduce((count, curItem) => { return count + curItem.quantity;}, 0)}
                            </p>
                           </div>
                           <div className='col s6'>
                            <i className="small material-icons left" id="iconCart">shopping_cart</i>
                           </div>
                       </div>
                   </Link>     
               </div>
               <div id="colBotonSesion" className="col s1">
                    {renderButton()}
               </div>
           </div>           

           <nav>
                <div className="nav-wrapper">
                <a href="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="left hide-on-med-and-down">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/suppliers">Empresas</Link></li>
                    <li><Link to="/live">En Vivo</Link></li>
                    <li><Link to="/faqs">Preguntas Frecuentes</Link></li>
                    <li><Link to="/howtobuy">Como comprar?</Link></li>
                    <li><Link to="/aboutus">Quienes Somos?</Link></li>
                    <li><Link to="/contact">Contacto</Link></li>
                </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/suppliers">Empresas</Link></li>
                <li><Link to="/live">En Vivo</Link></li>
                <li><Link to="/faqs">Preguntas Frecuentes</Link></li>
                <li><Link to="/howtobuy">Como comprar?</Link></li>
                <li><Link to="/aboutus">Quienes Somos?</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
            </ul>
    </div>
    </React.Fragment>
      )}
    </ShopContext.Consumer>
  );
};

export default NavBar;
