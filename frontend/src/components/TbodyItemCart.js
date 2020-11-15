import React from 'react'
import {useState} from 'react'


const TbodyItemCart = (props) => {
    let myProduct = props.product
    const [cant, setCant] = useState(myProduct.cant || 1)

    const deleteToCart = () => {
        var myProducts =  JSON.parse(localStorage.getItem("products")) || []
        let index = myProducts.findIndex((product)=> product.id === myProduct.id )
        myProducts.splice(index, 1)
        localStorage.setItem("products", JSON.stringify(myProducts))
    }
      const changeCant = (value) =>{
        setCant(value)
        var myProducts =  JSON.parse(localStorage.getItem("products")) || []
        let index = myProducts.findIndex((product)=> product.id === myProduct.id )
        myProducts[index].cant = cant
        localStorage.setItem("products", JSON.stringify(myProducts))

      }
    return (     
        <tbody>
        <td id="tdCart"><img id="imgCart" alt={myProduct.itemName} src={myProduct.images[0]}/></td>
        <td id="tdCart">{myProduct.itemName}</td>
        <td id="tdCart">
        <div className="input-field col s12">
            <input id="inptCartCant" type="number" onChange={(e) => changeCant(e.target.value <= 1 ? 1 : e.target.value )} className="validate" value={cant}/>
            <label className="active" for="Stock">Stock</label>
        </div>    
        </td>
        <td id="tdCart">$ {myProduct.itemPrice * cant}</td>
        <td id="tdCart"><a onClick={()=> deleteToCart()}><i class="material-icons">delete</i></a></td>
    </tbody>)
}

export default TbodyItemCart;