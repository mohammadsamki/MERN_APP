//  create category fun componant as crud form with table 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function Category() {
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [rows, setRows] = React.useState([]);
    
    useEffect(() => {
        fetchCategories();
    }, []);
    
    const fetchCategories = async () => {
        try {
        const response = await axios.get('http://127.0.0.1:5003/api/categories');
        setRows(response.data);
        } catch (error) {
        console.error('Error fetching categories:', error);
        }
    };
    return(
        <>
        {/*  form for category  */}
         <form onSubmit={async (e)=>{
            e.preventDefault();
            const newRow = {
                name:name,
            
            };
            // Send data to the server
            try {
                 const response = await axios.post('http://127.0.0.1:5003/api/categories', newRow ,{
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers you need, like Authorization
                    "Authorization": `Bearer ${localStorage.getItem('token')}` //
                }
                 });
            console.log('Response from server:', response.data);
            setRows([...rows, newRow]);
            } catch (error) {
                console.error('Error sending data to server:', error);
                return; // Exit if there's an error
                
            }
           

            // Reset form fields
            setName('');
     
        }}
        >
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
     
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </form>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>

            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell align="right">
                <Button>Update</Button>
                <Button onClick={async()=>{
                    if(window.confirm("Are you sure you want to delete this Category?")){
                     await axios.delete(`http://127.0.1:5003/api/categories/${row._id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    console.log('Category deleted:', row._id);
                    setRows(rows.filter(r => r._id !== row._id));
                }
            }}>Delete</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
        </>
    )
}
