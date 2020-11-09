import React, { useState } from "react";
import {Link} from 'react-router-dom'
import "../styles/Navbar.css"
import M from 'materialize-css'


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
});

const NavBar = () => {

    const [search, SetSearch] = useState(" ");
   
    const handleInput = (e) => {
        SetSearch(e.target.value)
    }

    
   

      return (
    
       <div className="NavBar"> 
           <div className="row">
               <div className="col s2">
                   <Link to='/'><img className='img-logo' src={require('../images/logo.png')} alt="logo"/></Link>
               </div>
               <div className="col s6">
                   <form className="form-inline">
                       <input className="form-control sm-2" id='inputSearch' type="search" placeholder="Search" aria-label="Search" onChange={handleInput}/>
                   </form>
               </div>
               <div className="col s1">
                   <Link to={"/search/"+search}>
                       <i className="small material-icons left" id="iconSearch" onKeyPress={handleInput}>search</i>
                   </Link>     
               </div>
               <div className="col s1">
                   <Link to="/admin">
                       <i className="small material-icons left" id="iconSearch">settings</i>
                   </Link>     
               </div>
               <div className="col s1">
                   <Link to="/myaccount">
                       <i className="small material-icons left" id="iconSearch">account_box</i>
                   </Link>     
               </div>
           </div>           

           <nav>
                <div class="nav-wrapper">
                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="left hide-on-med-and-down">
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

            <ul class="sidenav" id="mobile-demo">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/suppliers">Empresas</Link></li>
                <li><Link to="/live">En Vivo</Link></li>
                <li><Link to="/faqs">Preguntas Frecuentes</Link></li>
                <li><Link to="/howtobuy">Como comprar?</Link></li>
                <li><Link to="/aboutus">Quienes Somos?</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
            </ul>
    </div>
  );
};

export default NavBar;
