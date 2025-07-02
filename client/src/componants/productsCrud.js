import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import axios from 'axios';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable() {
    const [rows, setRows] = React.useState([]);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [image, setImage] = React.useState('');
    const [apiCategory , setApiCategory] = React.useState([]);
    // Fetch initial data
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5003/api/products');
                console.log('Data fetched:', response.data);
                setRows(response.data);
                const categoryRes = await axios.get('http://127.0.0.1:5003/api/categories');
                setApiCategory(categoryRes.data);
                console.log('Categories fetched:', categoryRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

  return (
    <TableContainer component={Paper}>
        <form onSubmit={async (e)=>{
            e.preventDefault();
            const newRow = {
                prodName:name,
                prodDescription:description,
                prodPrice:price,
                prodCategory:category,
                prodImage:image
            };
            // Send data to the server
            try {
                 const response = await axios.post('http://127.0.0.1:5003/api/products', newRow ,{
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
            setDescription('');
            setPrice('');
            setCategory('');
            setImage('');
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
      <TextField
        label="Discription"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* price */}
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
       
      />
      {/* category */}
      {/* add select field */}
              <InputLabel id="demo-simple-select-label">Category</InputLabel>

        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    onChange={(e) => setCategory(e.target.value)}
  >
    {apiCategory.map((cat) => (
    <MenuItem value={cat._id}>{cat.name}</MenuItem>
    ))}
    

  </Select>

      {/* img */}
      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        margin="normal"
        value={image}
        onChange={(e) => setImage(e.target.value)}
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
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Image</TableCell>
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
                {row.prodName}
              </TableCell>
              <TableCell align="right">{row.prodDescription}</TableCell>
              <TableCell align="right">{row.prodPrice}</TableCell>
              <TableCell align="right">{row.prodCategory.name}</TableCell>
              <TableCell align="right"><img src={row.prodImage} alt={row.prodName} style={{ width: '100px' }} /></TableCell>
              <TableCell align="right">
                <Button>Update</Button>
                <Button onClick={async()=>{
                    if(window.confirm("Are you sure you want to delete this product?")){
                     await axios.delete(`http://127.0.1:5003/api/products/${row._id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    console.log('Product deleted:', row._id);
                    setRows(rows.filter(r => r._id !== row._id));
                }
            }}>Delete</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
