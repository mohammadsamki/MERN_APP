import React ,{ useEffect, useState } from 'react';
//  create componant to get all orders from the url 
// from "127.0.0.1:5003/api/orders/get-all-orders" as a table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';        
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import axios from 'axios';

const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    const { profileData } = props;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5003/api/orders/get-all-orders', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>All Orders</TableCell>

                        <TableCell>Status</TableCell>
                        <TableCell>Show order</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell>{order._id}</TableCell>
                            <TableCell>{order.user.username}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>
                                {order.items.map((item) => (
                                    <div key={item.product._id}>
                                        {item.product.prodName} (x{item.quantity})
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>
                                <button >View</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Orders;
