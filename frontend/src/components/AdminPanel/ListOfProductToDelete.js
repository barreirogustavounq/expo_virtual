import React, { useState, useEffect, useRef } from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const ListOfProductToDelete = (props) =>{
    const company = props.company
  const history = useHistory()
  const [products, setproducts] = useState([])
  const [prevProducts, setprevProducts] = useState([]) 
  useEffect(() => {
        
      if(products.length === 0){      
            fetch(`http://localhost:7000/products/supplier/${company.id}`, {
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

                setproducts(result)        
        
            //console.log(companies)
            })
            .catch((err => {
            console.log(err)
            }))
            }  
        }, [products])

  const deleteProduct = (id) =>{
    console.log(id)
    fetch(`http://localhost:7000/products/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type":"application/json"
      }
    }).then((res)=> 
      {
        M.toast({
          html: "Producto eliminado exitosamente",
          classes: "#388e3c green darken-2",
        });
        history.push("/admin");
      }
    ) 
    .then(()=>{
      setproducts([])
  })  
  }
    
    const listOfProducts = () => {

      if(products){
        const list = products.map((product)=> {
          return (
            <li>
            <div className="col s1" id='colCard'>
              <div className="card" id='cardDelete'>
                <div className="card-image">
                  <img src={product.images[0]}/>
                  <span className="card-title">{product.itemName}</span>
                  <a onClick={()=> {
                    setprevProducts(products)
                    
                    deleteProduct(product.id)
                    }} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">delete</i></a>
                </div>
                <div className="card-content">
                  <p > stock : {product.stock} </p>
                  <p > precio : {product.itemPrice} </p>
                  <p > precio Promocional : {product.promotionalPrice} </p>
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
    return (
      
      <div className='col s8'>
      <div className="row">
          <div className="col s10" id="formimputSearch">
              <form className="form-inline">
                <input className="form-control sm-2" id='inputSearchFormAdmin' type="search" placeholder="Search" aria-label="Search"/>
              </form>
          </div>
          <div className='col s2'>
              <Link>
                  <i className="small material-icons left" id="iconSearchFormAdmin">search</i>
              </Link>     
          </div>
        <div>
          {
            !products ?
              <p>Loading...</p>
            :
              listOfProducts()
          }
        </div>
      </div>
      </div>      
    )
}

export default ListOfProductToDelete;