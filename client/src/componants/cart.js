import React ,{useEffect,useState} from "react";

import axios from "axios";


const Cart =()=>{
    const [cart,setCart]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5003/api/cart/get-cart',{
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
        }).then(res=> setCart(res.data.items)).catch(err=>alert(err))
    },[])
    const removeCart = (productId)=>{
        axios.delete(`http://localhost:5003/api/cart/remove-from-cart/${productId}`,{
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
        }).then(()=>setCart(cart.filter(item=>item.product._id !== productId))).catch(err=>alert(err))
    }
    return(
        <div>
            <h2>Cart</h2>
            {cart.map(item=>(
                <div key={item.product._id}>
                    <h4>{item.product.prodName} -- Qty : {item.quantity}</h4>
                    <button onClick={()=>removeCart(item.product._id)}>Remove</button>
                </div>
            ))}
        </div>
    )
}

export default Cart;