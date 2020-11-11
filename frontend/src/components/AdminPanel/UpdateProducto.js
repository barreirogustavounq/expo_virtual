import React, { useState, useEffect } from 'react'
import '../../styles/DeleteProveedor.css'
import {Link} from 'react-router-dom'
import ListOfProductToUpdate from './ListOfProductToUpdate'

const UpdateProducto = () =>{
  const [companies, setCompanies] = useState(null)
  const [clicked, setClicked] = useState(null)
  const [search, setsearch] = useState(null)

  useEffect(() => {
    if(!companies){
    fetch(`http://localhost:7000/companies`, {
      headers: {
        "Content-Type":"application/json"
      }
    }) 
      .then((res)=> {
      //console.log(res)
      if(res.ok){
        return res.json()
      }
    })
    .then((result)=>{
     // console.log(result)

        setCompanies(result)        
 
      //console.log(companies)
    })
    .catch((err => {
      console.log(err)
    }))
  }
  }, [search])

  const filterCompanies = () => {
    let mycompanies = []
    companies.forEach(element => {
      if(element.companyName.toLowerCase().includes(search.toLowerCase())){
        mycompanies.push(element)
      }
    });

    const list = mycompanies.map((company)=> {
      return (
        <li>
        <div className="col s1" id='colCard'>
          <div className="card" id='cardDelete'>
            <div className="card-image">
              <img src={company.companyImage}/>
              <span className="card-title">{company.companyName}</span>
              <a onClick={ ()=> setClicked(<ListOfProductToUpdate company={company}/>) } className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">edit</i></a>
            </div>
            <div className="card-content">
              <a href={"http://"+company.facebook} target="_blank"><p>Facebook</p></a>
              <a href={"http://"+ company.instagram} target="_blank"><p>Instagram</p></a>
              <a href={"http://"+ company.web} target="_blank"><p>Web</p></a>
            </div>
          </div>
          </div>
          </li>
        )
    })
    return(    
      <ul>    
        <div className='row'>
            {list}
        </div>
      </ul>
    )

    
  }


    
    const listOfCompanies = () => {

      if(companies){
        const list = companies.map((company)=> {
          return (
            <li>
            <div className="col s1" id='colCard'>
              <div className="card" id='cardDelete'>
                <div className="card-image">
                  <img src={company.companyImage}/>
                  <span className="card-title">{company.companyName}</span>
                  <a onClick={ ()=> setClicked(<ListOfProductToUpdate company={company}/>) } className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">edit</i></a>
                </div>
                <div className="card-content">
                  <a href={"http://"+company.facebook} target="_blank"><p>Facebook</p></a>
                  <a href={"http://"+ company.instagram} target="_blank"><p>Instagram</p></a>
                  <a href={"http://"+ company.web} target="_blank"><p>Web</p></a>
                </div>
              </div>
              </div>
              </li>
            )
        })
        return(    
          <ul>    
            <div className='row'>
                {list}
            </div>
          </ul>
        )
        }

    }
    console.log(clicked)
    return (
      <div className="row">
      <div className="col s4">
          <ul className="collapsible">
              <li>
                  <div className="collapsible-header"><i className="material-icons">Proveedores</i>Proveedores</div>
                      <div className="collapsible-body">
                       <Link  className="waves-effect waves-light red lighten-2 btn-large" to="/admin/agregarproveedor">Agregar Proveedor</Link>   
                       <Link  className="waves-effect waves-light red lighten-2 btn-large" to="/admin/borrarproveedor">Eliminar Proveedor</Link>  
                       <Link  className="waves-effect waves-light red lighten-2 btn-large" to="/admin/modificarproveedor">Modificar Proveedor</Link>  
                      </div>
              </li>
              <li>
                  <div className="collapsible-header"><i className="material-icons">place</i>Productos</div>
                  <div className="collapsible-body">
                        <Link  className="waves-effect waves-light red lighten-2 btn-large" to="/admin/agregarproducto">Agregar Productos</Link> 
                        <Link  className="waves-effect waves-light red lighten-2 btn-large" to="/admin/modificarproducto">Modificar Productos</Link> 
                        <Link  className="waves-effect waves-light red lighten-2 btn-large" to="/admin/borrarproducto">Eliminar Productos</Link> 
                      </div>
              </li>
              <li>
                  <div className="collapsible-header"><i className="material-icons">whatshot</i>Banners</div>
                  <div className="collapsible-body">
                        <Link  className="waves-effect waves-light red lighten-2 btn-large" to="/admin/agregarbanner">Agregar Banner</Link>  
                        <Link  className="waves-effect waves-light red lighten-2 btn-large" to="/admin/borrarbanner" >Eliminar Banner</Link>
                      </div>
              </li>
          </ul>      
      </div>
      <div className='col s8'>
      {clicked ? 
        clicked
        :
        <div className="row">
          <div className="col s10" id="formimputSearch">
              <form className="form-inline">
              <input onChange={(e)=> setsearch(e.target.value)} value={search} className="form-control sm-2" id='inputSearchFormAdmin' type="search" placeholder="Search" aria-label="Search"/>
              </form>
          </div>
          <div class='col s2'>
              <Link>
                  <i className="small material-icons left" id="iconSearchFormAdmin">search</i>
              </Link>     
          </div>
        <div>
          {
            !companies ?
              <p>Loading...</p>
            :
               search ? 
                  filterCompanies()
                :  
                  listOfCompanies()
          }
        </div>
      </div>}
      </div> 
  </div> 


     
    )
}

export default UpdateProducto;