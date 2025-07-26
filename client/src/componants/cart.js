import React ,{useEffect,useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from "axios";


const Cart =()=>{
    const [cart,setCart]=useState([])
    const [total,setTotal] = useState(0);
    useEffect(()=>{
        console.log('fetching cart data')
        fetchCart();
        
        console.log("end fetching cart data")
    },[])
    const fetchCart = async () => {
                await axios.get('http://localhost:5003/api/cart/get-cart',{
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
        }).then(res=> {setCart(res.data.items)
            calculateTotal(res.data.items);
        }).catch(err=>alert(err))
       
    }
    const removeCart = (productId)=>{
        axios.delete(`http://localhost:5003/api/cart/remove-from-cart/${productId}`,{
                  headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
        }).then(()=>setCart(cart.filter(item=>item.product._id !== productId))).catch(err=>alert(err))
    }
    const calculateTotal =(data)=>{
        console.log("Calculating total")
        const newTotal = data.reduce((sum,item)=>sum + parseInt(item.product.prodPrice) * item.quantity,0);
        console.log("New total:", newTotal)
        setTotal(newTotal)
    }
    const placeOrder= ()=>{
        console.log(localStorage.getItem('token'))

        axios.post('http://localhost:5003/api/orders/place-order',{},
            {
                 headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
            }
        ).then(res=>alert("Order placed successfully")).catch(err=>alert(err))
        console.log("before clearing cart")
        console.log(cart)
        console.log("after clearing cart")
        setCart([])
        console.log(cart)

    }
    return(
        <div>
            <h2>Cart</h2>
            { cart ?  cart.map(item=>(
                <div key={item.product._id}>
                     <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={`http://127.0.1:5003/uploads/${item.product.prodImage}`}
                            title={item.product.prodName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {item.product.prodName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                       {item.product.prodDiscription}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <p size="small"> QTY :{item.quantity}</p>
                            <Button onClick={()=>removeCart(item.product._id)} size="small">Remove</Button>
                        </CardActions>
                    </Card>
                </div>
                
            )) :<p>no items</p> }
            <p>Total : {total}</p>
            <Button onClick={placeOrder}>Place Order</Button>
        </div>
    )
}

export default Cart;