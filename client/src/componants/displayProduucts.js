import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5003/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);
    const addToCart = (productId) => {
        console.log("Add to cart:", productId);
        axios.post("http://localhost:5003/api/cart/add-to-cart",{productId,quantity:1},{
              headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
        }).then(()=>{
            alert("added to cart")
        }).catch(err=>{
            alert(err)
        })
    };

    return (
        <div>
            <h2>Product List</h2>
           <div style={{ display:"flex",flexWrap:"wrap"}}>
               {products.map(product => (
                <div key={product._id}>
                    <img width={200} src={`http://127.0.0.1:5003/uploads/${product.prodImage}`} />
                    <h4>{product.prodName}</h4>
                    <p>{product.prodPrice} $</p>
                    <button onClick={()=>addToCart(product._id)}> Add to Cart</button>
                </div>
               ))}
           </div>
        </div>
    );
}

export default DisplayProducts;